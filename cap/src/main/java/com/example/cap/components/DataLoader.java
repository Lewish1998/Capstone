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
        User user1 = new User("Jamie", "Edinburgh", "jamie@gmail.com");
        userRepository.save(user1);
        User user2 = new User("Mathias", "Glasgow", "mathias@gmail.com");
        userRepository.save(user2);
        User user3 = new User("Connor", "Glasgow", "connor@gmail.com");
        userRepository.save(user3);
        User user4 = new User("Lewis", "Glasgow", "lewis@gmail.com");
        userRepository.save(user4);


        Event event1 = new Event("G5dbZ9NrcHxqe");
        eventRepository.save(event1);
        Event event2 = new Event("1AdbZ4zGkSbNEQC");
        eventRepository.save(event2);
//        Event event3 = new Event("ghi");
//        eventRepository.save(event3);
//        Event event4 = new Event("jkl");
//        eventRepository.save(event4);
//
//
//        event1.addGoing(user1);
//        event1.addGoing(user1);
//        event1.addInterested(user1);
//        event1.addContact(user1);
//        eventRepository.save(event1);
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
