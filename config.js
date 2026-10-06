/* ============================================================
   CONFIGURACIÓN DE LA INVITACIÓN — Germán & Evelyn
   Este es el ÚNICO archivo que necesitas editar.
   ============================================================ */
window.CONFIG = {
  // Novios
  NOVIO: "Germán",
  NOVIA: "Evelyn",

  // Fecha y hora de la ceremonia (hora de Colombia, UTC-5)
  FECHA_ISO: "2026-10-24T16:00:00-05:00",
  FECHA_TEXTO: "Sábado 24 de octubre de 2026",
  HORA_TEXTO: "4:00 p. m.",

  // Lugares
  CEREMONIA_LUGAR: "Iglesia San Juan de la Tasajera",
  CEREMONIA_CIUDAD: "Copacabana, Antioquia",
  CEREMONIA_MAPA: "https://www.google.com/maps/search/?api=1&query=6.3557475,-75.4956533",

  CENA_LUGAR: "Restaurante El Pimiento Rojo",
  CENA_CUANDO: "Después de la ceremonia",
  CENA_MAPA: "https://www.google.com/maps/search/?api=1&query=Restaurante+El+Pimiento+Rojo+Copacabana+Antioquia",

  // Confirmación
  FECHA_LIMITE_TEXTO: "12 de octubre",
  FECHA_LIMITE_ISO: "2026-10-12T23:59:59-05:00",

  // Número de WhatsApp de los novios (con indicativo, solo dígitos). Ej: "573001234567"
  // Si se llena, los invitados pueden avisar su respuesta por WhatsApp.
  WHATSAPP_NOVIOS: "573057720034",

  // URL del Web App de Google Apps Script (ver google-apps-script/Code.gs y README).
  // Si se llena, las confirmaciones quedan registradas automáticamente
  // y el panel de invitados se sincroniza entre dispositivos.
  SHEETS_URL: "",

  // Dirección pública de la invitación (opcional). Si se deja vacía,
  // el panel la calcula solo a partir de la dirección donde está publicado.
  // Ej: "https://tu-usuario.github.io/invitacion-german-evelyn/"
  SITE_URL: "",

  // Narración con sus voces. Al tocar "Abre el libro" empieza a sonar
  // y las páginas pasan solas siguiendo el audio. Deja "" para quitarla.
  AUDIO_NARRACION: "assets/audio/narracion.mp3",

  // Segundo del audio en que empieza cada página:
  //   [Cap.1, Cap.2, Cap.3, Cap.4, Cap.5, Cap.6, Cap.7, Invitación, Confirmación]
  // La confirmación aparece unos segundos después de la invitación para dar
  // tiempo de leerla. Si cambias la grabación, ajusta estos tiempos.
  AUDIO_CUES: [0, 17.6, 33.2, 43.6, 49.9, 57.2, 64.8, 74.0, 92.0],

  // Mensaje que se envía por WhatsApp. {nombre} y {enlace} se reemplazan solos.
  MENSAJE_WHATSAPP:
    "Hola {nombre} 💍✨\n\nGermán y Evelyn queremos contarte nuestra historia y hacerte una invitación muy especial. Ábrela aquí 👇\n\n{enlace}\n\nPor favor confírmanos antes del 12 de octubre 🙏",
};
