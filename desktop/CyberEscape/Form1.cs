using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.Toolkit.Uwp.Notifications;
using Newtonsoft.Json;
using Windows.UI.Notifications;
using Windows.UI.Xaml.Shapes;
using Path = System.IO.Path;

namespace CyberEscape
{
    public partial class MainForm : Form
    {
        private System.Windows.Forms.Timer timer;
        private NotifyIcon notifyIcon2;
        public List<UserNotification> notifications;
        private int notificationCounter = 0;
        private HttpClient httpClient;

        public MainForm()
        {
            InitializeComponent();
            InitializeTrayIcon();
            InitializeTimer();
            notifications = new List<UserNotification>();
            httpClient = new HttpClient();
        }

        private void InitializeTrayIcon()
        {
            // Initialize NotifyIcon
            notifyIcon2.Icon = Properties.Resources.alert;
            notifyIcon2.Visible = true;

            // Initialize Context Menu
            ContextMenuStrip contextMenu = new ContextMenuStrip();
            ToolStripMenuItem openMenuItem = new ToolStripMenuItem("Open");
            ToolStripMenuItem exitMenuItem = new ToolStripMenuItem("Exit");

            contextMenu.Items.Add(openMenuItem);
            contextMenu.Items.Add(exitMenuItem);

            notifyIcon2.ContextMenuStrip = contextMenu;

            // Add event handlers
            openMenuItem.Click += new EventHandler(OpenMenuItem_Click);
            exitMenuItem.Click += new EventHandler(ExitMenuItem_Click);
        }

        private void InitializeTimer()
        {
            timer = new System.Windows.Forms.Timer();
            timer.Interval = 20000; // 20 seconds
            timer.Tick += Timer_Tick;
            timer.Start();
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            // Hide the form initially
            this.Hide();
        }


        private async void FetchApiDataAsync()
        {
            try
            {
                notifications.Clear();

                string machineName = Environment.MachineName;
                string userMachine = machineName.Split('-')[1];

                string apiUrl = $"http://localhost:3000/userNotificationUnRead?userId={userMachine}";

                HttpResponseMessage response = await httpClient.GetAsync(apiUrl);
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();
                notifications = JsonConvert.DeserializeObject<List<UserNotification>>(responseBody);

                if (notifications.Count == 0) return;

                var today = DateTime.Now; // Get the current date without time
                var topNotification = notifications
                    .Where(n => (n.futureDate == null && n.scheduledDate.Date <= today) || (n.futureDate != null && n.futureDate.Value <= today))
                    .OrderBy(n => n.scheduledDate)
                    .LastOrDefault(); // Pick only the lastest date

                if (topNotification == null)
                {
                    LogMessage("No new User notification found");
                    return;
                }

                if (notifications.Count > 0)
                    ShowToastNotification(topNotification);
            }
            catch (Exception ex)
            {
                LogMessage(ex.Message);
            }
        }
        private void Timer_Tick(object sender, EventArgs e)
        {
            FetchApiDataAsync();
        }

        private void OpenMenuItem_Click(object sender, EventArgs e)
        {
            Browser.OpenLink("http://localhost:3030/");
        }

        private void ExitMenuItem_Click(object sender, EventArgs e)
        {
            notifyIcon2.Dispose();
            Application.Exit();
        }

        private void MainForm_Resize(object sender, EventArgs e)
        {
            if (this.WindowState == FormWindowState.Minimized)
            {
                this.Hide();
                notifyIcon2.ShowBalloonTip(3000, "App Minimized", "The application is running in the system tray.", ToolTipIcon.Info);
            }
        }

        private void ShowToastNotification(UserNotification notification)
        {
            LogMessage($"Showing notification for messag ${JsonConvert.SerializeObject(notification)}");

            var imagePath = GetLocalImagePath(notification.imagePath);

            // Construct the toast content
            var toastContent = new ToastContentBuilder()
                    .AddArgument("action", "viewNotification")
                    .AddText(notification.header)
                    .AddText(notification.body)
                    .AddInlineImage(new Uri(imagePath))
                    .AddButton(new ToastButton()
                        .SetContent("Open")
                        .AddArgument("action", "open")
                        .AddArgument("notificationId", notification.notificationId.ToString())
                        .AddArgument("userId", notification.userId.ToString())
                        .SetBackgroundActivation())
                    .AddButton(new ToastButton()
                        .SetContent("Dismiss")
                        .AddArgument("action", "dismiss")
                        .AddArgument("notificationId", notification.notificationId.ToString())
                        .AddArgument("userId", notification.userId.ToString())
                        .SetBackgroundActivation())
                    .GetToastContent();

            // Create the toast notification
            var toast = new ToastNotification(toastContent.GetXml());

            // Show the toast notification
            ToastNotificationManagerCompat.CreateToastNotifier().Show(toast);
        }

        public string GetLocalImagePath(string fileName)
        {
            string imageFileName = Path.GetFileName(fileName);
            string folderPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "images");
            return Path.Combine(folderPath, imageFileName);
        }

        private void LogMessage(string message)
        {
            string logFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "activity.log");
            try
            {
                using (StreamWriter sw = new StreamWriter(logFilePath, true))
                {
                    sw.WriteLine($"{DateTime.Now}: {message}");
                }
            }
            catch (Exception ex)
            {
                // Handle any exceptions that might occur while logging
                MessageBox.Show($"Error writing to log file: {ex.Message}");
            }
        }
    }
}

