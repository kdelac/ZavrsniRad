using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Hubs
{
    public class PositionHub : Hub
    {
        public async Task PositionFromServer(float x, float y, int height, int width)
        {
            Console.WriteLine("Recive position from server x: " +x + "y: " +y);
            await Clients.All.SendAsync("maca", x, y, height, width);
        }
    }
}
