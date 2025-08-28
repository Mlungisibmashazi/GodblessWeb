/**
 * Google Apps Script to accept POST requests and append to a Google Sheet.
 * Usage:
 * 1. Create a Google Sheet. Rename the first sheet to "Applications" (or change sheetName below).
 * 2. Open Extensions → Apps Script and paste this code into Code.gs.
 * 3. Save, then Deploy → New deployment → Select "Web app". Set 'Execute as' to 'Me' and 'Who has access' to 'Anyone' (or 'Anyone with Google account' for more privacy).
 * 4. Use the Web App URL in the website to POST JSON application data.
 */

const sheetName = 'Applications';

function doPost(e) {
  try {
    const body = e.postData.contents;
    const data = JSON.parse(body);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
    // If sheet is empty, write headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Parent','Phone','Child','Age','StartDate','Session','Notes','SubmittedAt']);
    }
    sheet.appendRow([
      data.parent || '',
      data.phone || '',
      data.child || '',
      data.age || '',
      data.start || '',
      data.session || '',
      data.notes || '',
      data.submittedAt || new Date().toISOString()
    ]);
    return ContentService.createTextOutput(JSON.stringify({status:'success'})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({status:'error', message: err.message})).setMimeType(ContentService.MimeType.JSON);
  }
}
