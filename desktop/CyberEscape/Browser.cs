using Newtonsoft.Json;
using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace CyberEscape
{
    public class Browser
    {
        private HttpClient httpClient;
        public Browser()
        {
            httpClient = new HttpClient();
        }

        public static void OpenLink(string link)
        {
            Process.Start(new ProcessStartInfo
            {
                FileName = link,
                UseShellExecute = true // Ensures that the URL is opened in the default web browser
            });
        }

        public static async Task UpdateNotificationToRead(int notificationId, int userId)
        {
            var requestLink = $"http://localhost:3000/userNotification?notificationId={notificationId}&userId={userId}";

            var readObject = new NotificationRead
            {
                isRead = 1 // All read message will have "1"
            };

            var objAsJson = JsonConvert.SerializeObject(readObject);
            var content = new StringContent(objAsJson, Encoding.UTF8, "application/json");
            var _httpClient = new HttpClient();

            HttpResponseMessage response = await _httpClient.PutAsync(requestLink, content);
            response.EnsureSuccessStatusCode();
        }
    }
}
