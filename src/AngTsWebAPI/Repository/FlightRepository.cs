using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngTsWebAPI.Model;

namespace AngTsWebAPI.Repository
{
	public class FlightRepository : IFlightRepository
	{
		static List<Flight> FlightList = new List<Flight>();

		public FlightRepository()
		{
			if (FlightList.Count == 0)
			{
				FlightList.Add(
					new Flight()
					{
						Identity = 1,
						ID = "F11",
						GateID = 1,
						ArrivalTime = string.Format("{0:g}", DateTime.Now),
						ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now),
						DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(0.5)),
						DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(0.5))
					});
				FlightList.Add(new Flight() { Identity = 2, ID = "F12", GateID = 2, ArrivalTime = string.Format("{0:g}", DateTime.Now.AddHours(1)), ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(1)), DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(1.5)), DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(1.5)) });
				FlightList.Add(new Flight() { Identity = 3, ID = "F13", GateID = 1, ArrivalTime = string.Format("{0:g}", DateTime.Now.AddHours(1.5)), ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(1.5)), DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(2)), DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(2)) });
				FlightList.Add(new Flight() { Identity = 4, ID = "F14", GateID = 2, ArrivalTime = string.Format("{0:g}", DateTime.Now.AddHours(2)), ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(2)), DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(2.5)), DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(2.5)) });
				FlightList.Add(new Flight() { Identity = 5, ID = "F21", GateID = 1, ArrivalTime = string.Format("{0:g}", DateTime.Now.AddHours(2.5)), ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(2.5)), DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(3)), DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(3)) });
				FlightList.Add(new Flight() { Identity = 6, ID = "F22", GateID = 2, ArrivalTime = string.Format("{0:g}", DateTime.Now.AddHours(3)), ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(3)), DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(3.5)), DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(3.5)) });
				FlightList.Add(new Flight() { Identity = 7, ID = "F23", GateID = 1, ArrivalTime = string.Format("{0:g}", DateTime.Now.AddHours(3.5)), ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(3.5)), DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(4)), DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(4)) });
				FlightList.Add(new Flight() { Identity = 8, ID = "F24", GateID = 2, ArrivalTime = string.Format("{0:g}", DateTime.Now.AddHours(4)), ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(4)), DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(4.5)), DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(4.5)) });
				FlightList.Add(new Flight() { Identity = 9, ID = "F25", GateID = 1, ArrivalTime = string.Format("{0:g}", DateTime.Now.AddHours(4.5)), ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(4.5)), DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(5)), DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(5)) });
				FlightList.Add(new Flight() { Identity = 10, ID = "F26", GateID = 2, ArrivalTime = string.Format("{0:g}", DateTime.Now.AddHours(5)), ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(5)), DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(5.5)), DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(5.5)) });
			}
		}

		public void Add(Flight flight)
		{
			if (FlightList.Count > 0)
				flight.Identity = FlightList.Max(x => x.Identity) + 1;
			else
				flight.Identity = 1;

			FlightList.Add(flight);
		}

		public Flight Find(int id)
		{
			return FlightList.Where(x => x.Identity == id).SingleOrDefault();
		}

		public bool Validate(Flight flight, out string errorMsg)
		{
			bool value = true;
			errorMsg = string.Empty;
			foreach (Flight f in FlightList)
			{
				var arriveTime = DateTime.Parse(f.ArrivalTime);
				var ftime = DateTime.Parse(flight.ArrivalTime);

				if (ftime >= arriveTime.AddMinutes(-30) && ftime <= arriveTime.AddMinutes(30))
				{
					value = false;
					errorMsg = string.Format("flight: {0}", f.ID);
					break;
				}
			}

			return value;
		}

		public List<Flight> FindByGate(int gateid)
		{
			List<Flight> rtn = new List<Flight>();

			if (gateid > 0)
				rtn = FlightList.Where(x=>DateTime.Parse(x.ArrivalTime) >= DateTime.Now).Where(x => x.GateID == gateid).ToList();
			else
				rtn = FlightList.ToList();

			return rtn;
		}

		public IEnumerable<Flight> GetTodayAll()
		{
			return FlightList.Where(x => DateTime.Parse(x.ArrivalTime) >= DateTime.Now).ToList();
		}

		public int GetNewIdentity()
		{
			if (FlightList.Count > 0)
				return FlightList.Max(x => x.Identity) + 1;
			else
				return 1;
		}
		public void Remove(int id)
		{
			var flight = FlightList.SingleOrDefault(x => x.Identity == id);
			if (flight != null)
				FlightList.Remove(flight);
		}

		public Flight Update(Flight f)
		{
			var flight = FlightList.Where(x => x.Identity == f.Identity).SingleOrDefault();
			if (flight != null)
			{
				flight.ID = f.ID;
				flight.ArrivalTime = f.ArrivalTime;
				flight.ArrivalTimeLong = f.ArrivalTimeLong;
				flight.DepartureTime = f.DepartureTime;
				flight.GateID = f.GateID;
				flight.DepartureTimeLong = f.DepartureTimeLong;
			}

			return flight;
		}
	}
}
