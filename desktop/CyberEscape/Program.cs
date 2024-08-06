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
        //private static void ToastNotificationManagerCompat_OnActivated(ToastNotificationActivatedEventArgsCompat e)
        //{
        //    // Obtain the arguments from the toast
        //    ToastArguments args = ToastArguments.Parse(e.Argument);

        //    // Use the arguments to determine the action
        //    if (args["action"] == "open")
        //    {
        //        // Open action clicked
        //        Application.OpenForms[0].Invoke((Action)(() =>
        //        {
        //            var form = Application.OpenForms[0];
        //            form.Show();
        //            form.WindowState = FormWindowState.Normal;
        //        }));
        //    }
        //    else if (args["action"] == "dismiss")
        //    {
        //        // Dismiss action clicked
        //        // Handle the dismiss action
        //    }
        //}

        private static void ToastNotificationManagerCompat_OnActivated(ToastNotificationActivatedEventArgsCompat e)
        {
            var args = ToastArguments.Parse(e.Argument);
            int notificationId = int.Parse(args["notificationId"]);
            int userId = int.Parse(args["userId"]);


            if (args["action"] == "open")
            {
                // TODO open web page
                Process.Start(new ProcessStartInfo
                {
                    FileName = "https://github.com/FlintHills",
                    UseShellExecute = true // Ensures that the URL is opened in the default web browser
                });
            }
            else if (args["action"] == "dismiss")
            {
                // TODO Update the status in DB
            }
        }

    }
}
