using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.Toolkit.Uwp.Notifications;
using Windows.UI.Notifications;

namespace CyberEscape
{
    public partial class MainForm : Form
    {
        private System.Windows.Forms.Timer timer;
        private NotifyIcon notifyIcon2;

        public MainForm()
        {
            InitializeComponent();
            InitializeTrayIcon();
            InitializeTimer();
        }

        private void InitializeTrayIcon()
        {
            // Initialize NotifyIcon
            notifyIcon2.Icon = SystemIcons.Information;
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
            // to show notification related messages
        }

        private void Timer_Tick(object sender, EventArgs e)
        {
            ShowToastNotification();
        }

        private void OpenMenuItem_Click(object sender, EventArgs e)
        {
            this.Show();
            this.WindowState = FormWindowState.Normal;
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

        private void ShowToastNotification()
        {
            // Construct the toast content
            var toastContent = new ToastContentBuilder()
                    .AddArgument("action", "viewConversation")
                    .AddArgument("conversationId", 9813)
                    .AddText("New message from Koch System Admin")
                    .AddText("Hey, check this out!")
                    .AddInlineImage(new Uri("file:///C:/Hacaton/CyberSafe/cyberSafe/hack.png")) // Update with the actual image path
                    .AddButton(new ToastButton()
                        .SetContent("Open")
                        .AddArgument("action", "open")
                        .SetBackgroundActivation())
                    .AddButton(new ToastButton()
                        .SetContent("Dismiss")
                        .AddArgument("action", "dismiss")
                        .SetBackgroundActivation())
                    .GetToastContent();

            // Create the toast notification
            var toast = new ToastNotification(toastContent.GetXml());

            // Show the toast notification
            ToastNotificationManagerCompat.CreateToastNotifier().Show(toast);
        }
    }
}

