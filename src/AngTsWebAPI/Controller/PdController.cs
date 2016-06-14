using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

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
			return new JsonResult(new {flights= FlightRepo.GetAll() });
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

			flight.Identity = FlightRepo.GetNewIdentity();
			FlightRepo.Add(flight);
			return new JsonResult(flight);
			//return CreatedAtRoute("Get",new { Controller="PdService", id=flight.ID}, flight);
		}

		[HttpPut("{id}")]
		public IActionResult Put(int id, [FromBody]Model.Flight flight)	
		{	
			if (flight == null)
				return new BadRequestResult();

			var data = FlightRepo.Find(id);	
			if (data != null)
			{
				//flight.DepartureTime = flight.DepartureTimeLong;
				flight = FlightRepo.Update(flight);
				return new JsonResult(flight);
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
