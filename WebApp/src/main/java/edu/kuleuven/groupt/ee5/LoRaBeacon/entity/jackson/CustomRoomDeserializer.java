package edu.kuleuven.groupt.ee5.LoRaBeacon.entity.jackson;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import edu.kuleuven.groupt.ee5.LoRaBeacon.entity.Room;

public class CustomRoomDeserializer extends JsonDeserializer<Room> {
	
	
	@Override
	public Room deserialize(JsonParser parser, DeserializationContext ctx) throws IOException, JsonProcessingException {
		ObjectCodec oc = parser.getCodec();
        JsonNode node = oc.readTree(parser);
        Room roomReference = new Room();
        roomReference.setId(Integer.parseInt(node.asText()));
        return roomReference;
	}

}
