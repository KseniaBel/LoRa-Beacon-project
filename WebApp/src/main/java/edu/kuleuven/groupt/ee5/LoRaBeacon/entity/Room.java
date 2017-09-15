package edu.kuleuven.groupt.ee5.LoRaBeacon.entity;

import java.io.Serializable;

import edu.kuleuven.groupt.ee5.LoRaBeacon.service.RoomService;

import java.math.BigDecimal;
import java.util.Set;

import javax.persistence.*;

/**
 * The persistent class for the room database table.
 * 
 */
@NamedQueries({
	@NamedQuery(name=RoomService.QUERY_ROOM_FIND_ALL, query="SELECT r FROM Room r"),
	@NamedQuery(name=RoomService.QUERY_ROOM_FIND_BY_ID, query="SELECT r FROM Room r WHERE r.id = :roomId")
})
@Entity
@Table(name="room")
public class Room implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private BigDecimal height;

	private BigDecimal length;

	private String name;

	private BigDecimal width;

	//bi-directional many-to-one association to Beacon
	@OneToMany(mappedBy="room")
	private Set<Beacon> beacons;

	//bi-directional many-to-one association to Transceiver
	@OneToMany(mappedBy="room")
	private Set<Transceiver> transceivers;

	public Room() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public BigDecimal getHeight() {
		return this.height;
	}

	public void setHeight(BigDecimal height) {
		this.height = height;
	}

	public BigDecimal getLength() {
		return this.length;
	}

	public void setLength(BigDecimal length) {
		this.length = length;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BigDecimal getWidth() {
		return this.width;
	}

	public void setWidth(BigDecimal width) {
		this.width = width;
	}

	public Set<Beacon> getBeacons() {
		return this.beacons;
	}

	public void setBeacons(Set<Beacon> beacons) {
		this.beacons = beacons;
	}

	public Beacon addBeacon(Beacon beacon) {
		getBeacons().add(beacon);
		beacon.setRoom(this);

		return beacon;
	}

	public Beacon removeBeacon(Beacon beacon) {
		getBeacons().remove(beacon);
		beacon.setRoom(null);

		return beacon;
	}

	public Set<Transceiver> getTransceivers() {
		return this.transceivers;
	}

	public void setTransceivers(Set<Transceiver> transceivers) {
		this.transceivers = transceivers;
	}

	public Transceiver addTransceiver(Transceiver transceiver) {
		getTransceivers().add(transceiver);
		transceiver.setRoom(this);

		return transceiver;
	}

	public Transceiver removeTransceiver(Transceiver transceiver) {
		getTransceivers().remove(transceiver);
		transceiver.setRoom(null);

		return transceiver;
	}

}