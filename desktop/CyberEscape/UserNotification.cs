using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CyberEscape
{
    public class UserNotification
    {
        public string hostName { get; set; }
        public string header { get; set; }
        public string body { get; set; }
        public string imagePath {  get; set; }

        public int notificationId {  get; set; }
        public DateTime scheduledDate { get; set; }
        public DateTime? futureDate { get; set; }

        public string scheduledTime { get; set; }
        public int points { get; set; }
        public int userId { get; set; }

    }
}
