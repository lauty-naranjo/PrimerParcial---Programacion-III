"""Arnes de aceptacion para R-14: el resumen de venta muestra articulos y total,
sin una linea de subtotal general. Incluye la verificacion de teclado del caso 8.

Uso: python harness-r14.py   (sale con codigo 1 si alguna comprobacion falla)
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
PORT = 9347
UDD = Path(os.environ["TEMP"]) / "opencode" / "cdp-r14"
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


def etiquetas_resumen():
    return ev("[...document.querySelectorAll('.resumen__lista dt')].map(d => d.textContent.trim())")


def agregar(libro_id, cantidad):
    ev(
        "(() => { document.getElementById('venta-libro').value = %s; "
        "document.getElementById('venta-cantidad').value = %s; "
        "document.getElementById('venta-agregar').click(); })()" % (json.dumps(libro_id), json.dumps(str(cantidad)))
    )
    time.sleep(0.25)


# --- Estado vacio ---
etiquetas = etiquetas_resumen()
check("A", "el resumen declara solo Articulos y Total", etiquetas == ["Artículos", "Total"], etiquetas)
check("A", "sin renglones el total es $ 0,00", "0,00" in ev("document.getElementById('venta-total').textContent"))
check("A", "sin renglones los articulos son 0", ev("document.getElementById('venta-articulos').textContent") == "0")

# --- Con renglones ---
agregar("l1", 2)
agregar("l3", 1)
etiquetas = etiquetas_resumen()
check("B", "el resumen sigue con dos filas", len(etiquetas) == 2, etiquetas)
check("B", "no existe la etiqueta Subtotal en el resumen", "Subtotal" not in etiquetas, etiquetas)
check("B", "los articulos son 3", ev("document.getElementById('venta-articulos').textContent") == "3")
total = ev("document.getElementById('venta-total').textContent")
check("B", "el total es $ 5.000,00", "5.000,00" in total, total)

# --- La tabla de renglones conserva el subtotal por linea ---
cabeceras = ev("[...document.querySelectorAll('#tabla-renglones thead th')].map(t => t.textContent.trim())")
check(
    "C",
    "la tabla de renglones conserva Precio unitario y Subtotal",
    "Precio unitario" in cabeceras and "Subtotal" in cabeceras,
    cabeceras,
)
subtotales_fila = ev("[...document.querySelectorAll('#tabla-renglones tbody tr')].map(t => t.children[3].textContent.trim())")
check("C", "cada renglon muestra su subtotal", subtotales_fila == ["$ 3.000,00", "$ 2.000,00"], subtotales_fila)

# --- Cambio de cantidad ---
ev(
    "(() => { const input = document.querySelector('input[data-libro-id=\"l1\"]'); "
    "input.value = '3'; input.dispatchEvent(new Event('change', { bubbles: true })); })()"
)
time.sleep(0.3)
total = ev("document.getElementById('venta-total').textContent")
check("C", "al cambiar la cantidad el total pasa a $ 6.500,00", "6.500,00" in total, total)
check("C", "el resumen sigue sin fila Subtotal", etiquetas_resumen() == ["Artículos", "Total"], etiquetas_resumen())

# --- Teclado: primer Tab al enlace de salto, con foco visible ---
send("Page.reload", {"ignoreCache": True})
time.sleep(0.8)
for _ in range(100):
    try:
        if ev("document.readyState === 'complete' && !!(window.Libreria && Libreria.datos)"):
            break
    except Exception:
        pass
    time.sleep(0.2)
time.sleep(0.3)
ev("document.activeElement && document.activeElement.blur()")
send("Input.dispatchKeyEvent", {"type": "keyDown", "key": "Tab", "code": "Tab", "windowsVirtualKeyCode": 9, "nativeVirtualKeyCode": 9})
send("Input.dispatchKeyEvent", {"type": "keyUp", "key": "Tab", "code": "Tab", "windowsVirtualKeyCode": 9, "nativeVirtualKeyCode": 9})
time.sleep(0.3)
primero = ev("document.activeElement ? document.activeElement.className : null")
check("D", "el primer Tab enfoca Saltar al contenido", primero == "salto-contenido", primero)
foco = ev(
    "(() => { const el = document.activeElement; const s = getComputedStyle(el); "
    "return { outlineStyle: s.outlineStyle, outlineWidth: s.outlineWidth }; })()"
)
check("D", "el foco es visible (outline 3px)", foco["outlineStyle"] == "solid" and foco["outlineWidth"] == "3px", foco)

# --- Segundo Tab: primer enlace de navegacion ---
send("Input.dispatchKeyEvent", {"type": "keyDown", "key": "Tab", "code": "Tab", "windowsVirtualKeyCode": 9, "nativeVirtualKeyCode": 9})
send("Input.dispatchKeyEvent", {"type": "keyUp", "key": "Tab", "code": "Tab", "windowsVirtualKeyCode": 9, "nativeVirtualKeyCode": 9})
time.sleep(0.3)
segundo = ev("document.activeElement ? document.activeElement.getAttribute('href') : null")
check("D", "el segundo Tab llega al primer enlace de navegacion", segundo == "#catalogo", segundo)

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
