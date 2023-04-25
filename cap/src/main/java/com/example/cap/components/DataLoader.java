package com.example.cap.components;

import com.example.cap.models.Event;
import com.example.cap.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import com.example.cap.repositories.EventRepository;
import com.example.cap.repositories.UserRepository;

//@Profile("!test")
@Component
public class DataLoader implements ApplicationRunner {
    @Autowired
    UserRepository userRepository;
    @Autowired
    EventRepository eventRepository;

    public DataLoader() {

    }


    @Override
    public void run(ApplicationArguments args) {
        User user1 = new User("Jamie", "1234", "Glasgow", "jamie@gmail.com");
        userRepository.save(user1);
        User user2 = new User("Mathias", "1234", "Glasgow", "mathias@gmail.com");
        userRepository.save(user2);
        User user3 = new User("Connor", "1234", "Glasgow", "connor@gmail.com");
        userRepository.save(user3);
        User user4 = new User("Lewis", "1234", "Glasgow", "lewis@gmail.com");
        userRepository.save(user4);


        Event event1 = new Event("G5dbZ9NrcHxqe", "Beyonce", "20-10-18", "late");
        eventRepository.save(event1);
        Event event2 = new Event("1AdbZ4zGkSbNEQC", "who knows", "maybe never", "early");
        eventRepository.save(event2);
//        Event event3 = new Event("ghi");
//        eventRepository.save(event3);
//        Event event4 = new Event("jkl");
//        eventRepository.save(event4);
//
//
        event1.addGoing(user2);
//        event1.addGoing(user1);
        event1.addInterested(user1);
        event1.addContact(user2);
        eventRepository.save(event1);
//
//        user2.addContact(event2);
//        user2.addInterested(event2);
//
//
//        user2.addGoing(event2);
//        userRepository.save(user2);
//

    }
}
