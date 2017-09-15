package edu.kuleuven.groupt.ee5.LoRaBeacon.service;

import org.hibernate.Session;
import org.hibernate.Transaction;

import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.BeaconDetails;
import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.util.SessionUtil;

public class BeaconDetailsServiceImpl implements BeaconDetailsService {
	
	public void createBeacon(BeaconDetails newBeacon){
		
		Session session = SessionUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.save(newBeacon);
		tx.commit();
	}
}
