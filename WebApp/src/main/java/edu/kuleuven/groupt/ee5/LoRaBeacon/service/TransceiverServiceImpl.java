package edu.kuleuven.groupt.ee5.LoRaBeacon.service;

import java.util.List;
import java.util.UUID;

import org.hibernate.Session;
import org.hibernate.Transaction;

import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.Room;
import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.Transceiver;
import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.util.SessionUtil;

public class TransceiverServiceImpl implements TransceiverService {

	public void createTrasceiver(Transceiver transceiver) {
		Session session = SessionUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.save(transceiver);
		tx.commit();
		
	}

	public void deleteTransceiver(int id) {
		Session session = SessionUtil.getSession();
		Transaction tx = session.beginTransaction();
		Transceiver transceiver;
		List<Transceiver> allFoundTransceivers = session.getNamedQuery(QUERY_TRANSCEIVER_FIND_BY_ID)
				.setParameter("transceiverId", id)
				.list();
		if (allFoundTransceivers.size() > 0 ){
			transceiver = allFoundTransceivers.get(0);
			session.delete(transceiver);
			tx.commit();
		}
	}

	public void editTransceiver(Transceiver transceiver) {
		Session session = SessionUtil.getSession();
		Transaction tx = session.beginTransaction();
			session.update(transceiver);
			tx.commit();
	}

	public List<Transceiver> findAllTransceivers() {
		Session session = SessionUtil.getSession();
		List<Transceiver> allTransceivers = session.getNamedQuery(QUERY_TRANSCEIVER_FIND_ALL)
				.list();
		return allTransceivers;
	}
}
