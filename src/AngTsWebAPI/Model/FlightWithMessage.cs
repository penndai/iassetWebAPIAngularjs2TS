using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngTsWebAPI.Model
{
    public class FlightWithMessage
    {
		public string msg { get; set; }
		public Flight flight { get; set; }
    }
}
