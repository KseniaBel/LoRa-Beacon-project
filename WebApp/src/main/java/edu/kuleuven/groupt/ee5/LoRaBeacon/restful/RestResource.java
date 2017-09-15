package edu.kuleuven.groupt.ee5.LoRaBeacon.restful;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.Room;
import edu.kuleuven.groupt.ee5.LoRaBeacon.service.RoomService;
import edu.kuleuven.groupt.ee5.LoRaBeacon.service.RoomServiceImpl;

@Path("/room")
public class RestResource {

	private RoomService roomService = new RoomServiceImpl();
	
	@GET
	@Path("/list")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Room> listRooms() {
		List<Room> allRooms = roomService.findAllRooms();
		return allRooms;
	}
	
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/{id}")
	public Room getRoomDetails(@PathParam("id") String idStr) {
		try {
			int id = Integer.parseInt(idStr);
			Room foundRoom = roomService.findRoomById(id);
			return foundRoom;
		} catch (NumberFormatException nfe) {
		}
		return null;
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/")
	public void createRoom(Room newRoom) {
		roomService.storeRoom(newRoom);
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteRoom(@PathParam("id") String idStr) {
		roomService.deleteRoom(Integer.parseInt(idStr));
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/")
	public void editRoom(Room newRoom) {
		roomService.editRoom(newRoom);
	}
}
