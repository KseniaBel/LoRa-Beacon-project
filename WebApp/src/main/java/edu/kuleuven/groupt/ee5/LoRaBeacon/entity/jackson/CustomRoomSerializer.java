package edu.kuleuven.groupt.ee5.LoRaBeacon.entity.jackson;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.Room;

public class CustomRoomSerializer extends JsonSerializer<Room> {

	@Override
	public void serialize(Room room, JsonGenerator gen, SerializerProvider provider)
			throws IOException, JsonProcessingException {
		gen.writeString(String.valueOf(room.getId()));
	}

}
