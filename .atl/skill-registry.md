# Skill Registry — TPI Librería (Frontend)

Registro de skills aplicables al stack real del proyecto: **HTML5 + CSS3 + JavaScript nativo (sin frameworks, sin build), verificación en navegador**.

## Skills incluidas

### `openspec-propose` / `openspec-apply-change` / `openspec-archive-change`
**Ruta**: `.opencode/skills/openspec-*`
**Cuándo**: todo cambio de producto o documentación de entrega.
**Reglas compactas**:
- Ningún cambio en `index.html`, `css/` o `js/` sin un change aprobado.
- Artefactos en orden: `proposal.md` → `specs/<cap>/spec.md` → `design.md` → `tasks.md`.
- Cada requisito lleva ID estable (`R-NN`) y cada criterio `CA-NN`.
- Al archivar, los deltas se sincronizan en `openspec/specs/`; no se edita la spec principal a mano.

### `tdd` / `test-driven-development`
**Ruta**: `C:\Users\ramir\.agents\skills\tdd`, `C:\Users\ramir\.agents\skills\test-driven-development`
**Cuándo**: lógica pura (validaciones, normalización, cálculos) o cualquier cambio de comportamiento.
**Reglas compactas**:
- Escribir primero un test que falle; no avanzar sin RED confirmado.
- Implementar lo mínimo para pasar; luego triangular con un segundo caso.
- Refactorizar sólo con la suite en verde.
- Si el código está acoplado al DOM, extraer la parte pura antes de testear; no escribir tests tautológicos.

### `webapp-testing` / `playwright-cli`
**Ruta**: `C:\Users\ramir\.agents\skills\webapp-testing`, `C:\Users\ramir\.agents\skills\playwright-cli`
**Cuándo**: verificar flujos reales, capturar errores de consola, medir anchos.
**Reglas compactas**:
- Verificar por comportamiento observable (DOM, textos, atributos), no por detalles internos.
- Recolectar `Runtime.exceptionThrown` y `Log.entryAdded` durante todo el recorrido.
- Medir `scrollWidth` vs `clientWidth` para detectar overflow horizontal.

### `security-and-hardening`
**Ruta**: `C:\Users\ramir\.agents\skills\security-and-hardening`
**Cuándo**: cualquier entrada de usuario o dato leído de `localStorage`.
**Reglas compactas**:
- Insertar datos con `textContent`; nunca `innerHTML` con input del usuario.
- Validar en el borde (formulario) antes de tocar el estado.
- Tratar `localStorage` como dato no confiable: validar forma (array/objeto) antes de usar.

## Excluidas por stack

`java-spring-boot`, `java-springboot`, `java-docs`, `313-frameworks-spring-db-migrations-flyway`, `redis-*`, `upstash-redis-js`, `supabase-postgres-best-practices`, `vercel-react-best-practices`, `better-auth-security-best-practices`, `streaming`: no aplican a HTML/CSS/JS nativo sin backend.

## Convenciones del proyecto

Ver `AGENTS.md` § Reglas duras. Este registro se reconstruye con `/active-orchestrator:registry` cuando cambien las skills instaladas.
