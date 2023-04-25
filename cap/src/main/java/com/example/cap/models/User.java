package com.example.cap.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name="password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "location")
    private String location;
    @JsonIgnoreProperties(value = {"event_interested", "event_going", "event_contact"})
    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name = "interested",
            joinColumns = {@JoinColumn(name = "user_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "event_id", nullable = false, updatable = false)}
    )
    private List<Event> user_interested;

    @JsonIgnoreProperties(value = {"event_interested", "event_going", "event_contact"})
    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name = "going",
            joinColumns = {@JoinColumn(name = "user_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "event_id", nullable = false, updatable = false)}
    )
    private List<Event> user_going;

    @JsonIgnoreProperties(value = {"event_interested", "event_going", "event_contact"})
    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name = "contact",
            joinColumns = {@JoinColumn(name = "user_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "event_id", nullable = false, updatable = false)}
    )
    private List<Event> user_contact;

    public User(String name, String password, String location, String email) {
        this.password = password;
        this.email = email;
        this.name = name;
        this.location = location;
        this.user_interested = new ArrayList<Event>();
        this.user_going = new ArrayList<Event>();
        this.user_contact = new ArrayList<Event>();

    }

    public User() {

    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Event> getUser_interested() {
        return user_interested;
    }

    public void setUser_interested(List<Event> user_interested) {
        this.user_interested = user_interested;
    }

    public List<Event> getUser_going() {
        return user_going;
    }

    public void setUser_going(List<Event> user_going) {
        this.user_going = user_going;
    }

    public List<Event> getUser_contact() {
        return user_contact;
    }

    public void setUser_contact(List<Event> user_contact) {
        this.user_contact = user_contact;
    }

    public void addInterested(Event event) {
        if (!getUser_interested().contains(event)) {
            this.user_interested.add(event);
        }
    }

    public void addGoing(Event event) {
        if (!getUser_going().contains(event)) {
            this.user_going.add(event);
        }
    }

    public void addContact(Event event) {
        if (!getUser_contact().contains(event)) {
            this.user_contact.add(event);
        }
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
