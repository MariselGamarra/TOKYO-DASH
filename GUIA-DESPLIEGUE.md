# 🍣 TOKYO DASH — Guía Paso a Paso para Despliegue (GitHub + Railway)

> Objetivo: publicar tu landing (`index.html + css/ + js/ + assets/`) en internet con Railway y actualizarla sin rehacer todo.

---

## 0. Requisitos
- [ ] Una cuenta en GitHub (ej: MariselGamarra)
- [ ] Una cuenta en Railway (railway.app)
- [ ] GitHub Desktop instalado (recomendado para principiantes) **o** Git CLI
- [ ] Tu proyecto en tu PC: `C:\Users\LAB02_PC06\Desktop\SUSHIDASH`

**Estructura ideal de tu proyecto:**
```
SUSHIDASH/
├── index.html
├── css/style.css
├── js/script.js
├── assets/logo.svg
├── server.js       ← sirve el sitio en Railway ($PORT)
├── package.json    ← debe decir "start": "node server.js"
└── .gitignore
```
Si te faltan `server.js` o `package.json`, Railway no arranca. Ya están creados en este proyecto.

---

## PASO 1 — Crear el repositorio en GitHub
1. Entra a [github.com/new](https://github.com/new)
2. Nombre: `TOKYO-DASH` (puede ser mayúsculas o minúsculas)
3. **Público** > **Create repository**
4. No marques README (tu repo debe quedar vacío para subir tu código)
5. Guarda tu URL: `https://github.com/TU-USUARIO/TOKYO-DASH.git`

**✅ Verificación:** entra a `github.com/TU-USUARIO/TOKYO-DASH` y ve el cartel de "Configuración rápida".

---

## PASO 2 — Conectar tu carpeta local con GitHub Desktop
1. Abre **GitHub Desktop** > inicia sesión (Sign in to GitHub.com con tu cuenta)
2. Menú **File > Add Existing Repository...**
3. Selecciona tu carpeta `SUSHIDASH` > **Add Repository** (GitHub Desktop crea el `.git` solo)
4. Si tu repo de GitHub ya existe y está vacío, ve a **Repository > Repository Settings...** y en *Remote repository* pega tu URL `https://github.com/TU-USUARIO/TOKYO-DASH.git` > **Save**

**✅ Verificación:** arriba dice `Current repository: TOKYO-DASH`.

---

## PASO 3 — Primer push (subir todo)
1. En **Changes** verás tus archivos con ✅ (ej: 7 changed files)
2. En **Summary** escribe: `Tokyo Dash oficial`
3. Clic en **Commit to main** (botón azul)
4. Clic en **Fetch origin / Publish branch / Push origin** (arriba) > autoriza si pide
5. Recarga la página de GitHub: debes ver `index.html, css/, js/, assets/`

> ⚠️ El aviso amarillo `line endings LF to CRLF` es inocuo (Windows). Ignóralo.

**Alternativa por terminal (si prefieres):**
```powershell
cd "C:\Users\LAB02_PC06\Desktop\SUSHIDASH"
git init
git add .
git commit -m "Tokyo Dash oficial"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TOKYO-DASH.git
git push -u origin main
```

---

## PASO 4 — Crear el proyecto en Railway y conectar GitHub
1. Entra a [railway.app](https://railway.app) > **New Project**
2. **Deploy from GitHub repo**
3. Si dice *No repositories found*:
   - Haz clic en **Configure GitHub App** > **Repository access: Only select repositories**
   - Selecciona `TOKYO-DASH` > **Save**
   - En Railway pulsa **Refresh** 🔄
   - Alternativa: pega la URL completa `https://github.com/TU-USUARIO/TOKYO-DASH`
4. Selecciona `TOKYO-DASH` > **Deploy**
5. Railway detectará Node desde `package.json`:
   - **Build Command:** *(vacío)*
   - **Start Command:** `npm start` (verifícalo en Ajustes > Build)

**✅ Verificación:** en el canvas ves la tarjeta `TOKYO-DASH` con *Inicializando (00:XX)*. Espera 1-3 min.

---

## PASO 5 — Esperar despliegue exitoso y exponer la URL
1. Haz clic en la tarjeta `TOKYO-DASH` > pestaña **Despliegues**
2. Espera 4 ✅: *Inicialización, Construir, Desplegar, Posterior al despliegue* + **Despliegue exitoso**
3. A la izquierda debe decir **En línea** (bolita verde)
4. Si dice **Servicio no expuesto**: ve a **Ajustes > Public Networking / Networking > Generate Domain**
5. Copia tu URL: ej `ternura-diligente-production.up.railway.app`
6. Ábrela y recarga con `Ctrl + F5`: debe verse dark mode + logo + hero circular

> El banner *"Se han producido bloqueos en la red externa"* es un aviso de Railway, no de tu proyecto. Ignóralo.
> *Quedan 29 días o $5.00* = tu crédito gratis de Railway.

---

## PASO 6 — Cómo hacer mejoras (sin subir desde 0)
1. Edita tus archivos en **VS Code** (botón `Open in Visual Studio Code` en GitHub Desktop) > **Guarda** (Ctrl+S)
2. En GitHub Desktop verás *Changes* (ej: 2 changed files)
3. Escribe en **Summary** qué cambiaste > **Commit to main**
4. **Push origin / Fetch origin** > clic
5. Railway se redespliega **solo en 1-2 min**. Tu URL no cambia.

**Flujo mental:** `VS Code = editas → GitHub Desktop (Commit+Push) = publicas → Railway = en vivo`

---

## SOLUCIÓN DE PROBLEMAS
| Síntoma | Causa | Solución |
|---|---|---|
| *No repositories found* | App GitHub sin permiso | Configure GitHub App > selecciona TOKYO-DASH > Save > Refresh |
| Sitio sale sin estilos (blanco) | Caché del navegador | Cierra pestaña, reabre `SUSHIDASH/index.html`, Ctrl+F5 |
| Railway *Servicio no expuesto* | Falta dominio público | Ajustes > Public Networking > Generate Domain |
| *Despliegue fallido* | Error de build | Ve a Despliegues > Ver registros: ¿dice `🍣 TOKYO DASH`? ¿Start=`npm start`? |
| `Git no se reconoce` | Git no instalado | Instala de git-scm.com/download/win y reabre PowerShell |
| Push pide contraseña | Login GitHub | Usa GitHub Desktop (ya logueado) o git credential token |

---

## CHECKLIST FINAL ANTES DE COMPARTIR
- [ ] La URL de Railway abre y se ve el diseño dark
- [ ] El logo aparece en nav + pestaña del navegador (favicon)
- [ ] El menú deslizable y la reserva responden
- [ ] En GitHub Desktop no quedan *changed files* sin pushear
- [ ] En Railway el último despliegue está *En línea*

---
*Hecho con ♥ para TOKYO DASH — Sushi Delivered · HTML + CSS + JS + Node en Railway*
