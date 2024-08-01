using Microsoft.Toolkit.Uwp.Notifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

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

            Application.Run(new MainForm());
        }
        private static void ToastNotificationManagerCompat_OnActivated(ToastNotificationActivatedEventArgsCompat e)
        {
            // Obtain the arguments from the toast
            ToastArguments args = ToastArguments.Parse(e.Argument);

            // Use the arguments to determine the action
            if (args["action"] == "open")
            {
                // Open action clicked
                Application.OpenForms[0].Invoke((Action)(() =>
                {
                    var form = Application.OpenForms[0];
                    form.Show();
                    form.WindowState = FormWindowState.Normal;
                }));
            }
            else if (args["action"] == "dismiss")
            {
                // Dismiss action clicked
                // Handle the dismiss action
            }
        }
    }
}
