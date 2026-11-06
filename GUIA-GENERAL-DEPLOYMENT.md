# 🚀 Guía General de Despliegue — Carpetas locales → GitHub → Railway

> Para CUALQUIER proyecto estático (HTML / CSS / JavaScript) en Windows. Partimos de: **solo tienes tus carpetas en tu PC, sin GitHub Desktop, sin repo en GitHub.**

Tu estructura de ejemplo:
```
MiProyecto/
├── index.html
├── css/style.css
├── js/script.js
└── assets/logo.svg
```

---

## 0. Requisitos
- [ ] Una cuenta en **GitHub** → [github.com/signup](https://github.com/signup)
- [ ] Una cuenta en **Railway** → [railway.app](https://railway.app) (9000 créditos gratis)

---

## PASO 1 — Instalar Git (obligatorio para subir a GitHub)
1. Descarga de [git-scm.com/download/win](https://git-scm.com/download/win)
2. Instala con todo **Next por defecto** (marca "Use Git from Windows Command Prompt")
3. Cierra y vuelve a abrir **PowerShell**
4. Verifica:
```powershell
git version
```

## PASO 2 — Instalar GitHub Desktop (recomendado si vas empezando)
1. Descarga de [desktop.github.com](https://desktop.github.com/)
2. Instala > abre > **Sign in to GitHub.com** (tu cuenta) > autoriza en el navegador
3. Menú **File > Options (Preferences) > Accounts**: verifica que tu usuario aparece
4. Menú **File > Options > Git** (opcional): pon tu nombre y correo de GitHub

## PASO 3 — Crear el repo vacío en GitHub
1. Entra a [github.com/new](https://github.com/new)
2. Ponle un nombre (ej: `mi-proyecto`) > **Public** > **Create**
3. Deja el repo **vacío**: NO marques "Add README"
4. Guarda tu URL remota: `https://github.com/TU-USUARIO/mi-proyecto.git`

## PASO 4 — Conectar tu carpeta local
### Opción A — Con GitHub Desktop (más visual)
1. Abre **GitHub Desktop > File > Add Existing Repository...**
2. Elige tu carpeta `MiProyecto` > **Add Repository**
3. **Repository > Repository Settings...** > en **Remote repository** pega tu URL de GitHub > **Save**
4. Tu carpeta ya está linkeada (GitHub Desktop creó el `.git` solo)

### Opción B — Por terminal (más rápido si ya tienes Git)
```powershell
cd "C:\Users\TU-PC\Escritorio\MiProyecto"
git init
git add .
git commit -m "Primer commit"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/mi-proyecto.git
git push -u origin main
```

## PASO 5 — Primer commit y push
### Con GitHub Desktop:
1. A la izquierda verás **Changes** con tus archivos ✅
2. En **Summary** escribe un mensaje corto: `Primer despliegue`
3. **Commit to main** (botón azul)
4. **Publish branch / Push origin / Fetch origin** (barra superior)
5. Recarga [github.com/TU-USUARIO/mi-proyecto](https://github.com) → deben verse tus archivos

### Con terminal:
```powershell
cd "C:\Users\TU-PC\Escritorio\MiProyecto"
git add .
git commit -m "Primer despliegue"
git push -u origin main
```

## PASO 6 — Preparar tu proyecto para Railway (estático)
Para que Railway sepa arrancar tu sitio, tu carpeta debe tener:
- `package.json` con:
```json
{
  "name": "mi-proyecto",
  "scripts": { "start": "node server.js" },
  "engines": { "node": ">=18" }
}
```
- `server.js` que sirva archivos estáticos y escuche en `$PORT` (plantilla simple sin dependencias):
```js
const http = require('http'), fs = require('fs'), path = require('path');
const PORT = process.env.PORT || 8080;
const MIME = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.svg':'image/svg+xml', '.png':'image/png', '.json':'application/json' };
http.createServer((req,res)=>{
  let p = req.url === '/' ? '/index.html' : decodeURIComponent(req.url.split('?')[0]);
  fs.readFile(path.join(__dirname, p), (e,d)=>{
    if(e){ res.writeHead(404); return res.end('404'); }
    res.writeHead(200, {'Content-Type': MIME[path.extname(p)]||'application/octet-stream'});
    res.end(d);
  });
}).listen(PORT, '0.0.0.0', ()=> console.log('En ' + PORT));
```
Si tu proyecto ya lo tiene, salta este paso.

## PASO 7 — Crear el proyecto en Railway y conectar GitHub
1. Entra a [railway.app](https://railway.app) > **New Project**
2. **Deploy from GitHub repo**
3. Si dice **No repositories found**:
   - Clic en **Configure GitHub App** > **Repository access: Only select repositories** > marca tu repo > **Save**
   - Vuelve a Railway > **Refresh** 🔄
4. Selecciona tu repo > **Deploy**
5. Railway autodetecta Node:
   - **Build Command:** *(vacío)*
   - **Start Command:** `npm start` (verifícalo en **Ajustes > Build**)

## PASO 8 — Esperar despliegue y exponer la URL
1. En el canvas haz clic en tu servicio > pestaña **Despliegues**
2. Espera 1-3 min a que salgan 4 ✅: *Inicialización, Construir, Desplegar, Posterior al despliegue* + **Despliegue exitoso**
3. Debe decir **En línea** (bolita verde)
4. Haz clic en **Ajustes > Networking / Public Networking > Generate Domain**
5. Tu sitio queda en: `tu-proyecto-production.up.railway.app`
6. Ábrela con `Ctrl+F5` para evitar caché

> Dónde estás si te pierdes: el **canvas oscuro** es tu mapa. Clic en tu servicio = logs. **Ajustes** = configuración. **Networking** = tu dominio público.

## PASO 9 — Cómo actualizar (sin rehacer nada)
1. Edita tus archivos localmente (VS Code u otro editor) > **Guarda**
2. En **GitHub Desktop**: `Summary` → `Commit to main` → `Push origin`
3. (o por terminal: `git add . && git commit -m "..." && git push`)
4. **Railway se redespliega solo en 1-2 min**. Tu URL no cambia.

---

## SOLUCIÓN DE PROBLEMAS COMUNES
| Problema | Por qué pasa | Fix |
|---|---|---|
| `No repositories found` | La app Railway no tiene permiso | Configure GitHub App → autoriza tu repo → Refresh |
| `Git no se reconoce` | Git no instalado o PowerShell viejo | Instala Git, cierra y reabre PowerShell |
| Páginas sin CSS (todo blanco) | Caché del navegador | Cierra pestaña, reabre, Ctrl+F5 |
| `Servicio no expuesto` | Falta dominio público | Ajustes → Public Networking → Generate Domain |
| `Despliegue fallido` | Error de build | Ve a **Despliegues > Ver registros**: ¿falta `npm start`? ¿`server.js` no existe? |
| Push pide usuario/clave | Sin login en Desktop | GitHub Desktop > File > Options > Accounts > Sign in |
| Quedaste en una pantalla y no sabes volver | UI de Railway/GitHub | En Railway clic en tu servicio en el canvas para volver al panel |

---

## CHECKLIST FINAL
- [ ] La URL de Railway abre con estilos y JS funcionando
- [ ] GitHub tiene todos tus archivos y el historial de commits
- [ ] En GitHub Desktop no quedan *changed files* sin pushear
- [ ] El último despliegue en Railway dice **En línea**
- [ ] Tu **Start Command** = `npm start` y el puerto es `$PORT`

---
*Esta guía funciona para cualquier landing estática HTML/CSS/JS. Solo necesitas Git + GitHub + Railway.*
