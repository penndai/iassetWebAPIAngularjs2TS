using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using System.Globalization;

namespace AngTsWebAPI.Controller
{
	[Route("api/[controller]")]
    public class PdServiceController:Microsoft.AspNet.Mvc.Controller
    {
		public AngTsWebAPI.Repository.IFlightRepository FlightRepo { get; set; }

		public PdServiceController(Repository.IFlightRepository _repo)
		{
			FlightRepo = _repo;
		}
		//Get api/PdService
		[HttpGet]
		public IActionResult Get()
		{
			return new JsonResult(new {flights= FlightRepo.GetTodayAll() });
		}

		[HttpGet("{id}")]
		public IActionResult Get(int id)
		{
			List<Model.Flight> item = FlightRepo.FindByGate(id);
			if (item != null)
			{
				return new JsonResult(new { flights=item });
			}

			return new HttpNotFoundResult();
		}

		[HttpPost]
		public IActionResult Create([FromBody]Model.Flight flight) {
			if (flight == null)
			{
				return new BadRequestResult();
			}
			string errorMsg = string.Empty;

			//DateTime arrivalTime = DateTime.ParseExact(flight.ArrivalTime, "ddd MMM dd yyyy HH:mm:ss 'GMT'K", CultureInfo.InvariantCulture);
			DateTime arrivalTime = DateTime.Parse(flight.ArrivalTime);
			flight.ArrivalTime = string.Format("{0:g}", arrivalTime);

			var valid = FlightRepo.Validate(flight, out errorMsg);

			if (valid)
			{
				flight.Identity = FlightRepo.GetNewIdentity();
				FlightRepo.Add(flight);
				return new JsonResult(new { data = new { code = 0, msg = "success", flight = flight } });
			}
			else
				return new JsonResult(new { data = new { code = 1, msg = string.Format("Arrival Time overlap with {0}", errorMsg), flight = flight } });
			//return CreatedAtRoute("Get",new { Controller="PdService", id=flight.ID}, flight);
		}

		[HttpPut("{id}")]
		public IActionResult Put(int id, [FromBody]Model.Flight flight)	
		{	
			if (flight == null)
				return new BadRequestResult();
			string errorMsg = string.Empty;

			DateTime arrivalTime = DateTime.ParseExact(flight.ArrivalTime, "ddd MMM dd yyyy HH:mm:ss 'GMT'K", CultureInfo.InvariantCulture);
			flight.ArrivalTime = string.Format("{0:yyyy-MM-ddThh:mm}", arrivalTime);

			var data = FlightRepo.Find(id);	
			if (data != null)
			{
				var valid = FlightRepo.Validate(flight, out errorMsg);
				if (valid)
				{
					flight = FlightRepo.Update(flight);
					return new JsonResult(new { data = new { code = 0, msg = "success", flight = flight } });
				}
				else
				{
					return new JsonResult(new { data = new { code = 1, msg = string.Format("Arrival Time overlap {0}", errorMsg), flight = flight } });
				}				
			}
			else
				return new HttpNotFoundResult();
		}

		[HttpDelete("{id}")]
		public void Delete(int id)
		{
			FlightRepo.Remove(id);
		}
    }
}
