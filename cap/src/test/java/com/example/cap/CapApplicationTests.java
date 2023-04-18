package com.example.cap;

import com.example.cap.repositories.EventRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.example.cap.repositories.UserRepository;

import static org.junit.Assert.assertEquals;

@SpringBootTest
class CapApplicationTests {

	@Autowired
	UserRepository userRepository;
	@Autowired
	EventRepository eventRepository;


	@Test
	void contextLoads() {
	}

}
