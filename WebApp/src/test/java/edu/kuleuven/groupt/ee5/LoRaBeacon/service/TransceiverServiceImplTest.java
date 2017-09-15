package edu.kuleuven.groupt.ee5.LoRaBeacon.service;

import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.Transceiver;
import junit.framework.TestCase;

public class TransceiverServiceImplTest extends TestCase {
    private TransceiverService service;
    
    
	protected void setUp() throws Exception {
		super.setUp();
		service = new TransceiverServiceImpl();
	}

	protected void tearDown() throws Exception {
		super.tearDown();
	}

	public void testCreateTrasceiver() {
		Transceiver transceiver = new Transceiver();
		transceiver.setX(10.2);
		transceiver.setY(33.2);
		transceiver.setZ(23.54);
		service.createTrasceiver(transceiver);
		
		assertTrue(!service.findAllTransceivers().isEmpty());
	}

	public void testDeleteTransceiver() {
		fail("Not yet implemented");
	}

	public void testEditTransceiver() {
		fail("Not yet implemented");
	}

	public void testFindAllTransceivers() {
		fail("Not yet implemented");
	}

}
