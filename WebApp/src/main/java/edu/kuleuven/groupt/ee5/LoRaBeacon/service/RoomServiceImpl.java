package edu.kuleuven.groupt.ee5.LoRaBeacon.service;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.Room;
import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.util.SessionUtil;

public class RoomServiceImpl implements RoomService{

	public Room findRoomById(int id) {
		Session session = SessionUtil.getSession();
		List<Room> allFoundRooms = session.getNamedQuery(QUERY_ROOM_FIND_BY_ID)
				.setParameter("roomId", id)
				.list();
		if (allFoundRooms.size() > 0 ){
			return allFoundRooms.get(0);
		}
		return null;
	}

	public List<Room> findAllRooms() {
		Session session = SessionUtil.getSession();
		List<Room> allRooms = session.getNamedQuery(QUERY_ROOM_FIND_ALL).list();
		return allRooms;
	}

	public void storeRoom(Room newRoom) {
		Session session = SessionUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.save(newRoom);
		tx.commit();
	}
	
	public void deleteRoom(int id) {
		Session session = SessionUtil.getSession();
		Transaction tx = session.beginTransaction();
		Room room;
		List<Room> allFoundRooms = session.getNamedQuery(QUERY_ROOM_FIND_BY_ID)
				.setParameter("roomId", id)
				.list();
		if (allFoundRooms.size() > 0 ){
			room = allFoundRooms.get(0);
			session.delete(room);
			tx.commit();
		}
		
	}
	
	public void editRoom(Room newroom) {
		Session session = SessionUtil.getSession();
		Transaction tx = session.beginTransaction();
			session.update(newroom);
			tx.commit();
		
	}
}
