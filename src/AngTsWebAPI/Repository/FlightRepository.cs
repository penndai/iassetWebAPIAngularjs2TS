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
				FlightList.Add(new Flight() { Identity = 1, ID = "F1", GateID = 1, ArrivalTime = string.Format("{0:g}", DateTime.Now), ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now), DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(0.5)), DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(0.5)) });
				FlightList.Add(new Flight() { Identity = 2, ID = "F2", GateID = 2, ArrivalTime = string.Format("{0:g}", DateTime.Now.AddHours(1)), ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(1)), DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(1.5)), DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(1.5)) });
				FlightList.Add(new Flight() { Identity = 3, ID = "F1", GateID = 1, ArrivalTime = string.Format("{0:g}", DateTime.Now.AddMinutes(10)), ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddMinutes(10)), DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(0.5)), DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(0.5)) });
				FlightList.Add(new Flight() { Identity = 4, ID = "F2", GateID = 2, ArrivalTime = string.Format("{0:g}", DateTime.Now.AddMinutes(15)), ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddMinutes(10)), DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(1.5)), DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(1.5)) });
				FlightList.Add(new Flight() { Identity = 5, ID = "F1", GateID = 1, ArrivalTime = string.Format("{0:g}", DateTime.Now.AddMinutes(20)), ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddMinutes(20)), DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(0.5)), DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(0.5)) });
				FlightList.Add(new Flight() { Identity = 6, ID = "F2", GateID = 2, ArrivalTime = string.Format("{0:g}", DateTime.Now.AddMinutes(25)), ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddMinutes(25)), DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(1.5)), DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(1.5)) });
				FlightList.Add(new Flight() { Identity = 7, ID = "F1", GateID = 1, ArrivalTime = string.Format("{0:g}", DateTime.Now.AddMinutes(30)), ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddMinutes(30)), DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(0.5)), DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(0.5)) });
				FlightList.Add(new Flight() { Identity = 8, ID = "F2", GateID = 2, ArrivalTime = string.Format("{0:g}", DateTime.Now.AddMinutes(35)), ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddMinutes(35)), DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(1.5)), DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(1.5)) });
				FlightList.Add(new Flight() { Identity = 9, ID = "F1", GateID = 1, ArrivalTime = string.Format("{0:g}", DateTime.Now.AddMinutes(40)), ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddMinutes(40)), DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(1)), DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(1)) });
				FlightList.Add(new Flight() { Identity = 10, ID = "F2", GateID = 2, ArrivalTime = string.Format("{0:g}", DateTime.Now.AddMinutes(45)), ArrivalTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddMinutes(45)), DepartureTimeLong = string.Format("{0:yyyy-MM-ddThh:mm}", DateTime.Now.AddHours(1.5)), DepartureTime = string.Format("{0:g}", DateTime.Now.AddHours(1.5)) });
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

		public List<Flight> FindByGate(int gateid)
		{
			List<Flight> rtn = new List<Flight>();

			if (gateid > 0)
				rtn = FlightList.Where(x=>DateTime.Parse(x.ArrivalTime) >= DateTime.Now).Where(x => x.GateID == gateid).ToList();
			else
				rtn = FlightList.ToList();

			return rtn;
		}

		public IEnumerable<Flight> GetAll()
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
