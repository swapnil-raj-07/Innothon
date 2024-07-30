import { app, Notification } from 'electron';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const iconPath = path.join(__dirname, 'icon.png');


function showNotification() {
  const hostname = os.hostname();

  const notification = new Notification({
    title: 'Notification',
    body: `Welcome: ${hostname}`,
    icon: fs.existsSync(iconPath) ? iconPath : undefined,
    silent: false, // Set to true if you want to disable sound
  });

  notification.show();

  // Optional: Handle click event on the notification
  notification.on('click', () => {
    console.log('Notification clicked');
  });
}

app.whenReady().then(() => {
  showNotification();

  app.on('activate', () => {
    if (Notification.isSupported()) {
      showNotification();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
