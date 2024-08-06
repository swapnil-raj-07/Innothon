using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace CyberEscape
{
    public class ImageConverter
    {
        public static string ImageUrlToBase64(string imageUrl)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    // Download the image data from the URL
                    byte[] imageData = client.GetByteArrayAsync(imageUrl).Result;

                    // Convert the image data to Base64 string
                    return Convert.ToBase64String(imageData);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error converting image to Base64: {ex.Message}");
                return null;
            }
        }

    }
}

