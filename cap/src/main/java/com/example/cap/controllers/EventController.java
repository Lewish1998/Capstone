package com.example.cap.controllers;

import com.example.cap.models.Event;
import com.example.cap.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.cap.repositories.EventRepository;

import java.util.List;
import java.util.Optional;
@RestController
public class EventController {

    @Autowired
    EventRepository eventRepository;

    @GetMapping(value = "/events")
    public ResponseEntity<List<Event>> getAllEvents(){
        return new ResponseEntity<>(eventRepository.findAll(), HttpStatus.OK);
    }
    @GetMapping(value = "/events/{id}")
    public ResponseEntity<Event> getEvent(@PathVariable Long id){
        Optional<Event> event = eventRepository.findById(id);
        if(event.isPresent()){
            return new ResponseEntity<>(event.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping(value = "/events")
    public ResponseEntity<Event> saveEvent(@RequestBody Event event){
        eventRepository.save(event);
        return new ResponseEntity<>(event,HttpStatus.OK);
    }
    @PatchMapping(value = "/events/{id}")
    public ResponseEntity<Event> updateEvent(@RequestBody Event event){
        eventRepository.save(event);
        return new ResponseEntity<>(event, HttpStatus.OK);
    }
    @DeleteMapping(value = "/events/{id}")
    public ResponseEntity<Event> deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
    }
