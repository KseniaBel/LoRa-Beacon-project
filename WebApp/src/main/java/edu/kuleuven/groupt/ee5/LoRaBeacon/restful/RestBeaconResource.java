package edu.kuleuven.groupt.ee5.LoRaBeacon.restful;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.Beacon;
import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.Room;
import edu.kuleuven.groupt.ee5.LoRaBeacon.service.BeaconService;
import edu.kuleuven.groupt.ee5.LoRaBeacon.service.BeaconServiceImpl;


@Path("/beacon")
public class RestBeaconResource {

	private BeaconService beaconService = new BeaconServiceImpl();
	

	@GET
	@Path("/history/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Beacon> listFullBeaconHistory(@PathParam("id") String beaconId){
		List<Beacon> fullBeaconHistory = beaconService.findBeaconHistory(beaconId);
		return fullBeaconHistory;
	}
	
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void createBeacon(Beacon beacon){
		beaconService.createBeacon(beacon);
	}
}
