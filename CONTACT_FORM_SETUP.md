# AIMNEX Contact Form Setup

## 1. Create the Google Sheet

1. Create a new Google Sheet for website inquiries.
2. Open `Extensions > Apps Script` from that sheet.
3. Replace the default script with the contents of `contact-form-apps-script.gs`.

## 2. Configure the script

1. Open your Google Sheet and copy the Sheet ID from the URL.
2. The URL looks like:
`https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit#gid=0`
3. In `contact-form-apps-script.gs`, replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` with that Sheet ID.
4. In `contact-form-apps-script.gs`, change `YOUR_EMAIL@example.com` to your real notification email.
5. Save the script project.

## 3. Deploy as a web app

1. Click `Deploy > New deployment`.
2. Choose `Web app`.
3. Set `Execute as` to `Me`.
4. Set `Who has access` to `Anyone`.
5. Deploy and authorize the script.
6. Copy the web app URL.
7. Open the web app URL in your browser. It should display:
`AIMNEX contact endpoint is running.`

## 4. Connect the website form

1. Open `contact.html`.
2. Find `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`.
3. Replace it with the deployed Apps Script web app URL.

## 5. Test the form

1. Open `contact.html` in your browser.
2. Submit a test inquiry.
3. Confirm the new row appears in Google Sheets.
4. Confirm the notification email arrives in your inbox.

## Notes

1. The form uses your own website design, not an embedded Google Form.
2. Submissions are posted from the browser directly to Apps Script.
3. If you change the form fields later, update both `contact.html` and `contact-form-apps-script.gs`.
