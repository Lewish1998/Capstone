package com.example.cap.controllers;

import com.example.cap.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.cap.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping(value = "/users")
    public ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }
    @GetMapping(value = "/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping(value = "/users")
    public ResponseEntity<User> saveUser(@RequestBody User user){
        userRepository.save(user);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }
    @PatchMapping(value = "/users/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User user){
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @DeleteMapping(value = "/users/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}

