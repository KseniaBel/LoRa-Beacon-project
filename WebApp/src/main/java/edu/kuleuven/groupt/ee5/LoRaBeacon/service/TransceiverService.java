package edu.kuleuven.groupt.ee5.LoRaBeacon.service;

import java.util.List;

import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.Transceiver;

public interface TransceiverService {
	
	String QUERY_TRANSCEIVER_FIND_BY_ID = "findTransceiverById";
	
	String QUERY_TRANSCEIVER_FIND_ALL = "findAllTransceivers";

	void createTrasceiver(Transceiver transceiver);
	
	void deleteTransceiver(int id);
	
	void editTransceiver(Transceiver transceiver);
	
	List<Transceiver> findAllTransceivers();
	
}
