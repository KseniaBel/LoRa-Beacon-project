package edu.kuleuven.groupt.ee5.LoRaBeacon.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.jackson.CustomRoomDeserializer;
import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.jackson.CustomRoomSerializer;
import edu.kuleuven.groupt.ee5.LoRaBeacon.service.TransceiverService;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;


/**
 * The persistent class for the transceiver database table.
 * 
 */
@Entity
@Table(name="transceiver")
@NamedQueries({
	@NamedQuery(name=TransceiverService.QUERY_TRANSCEIVER_FIND_ALL, query="SELECT t FROM Transceiver t"),
	@NamedQuery(name=TransceiverService.QUERY_TRANSCEIVER_FIND_BY_ID, query="SELECT t FROM Transceiver t WHERE t.id = :transceiverId")
})
public class Transceiver implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	//@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;

	private double x;

	private double y;

	private double z;


	//bi-directional many-to-one association to Room
	@JsonSerialize(using= CustomRoomSerializer.class)
	@JsonDeserialize (using= CustomRoomDeserializer.class)
	@JsonProperty("roomId")
	@ManyToOne
	private Room room;

	public Transceiver() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getX() {
		return this.x;
	}

	public void setX(double x) {
		this.x = x;
	}

	public double getY() {
		return this.y;
	}

	public void setY(double y) {
		this.y = y;
	}

	public double getZ() {
		return this.z;
	}

	public void setZ(double z) {
		this.z = z;
	}

	public Room getRoom() {
		return this.room;
	}

	public void setRoom(Room room) {
		this.room = room;
	}

}