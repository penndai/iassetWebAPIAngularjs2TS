using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngTsWebAPI.Model
{	
	public class Flight
    {
		public int Identity { get; set; }
		public string ID { get; set; }

		public string ArrivalTime { get; set; }
		public string ArrivalTimeLong { get; set; }
		public string DepartureTime { get; set; }
		public string DepartureTimeLong { get; set; }
		public int GateID { get; set; }
    }
}
