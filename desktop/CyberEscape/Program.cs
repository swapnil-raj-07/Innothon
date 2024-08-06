using Microsoft.Toolkit.Uwp.Notifications;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;
using Windows.UI.Notifications;

namespace CyberEscape
{
    internal static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);


            // Register toast activation event handler
            ToastNotificationManagerCompat.OnActivated += ToastNotificationManagerCompat_OnActivated;

            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            // Create the main form
            MainForm mainForm = new MainForm();

            // Start the application with the form hidden
            Application.Run();
        }

        private async static void ToastNotificationManagerCompat_OnActivated(ToastNotificationActivatedEventArgsCompat e)
        {
            var args = ToastArguments.Parse(e.Argument);
            if (args.Count < 2) return; // TODO

            int notificationId = int.Parse(args["notificationId"]);
            int userId = int.Parse(args["userId"]);

            if (args["action"] == "open")
            {
                await Browser.UpdateNotificationToRead(notificationId, userId);
                
                var requestLink = $"http://localhost:3030/user/{userId}/post/{notificationId}";
                Browser.OpenLink(requestLink);
            }
            else if (args["action"] == "dismiss")
            {
                await Browser.UpdateNotificationToUnRead(notificationId, userId);
            }
        }
    }
}
