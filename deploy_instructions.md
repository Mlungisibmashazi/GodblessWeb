Deployment & Form wiring instructions
====================================

A) Host the site (pick one)
---------------------------
1) GitHub Pages (free)
   - Create a GitHub repository and push the project files (index.html and images/).
   - In repository Settings → Pages, set source to the main branch root. The site will be available at https://<username>.github.io/<repo>.
   - Use that URL as your site link.

2) Netlify (free tier is fine)
   - Create an account at netlify.com and drag & drop the unzipped folder into Sites → Deploys → New site from Git → or drag-and-drop the folder.
   - Netlify will publish a URL; you can add a custom domain later.

3) Host on any static host (Vercel, Surge, plain Apache/nginx). Just upload the files.

B) Receive applications in a Google Sheet (web app)
--------------------------------------------------
1) Create a new Google Sheet. Rename its first sheet to "Applications" (or change the sheetName variable in apps_script.gs).
2) In the Google Sheet go to Extensions → Apps Script.
3) Replace the default Code.gs with the contents of apps_script.gs provided here. Save the project.
4) Deploy → New deployment → Select 'Web app'. Set:
   - 'Execute as': Me
   - 'Who has access': Anyone (or Anyone with Google account for extra privacy)
   - Click Deploy and copy the Web App URL.
5) Test with curl or Postman using a JSON payload.

C) Wiring the website to the Google Apps Script
-----------------------------------------------
Add this small JavaScript snippet to index.html (inside <script> after the form submit handler) — replace WEB_APP_URL with your Web App URL from step B4:

```js
// After saving locally into localStorage, also POST to Google Apps Script
fetch('WEB_APP_URL', {
  method: 'POST',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify(app) // 'app' is the same object saved locally
}).then(r => r.json()).then(j => { console.log('sent to sheet', j); }).catch(e => { console.warn('sheet error', e); });
```

Note: If you set 'Who has access' to 'Anyone', the web app will accept public POSTs. If you want stronger security, use 'Anyone with Google account' and require authentication — that's more advanced and I can help set it up using Google OAuth or a small server-side proxy.

D) Email notifications (serverless)
----------------------------------
If you want automatic email notifications (instead of relying on the user to press 'Send by Email'), you can:
- Add a second Apps Script function to send an email when a new row is appended (using MailApp.sendEmail).
- Or use Zapier / Make to watch the Google Sheet and email you when a new row appears.

E) Custom domain and HTTPS
--------------------------
Both Netlify and GitHub Pages support custom domains with HTTPS automatically. Netlify is simpler for drag-and-drop deployments and offers built-in forms & redirects.

If you'd like, I can:
- Deploy the site to GitHub Pages for you (I will provide exact git commands and a ready-to-push repo structure).
- Deploy to Netlify and provide the live link (you'd need to connect the Netlify account or provide the ZIP to upload).

Security & Privacy note:
- The included Google Apps Script accepts public POST by default when deployed as 'Anyone'. Do not publish sensitive data. For personal data protection, set 'Anyone with Google account' and restrict access, or add a simple shared secret parameter checked by the script before appending.
