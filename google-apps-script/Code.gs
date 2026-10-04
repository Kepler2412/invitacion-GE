/**
 * Backend de confirmaciones — Boda Germán & Evelyn
 * ------------------------------------------------
 * 1. Crea una Hoja de cálculo de Google (cualquier nombre).
 * 2. Extensiones → Apps Script. Borra lo que haya y pega este archivo.
 * 3. Cambia ADMIN_KEY por una clave tuya (es la que pedirá el panel).
 * 4. Implementar → Nueva implementación → Tipo: Aplicación web
 *      Ejecutar como: Yo   ·   Quién tiene acceso: Cualquier usuario
 * 5. Copia la URL que termina en /exec y pégala en config.js → SHEETS_URL.
 *
 * Si luego cambias este código, usa "Gestionar implementaciones" → editar →
 * versión nueva, para que la URL siga siendo la misma.
 */

const ADMIN_KEY = 'CAMBIA-ESTA-CLAVE';
const SHEET_NAME = 'Invitados';
const COLS = ['id','nombre','telefono','cupos','enviada','enviadaEn','rsvp','asistentes','mensaje','respondidoEn','creado'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(COLS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, COLS.length).setFontWeight('bold').setBackground('#f4c443');
  }
  return sh;
}

function rows_(sh) {
  const values = sh.getDataRange().getValues();
  const head = values.shift() || COLS;
  return values.map((r, i) => {
    const o = { _row: i + 2 };
    head.forEach((h, j) => { o[h] = r[j] instanceof Date ? r[j].toISOString() : r[j]; });
    return o;
  });
}

function write_(sh, rowNum, obj) {
  const line = COLS.map(c => (obj[c] === undefined || obj[c] === null) ? '' : obj[c]);
  if (rowNum) sh.getRange(rowNum, 1, 1, COLS.length).setValues([line]);
  else sh.appendRow(line);
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return json_({ ok: true, msg: 'Backend de la boda funcionando 💍' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const sh = sheet_();
    const all = rows_(sh);
    const now = new Date().toISOString();

    // ---- Público: respuesta del invitado desde la invitación ----
    if (body.action === 'rsvp') {
      const resp = body.respuesta === 'si' ? 'si' : 'no';
      let g = body.id ? all.find(r => String(r.id) === String(body.id)) : null;
      if (!g && body.nombre) g = all.find(r => String(r.nombre).trim().toLowerCase() === String(body.nombre).trim().toLowerCase());
      const data = g ? g : { id: body.id || Utilities.getUuid().slice(0, 8), nombre: String(body.nombre || '').slice(0, 80), cupos: '', enviada: '', creado: now };
      data.rsvp = resp;
      data.asistentes = resp === 'si' ? Math.max(1, Math.min(20, parseInt(body.asistentes, 10) || 1)) : 0;
      data.mensaje = String(body.mensaje || '').slice(0, 300);
      data.respondidoEn = now;
      write_(sh, g ? g._row : null, data);
      return json_({ ok: true });
    }

    // ---- Privado: panel de invitados ----
    if (body.key !== ADMIN_KEY) return json_({ ok: false, error: 'Clave incorrecta' });

    if (body.action === 'list') {
      return json_({ ok: true, guests: all.map(r => { delete r._row; return r; }) });
    }
    if (body.action === 'upsert' && body.guest && body.guest.id) {
      const g = body.guest;
      const ex = all.find(r => String(r.id) === String(g.id));
      const merged = Object.assign({}, ex || {}, g);
      // No pisar la respuesta que el invitado dio desde la invitación,
      // salvo que el panel la cambie a propósito (forceRsvp)
      if (ex && !body.forceRsvp) {
        ['rsvp', 'asistentes', 'respondidoEn', 'mensaje'].forEach(k => { merged[k] = ex[k]; });
      }
      write_(sh, ex ? ex._row : null, merged);
      return json_({ ok: true });
    }
    if (body.action === 'delete' && body.id) {
      const ex = all.find(r => String(r.id) === String(body.id));
      if (ex) sh.deleteRow(ex._row);
      return json_({ ok: true });
    }
    return json_({ ok: false, error: 'Acción no válida' });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
