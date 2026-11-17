# Reikemetse FC website starter

A responsive public club website and a browser-based admin dashboard prototype for Reikemetse Football Club.

## Run it
1. Extract the `ReikemetseFC` folder.
2. Open the folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension and choose **Open with Live Server**.

No build tools or database are required for this first prototype.

## Demo admin login
- Email: `admin@reikemetsefc.co.za`
- Password: `Royals2026!`

Open the website and select **ADMIN LOGIN** in the top navigation.

## Important prototype limitations
- Admin changes are saved in the browser's local storage on that device/browser only.
- This demo login is not secure authentication. Do not publish this version with real private club information or use the demo password as a live admin password.
- There is no shared online database, image upload, or multi-user access yet.
- The hero stadium photograph is loaded from Unsplash and therefore needs an internet connection. The uploaded club logo is stored locally in `assets/`.

## Next production steps
Before public launch, connect a real backend and database (for example Spring Boot + PostgreSQL), implement server-side authentication and role permissions, add secure image uploads, configure backups, and deploy with HTTPS. Replace the placeholder contact email and add verified club contact details, player information, fixtures, results and club photographs.
