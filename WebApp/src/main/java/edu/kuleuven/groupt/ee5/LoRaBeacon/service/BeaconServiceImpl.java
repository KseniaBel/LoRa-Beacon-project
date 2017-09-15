package edu.kuleuven.groupt.ee5.LoRaBeacon.service;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.Beacon;
import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.util.SessionUtil;

public class BeaconServiceImpl implements BeaconService {

	public void createBeacon(Beacon beacon) {
		Session session = SessionUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.save(beacon);
		tx.commit();
	}


	public void editBeacon(Beacon beacon) {
		Session session = SessionUtil.getSession();
		Transaction tx = session.beginTransaction();
			session.update(beacon);
			tx.commit();
	}
	
	public List<Beacon> findBeaconHistory(String beaconId) {
		Session session = SessionUtil.getSession();
		List<Beacon> beaconHistory = session.getNamedQuery(QUERY_BEACON_FIND_BY_ID)
				.setParameter("beaconId", beaconId)
				.list();
			if (beaconHistory.size() > 0 ){
				return beaconHistory;
			}
		return null;
	}
}
