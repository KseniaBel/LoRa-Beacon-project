package edu.kuleuven.groupt.ee5.LoRaBeacon.service;

import java.util.List;

import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.Beacon;


public interface BeaconService {
    String QUERY_BEACON_FIND_BY_ID = "findBeaconById";
	
	void createBeacon(Beacon beacon);
	
	void editBeacon(Beacon beacon);

	List<Beacon> findBeaconHistory(String beaconId);
}
