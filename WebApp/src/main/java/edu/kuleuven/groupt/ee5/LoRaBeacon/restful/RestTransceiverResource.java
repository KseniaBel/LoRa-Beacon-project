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

import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.Room;
import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.Transceiver;
import edu.kuleuven.groupt.ee5.LoRaBeacon.service.RoomService;
import edu.kuleuven.groupt.ee5.LoRaBeacon.service.RoomServiceImpl;
import edu.kuleuven.groupt.ee5.LoRaBeacon.service.TransceiverService;
import edu.kuleuven.groupt.ee5.LoRaBeacon.service.TransceiverServiceImpl;

@Path("/transceiver")
public class RestTransceiverResource {
	
	private TransceiverService transceiverService = new TransceiverServiceImpl();
	private RoomService roomService = new RoomServiceImpl();
	
	@GET
	@Path("/list")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Transceiver> listTransceivers(){
		List<Transceiver> allTransceivers = transceiverService.findAllTransceivers();
		return allTransceivers;
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteTransceiver(@PathParam("id") String idStr){
		transceiverService.deleteTransceiver(Integer.parseInt(idStr));	
	}
			
	
	@PUT
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void editTransceiver(Transceiver transceiver){
		transceiverService.editTransceiver(transceiver);
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void createTransceiver(Transceiver transceiver){
		transceiverService.createTrasceiver(transceiver);
	}
}

