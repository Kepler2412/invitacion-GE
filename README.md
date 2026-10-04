# 💍 Invitación Germán & Evelyn — "Nuestra historia"

Invitación digital tipo **libro-historieta**: el invitado pasa las hojas (botones, deslizando el dedo o con las flechas del teclado) y al final ve los datos del matrimonio, una cuenta regresiva y el formulario para confirmar. Funciona en celular y en portátil.

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La invitación (lo que reciben los invitados) |
| `admin.html` | Panel para registrar invitados, enviarles la invitación por WhatsApp y ver quién confirmó |
| `config.js` | **El único archivo que hay que editar**: fechas, lugares, números, textos |
| `google-apps-script/Code.gs` | Backend gratuito (Google Sheets) para registrar las confirmaciones |
| `assets/` | Fotos, tipografías, imagen de vista previa (`og-image.jpg`) y favicon |

## 1. Publicar en GitHub Pages

1. Crea un repositorio (por ejemplo `invitacion-german-evelyn`) y sube todo el contenido de esta carpeta.
2. En el repo: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`** → Save.
3. En 1–2 minutos queda en `https://TU-USUARIO.github.io/invitacion-german-evelyn/`.
4. **Vista previa en WhatsApp:** abre `index.html` y reemplaza `TU-USUARIO` y `TU-REPO` en las líneas `og:image` y `og:url` (WhatsApp exige la dirección completa de la imagen). Haz commit.

## 2. Cómo funciona el enlace personalizado

Cada invitado recibe un enlace así:

```
https://TU-USUARIO.github.io/TU-REPO/?para=Familia%20G%C3%B3mez&cupos=4&id=abc123
```

- `para` → el nombre que aparece en la portada, en la invitación y en la confirmación.
- `cupos` → cuántas personas puede llevar (se muestra "Hemos reservado N cupos").
- `id` → identifica al invitado para registrar su respuesta.

No hace falta armarlo a mano: el panel lo genera.

## 3. Panel de invitados (`admin.html`)

Abre `https://TU-USUARIO.github.io/TU-REPO/admin.html`:

- Agrega invitados (nombre, WhatsApp opcional, cupos) uno a uno o en lote.
- **💬 Enviar** abre WhatsApp con el mensaje y el enlace listos (si tiene número, directo a ese chat).
- Casilla **Confirmó** para marcar a mano, ✏️ para editar la respuesta y las personas.
- Contadores: invitaciones, cupos, enviadas, confirmados, personas confirmadas, no asisten.
- Exportar a Excel (CSV) y copias de seguridad.

### Modo local (sin configurar nada)
La lista se guarda solo en el navegador donde se abre el panel. Descarga copias de seguridad. Para que los invitados avisen su respuesta, llena `WHATSAPP_NOVIOS` en `config.js`: al confirmar, se les abre WhatsApp con un mensaje listo para los novios, y tú marcas la casilla en el panel.

### Modo Google Sheets (recomendado — registro automático)
Las confirmaciones quedan guardadas solas y el panel funciona desde cualquier dispositivo.

1. Crea una hoja en Google Sheets → **Extensiones → Apps Script**.
2. Pega el contenido de `google-apps-script/Code.gs` y cambia `ADMIN_KEY` por una clave tuya.
3. **Implementar → Nueva implementación → Aplicación web**, *Ejecutar como: Yo*, *Acceso: Cualquier usuario* → autoriza.
4. Copia la URL que termina en `/exec` y pégala en `config.js → SHEETS_URL`.
5. Al abrir el panel te pedirá la clave del paso 2 (la clave nunca queda en el código público).

> Si cambias el `Code.gs` después, usa *Gestionar implementaciones → Editar → Nueva versión* para conservar la misma URL.

## 4. Narración con sus voces (opcional)
Graben el guion, guárdenlo como `assets/audio/narracion.mp3` y pongan `AUDIO_NARRACION: "assets/audio/narracion.mp3"` en `config.js`. Aparece el botón **🎧 Escuchar nuestra historia**.

## 5. Probar en tu computador
```bash
python3 -m http.server 8000
# abre http://localhost:8000/?para=Prueba&cupos=2
```

## Notas
- El panel no es un sistema de seguridad fuerte: es una página pública sin datos sensibles; las respuestas solo se leen con la clave de la hoja.
- Para cambiar fotos, reemplaza los archivos en `assets/fotos/` conservando el nombre.
- Si cambias la portada, regenera `assets/og-image.jpg` (1200×630). WhatsApp guarda la vista previa en caché; si no se actualiza, prueba con `?v=2` al final del enlace.
