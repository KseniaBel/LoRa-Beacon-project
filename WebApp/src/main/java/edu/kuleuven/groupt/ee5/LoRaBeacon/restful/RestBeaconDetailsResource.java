package edu.kuleuven.groupt.ee5.LoRaBeacon.restful;

import java.io.Serializable;
import javax.persistence.*;

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

import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.BeaconDetails;
import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.Room;
import edu.kuleuven.groupt.ee5.LoRaBeacon.service.BeaconDetailsService;
import edu.kuleuven.groupt.ee5.LoRaBeacon.service.BeaconDetailsServiceImpl;


@Path("/beaconDetails")
public class RestBeaconDetailsResource {

	private BeaconDetailsService beaconDetailsService = new BeaconDetailsServiceImpl();
	

	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void createBeacon(BeaconDetails newBeacon){
		beaconDetailsService.createBeacon(newBeacon);
	}
}
