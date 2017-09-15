package edu.kuleuven.groupt.ee5.LoRaBeacon.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the beacons_list database table.
 * 
 */
@Entity
@Table(name="beacon_details")
@NamedQuery(name="BeaconDetails.findAll", query="SELECT b FROM BeaconDetails b")
public class BeaconDetails implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="beacon_nr")
	private int beaconNr;

	private String calibration;

	private String idBeacon;

	@Column(name="room_id")
	private int roomId;

	public BeaconDetails() {
	}

	public int getBeaconNr() {
		return this.beaconNr;
	}

	public void setBeaconNr(int beaconNr) {
		this.beaconNr = beaconNr;
	}

	public String getCalibration() {
		return this.calibration;
	}

	public void setCalibration(String calibration) {
		this.calibration = calibration;
	}

	public String getIdBeacon() {
		return this.idBeacon;
	}

	public void setIdBeacon(String idBeacon) {
		this.idBeacon = idBeacon;
	}

	public int getRoomId() {
		return this.roomId;
	}

	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}

}