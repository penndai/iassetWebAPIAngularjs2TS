using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngTsWebAPI.Model
{
	public class Gate
	{
		private int _maximumflight = 10;
		public int ID { get; set; }
		public string Name { get; set; }
		public int MaximumFlight { get { return _maximumflight; } }
	}
}
