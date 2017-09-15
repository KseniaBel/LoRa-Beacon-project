package edu.kuleuven.groupt.ee5.LoRaBeacon.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.kuleuven.groupt.ee5.LoRaBeacon.service.BeaconService;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;


/**
 * The persistent class for the beacon database table.
 * 
 */
@NamedNativeQueries ({
	@NamedNativeQuery(name=BeaconService.QUERY_BEACON_FIND_BY_ID, query="SELECT * FROM beacon b WHERE b.idBeacon = :beaconId", resultClass=Beacon.class)
})
@Entity
@Table(name="latest_beacons_locations")
public class Beacon implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="time_date")
	private Date timeDate;

	private String idBeacon;
	
	private double x;

	private double y;

	private double z;

	//bi-directional many-to-one association to Room
	@ManyToOne
	@JsonIgnore
	private Room room;
	
	public Beacon() {
	}

	public long getMeasurementId() {
		return this.id;
	}

	public void setMeasurementId(int id) {
		this.id = id;
	}

	public String getIdBeacon() {
		return this.idBeacon;
	}

	public void setIdBeacon(String idBeacon) {
		this.idBeacon = idBeacon;
	}

	public Date getTimeDate() {
		return this.timeDate;
	}

	public void setTimeDate(Date timeDate) {
		this.timeDate = timeDate;
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