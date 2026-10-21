"""Arnes de aceptacion para R-13: el precio unitario persistido debe ser el capturado
al agregar el renglon, no el vigente en el catalogo al confirmar.

Uso: python harness-r13.py   (sale con codigo 1 si alguna comprobacion falla)
"""

import json
import os
import shutil
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

from websocket import create_connection

ROOT = Path(__file__).resolve().parents[3]
URL = (ROOT / "index.html").as_uri()
PORT = 9346
UDD = Path(os.environ["TEMP"]) / "opencode" / "cdp-r13"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

if UDD.exists():
    shutil.rmtree(UDD, ignore_errors=True)
UDD.mkdir(parents=True, exist_ok=True)

proc = subprocess.Popen(
    [
        CHROME,
        "--headless=new",
        f"--remote-debugging-port={PORT}",
        f"--user-data-dir={UDD}",
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-extensions",
        "--window-size=1280,900",
        URL,
    ],
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL,
)

ws_url = None
for _ in range(160):
    try:
        with urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/list", timeout=2) as resp:
            for target in json.load(resp):
                if target.get("type") == "page" and str(target.get("url", "")).startswith("file://"):
                    ws_url = target["webSocketDebuggerUrl"]
                    break
        if ws_url:
            break
    except Exception:
        pass
    time.sleep(0.25)

if not ws_url:
    print("FATAL: no se pudo conectar al target de Chrome")
    proc.terminate()
    sys.exit(2)

ws = create_connection(ws_url, suppress_origin=True, timeout=60)
msg_id = 0
events = []


def send(method, params=None):
    global msg_id
    msg_id += 1
    ws.send(json.dumps({"id": msg_id, "method": method, "params": params or {}}))
    while True:
        message = json.loads(ws.recv())
        if message.get("id") == msg_id:
            if "error" in message:
                raise RuntimeError(f"{method} -> {message['error']}")
            return message.get("result", {})
        if "method" in message:
            events.append(message)


def ev(expr):
    result = send(
        "Runtime.evaluate",
        {"expression": expr, "returnByValue": True, "awaitPromise": True, "userGesture": True},
    )
    if "exceptionDetails" in result:
        raise RuntimeError(f"JS: {result['exceptionDetails']}")
    return result["result"].get("value")


for _ in range(100):
    try:
        if ev("document.readyState === 'complete' && !!(window.Libreria && Libreria.datos)"):
            break
    except Exception:
        pass
    time.sleep(0.2)

checks = []


def check(caso, nombre, ok, detalle=""):
    checks.append({"caso": caso, "check": nombre, "ok": bool(ok), "detalle": detalle})
    print(("PASS" if ok else "FAIL") + f" [{caso}] {nombre}" + ("" if ok else f"  -> {detalle}"))


def cambiar_precio(libro_id, nuevo):
    ev(
        "(() => { const l = Libreria.datos.libros.find(x => x.id === %s); l.precio = %s; "
        "const guardados = JSON.parse(localStorage.getItem('libreria.v1.libros')); "
        "guardados.forEach(x => { if (x.id === %s) { x.precio = %s; } }); "
        "localStorage.setItem('libreria.v1.libros', JSON.stringify(guardados)); })()"
        % (json.dumps(libro_id), nuevo, json.dumps(libro_id), nuevo)
    )


def agregar(libro_id, cantidad):
    ev(
        "(() => { document.getElementById('venta-libro').value = %s; "
        "document.getElementById('venta-cantidad').value = %s; "
        "document.getElementById('venta-agregar').click(); })()" % (json.dumps(libro_id), json.dumps(str(cantidad)))
    )
    time.sleep(0.25)


def confirmar(cliente_id="c1"):
    ev(
        "(() => { document.getElementById('venta-cliente').value = %s; "
        "document.getElementById('venta-confirmar').click(); })()" % json.dumps(cliente_id)
    )
    time.sleep(0.4)
    return ev(
        "(() => { const v = Libreria.datos.ventas[Libreria.datos.ventas.length - 1]; "
        "return {id: v.id, total: v.total, renglones: v.renglones.map(r => ({libroId: r.libroId, cantidad: r.cantidad, precioUnitario: r.precioUnitario, subtotal: r.subtotal}))}; })()"
    )


# --- Caso A: el precio sube despues de agregar el renglon ---
agregar("l1", 2)
cambiar_precio("l1", 9999)
venta_a = confirmar()
renglon_a = venta_a["renglones"][0]
check("A", "precio unitario persistido = capturado (1500)", float(renglon_a["precioUnitario"]) == 1500, renglon_a)
check("A", "subtotal persistido = 2 x 1500", float(renglon_a["subtotal"]) == 3000, renglon_a)
check("A", "total de la venta = 3000", float(venta_a["total"]) == 3000, venta_a["total"])

# --- Caso B: el precio baja despues de agregar el renglon ---
agregar("l3", 1)
cambiar_precio("l3", 500)
venta_b = confirmar()
renglon_b = venta_b["renglones"][0]
check("B", "precio unitario persistido = capturado (2000)", float(renglon_b["precioUnitario"]) == 2000, renglon_b)
check("B", "subtotal persistido = 1 x 2000", float(renglon_b["subtotal"]) == 2000, renglon_b)

# --- Caso C: cambia el precio y despues la cantidad ---
agregar("l2", 1)
cambiar_precio("l2", 4000)
ev(
    "(() => { const input = document.querySelector('input[data-libro-id=\"l2\"]'); "
    "input.value = '3'; input.dispatchEvent(new Event('change', { bubbles: true })); })()"
)
time.sleep(0.3)
subtotal_ui = ev("(() => { const fila = [...document.querySelectorAll('#tabla-renglones tbody tr')][0]; return fila.textContent; })()")
venta_c = confirmar()
renglon_c = venta_c["renglones"][0]
check("C", "el subtotal en pantalla usa el precio capturado", "4.500,00" in subtotal_ui, subtotal_ui)
check("C", "precio unitario persistido = capturado (1500)", float(renglon_c["precioUnitario"]) == 1500, renglon_c)
check("C", "subtotal persistido = 3 x 1500", float(renglon_c["subtotal"]) == 4500, renglon_c)

# --- Caso D: el historial muestra la copia, no el catalogo cambiado ---
detalle = ev(
    "(() => { document.querySelector('a[href=\"#historial\"]').click(); "
    "const botones = document.querySelectorAll('#tabla-historial tbody button'); "
    "botones[0].click(); "
    "return document.getElementById('detalle-renglones').textContent; })()"
)
check("D", "el detalle muestra 1.500,00 y no 9.999,00", "1.500,00" in detalle and "9.999,00" not in detalle, detalle[:160])

errores = [e for e in events if e.get("method") == "Runtime.exceptionThrown"]
check("D", "sin excepciones en consola", len(errores) == 0, errores[:1])

fallidos = [c for c in checks if not c["ok"]]
print("")
print(f"RESUMEN: {len(checks) - len(fallidos)}/{len(checks)} PASS")

ws.close()
proc.terminate()
try:
    proc.wait(timeout=10)
except Exception:
    proc.kill()

sys.exit(1 if fallidos else 0)
