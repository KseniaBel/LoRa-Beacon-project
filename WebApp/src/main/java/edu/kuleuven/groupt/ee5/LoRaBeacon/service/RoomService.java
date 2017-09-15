package edu.kuleuven.groupt.ee5.LoRaBeacon.service;

import java.util.List;

import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.Room;

public interface RoomService {
	
	String QUERY_ROOM_FIND_ALL = "findAll";
	
	String QUERY_ROOM_FIND_BY_ID = "findById";

	Room findRoomById(int id);

	List<Room> findAllRooms();

	void storeRoom(Room newRoom);
	
	void deleteRoom(int id);
	
	void editRoom(Room room);
	
	
}
