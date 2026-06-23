const SPREADSHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME = 'Website Inquiries';
const NOTIFICATION_EMAIL = 'YOUR_EMAIL@example.com';

function doGet() {
  return ContentService
    .createTextOutput('AIMNEX contact endpoint is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const payload = sanitizePayload_(e && e.parameter ? e.parameter : {});
    const sheet = getOrCreateSheet_();

    sheet.appendRow([
      new Date(),
      payload.name,
      payload.company,
      payload.email,
      payload.phone,
      payload.location,
      payload.inquiryType,
      payload.message,
      payload.source,
      payload.pageUrl
    ]);

    if (NOTIFICATION_EMAIL && NOTIFICATION_EMAIL !== 'YOUR_EMAIL@example.com') {
      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: 'New AIMNEX website inquiry',
        replyTo: payload.email || undefined,
        body: buildNotificationBody_(payload)
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Submitted At',
      'Name',
      'Company',
      'Email',
      'Phone',
      'Location',
      'Inquiry Type',
      'Message',
      'Source',
      'Page URL'
    ]);
  }

  return sheet;
}

function sanitizePayload_(params) {
  return {
    name: clean_(params.name),
    company: clean_(params.company),
    email: clean_(params.email),
    phone: clean_(params.phone),
    location: clean_(params.location),
    inquiryType: clean_(params.inquiryType),
    message: clean_(params.message),
    source: clean_(params.source),
    pageUrl: clean_(params.pageUrl)
  };
}

function clean_(value) {
  return String(value || '').trim();
}

function buildNotificationBody_(payload) {
  return [
    'A new inquiry was submitted on the AIMNEX website.',
    '',
    'Name: ' + payload.name,
    'Company: ' + payload.company,
    'Email: ' + payload.email,
    'Phone: ' + payload.phone,
    'Location: ' + payload.location,
    'Inquiry Type: ' + payload.inquiryType,
    'Source: ' + payload.source,
    'Page URL: ' + payload.pageUrl,
    '',
    'Message:',
    payload.message
  ].join('\n');
}
