using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
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
                string apiUrl = "http://localhost:3000/userNotification?userId=5CG1431YJG";

                HttpResponseMessage response = await httpClient.GetAsync(apiUrl);
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();
                notifications = JsonConvert.DeserializeObject<List<UserNotification>>(responseBody);

                var today = DateTime.Now.Date; // Get the current date without time
                var topNotification = notifications
                    .Where(n => n.scheduledDate.Date <= today)
                    .OrderBy(n => n.scheduledDate) // Optional: order by date if needed
                    .FirstOrDefault(); // Pick only the top one

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
            // TODO - show the web page
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

            //string baseUrl = "http://localhost:3000"; // Ensure this is correct
            //string imagePath = "/images/4.png"; // Make sure this is a valid path

            //// Construct the full URL for the image
            //string fullUrl = $"{baseUrl}/{Uri.EscapeDataString(imagePath)}";

            //// Validate the URI
            //if (!Uri.TryCreate(fullUrl, UriKind.Absolute, out Uri imageUri))
            //{
            //    throw new InvalidOperationException("The constructed URI is invalid.");
            //}


            //// Convert the image URL to Base64
            //string base64Image = ImageConverter.ImageUrlToBase64("https://picsum.photos/360/202?image=883");
            //if (base64Image == null)
            //{
            //    throw new Exception("Failed to convert image to Base64.");
            //}

            //// Create the Data URI for the Base64 image
            //string imageDataUri = $"data:image/png;base64,{base64Image}";

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

