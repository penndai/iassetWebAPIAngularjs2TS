using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngTsWebAPI.Model;

namespace AngTsWebAPI.Repository
{
    public interface IFlightRepository
    {
		void Add(Flight flight);
		List<Flight> FindByGate(int gateid);
		IEnumerable<Flight> GetTodayAll();
		Flight Find(int id);
		void Remove(int id);
		Flight Update(Flight f);
		int GetNewIdentity();

		bool Validate(Flight flight, out string errorMsg);

	}
}
