package com.example.cap.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "events")
public class Event implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_api_id")
    private String event_id;
    @Column(name = "event_name")
    private String event_name;

    @Column(name = "event_date")
    private String event_date;
    @Column(name = "event_time")
    private String event_time;

    @JsonIgnoreProperties(value = {"user_interested", "user_going", "user_contact"})
    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name = "interested",
            joinColumns = {@JoinColumn(name = "event_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "user_id", nullable = false, updatable = false)}
    )
    private List<User> event_interested;

    @JsonIgnoreProperties(value = {"user_interested", "user_going", "user_contact"})
    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name = "going",
            joinColumns = {@JoinColumn(name = "event_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "user_id", nullable = false, updatable = false)}
    )
    private List<User> event_going;
    @JsonIgnoreProperties(value = {"user_interested", "user_going", "user_contact"})
    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name = "contact",
            joinColumns = {@JoinColumn(name = "event_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "user_id", nullable = false, updatable = false)}
    )
    private List<User> event_contact;


    public Event(String eventId, String eventName, String eventDate, String eventTime) {
        this.event_id = eventId;
        event_name = eventName;
        event_date = eventDate;
        event_time = eventTime;
        this.event_interested = new ArrayList<User>();
        this.event_going = new ArrayList<User>();
        this.event_contact = new ArrayList<User>();
    }

    public Event() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEvent_id() {
        return event_id;
    }

    public void setEvent_id(String event_id) {
        this.event_id = event_id;
    }

    public List<User> getEvent_interested() {
        return event_interested;
    }

    public void setEvent_interested(List<User> event_interested) {
        this.event_interested = event_interested;
    }

    public List<User> getEvent_going() {
        return event_going;
    }

    public void setEvent_going(List<User> event_going) {
        this.event_going = event_going;
    }

    public List<User> getEvent_contact() {
        return event_contact;
    }

    public void setEvent_contact(List<User> event_contact) {
        this.event_contact = event_contact;
    }


    public void addInterested(User user) {
        if (!getEvent_interested().contains(user)) {
            this.getEvent_interested().add(user);
        }
    }

    public void addGoing(User user) {
        if (!getEvent_going().contains(user)) {
            this.getEvent_going().add(user);
        }
    }

    public void addContact(User user) {
        if (!getEvent_contact().contains(user)) {
            this.getEvent_contact().add(user);
        }
    }

    public String getEvent_name() {
        return event_name;
    }

    public void setEvent_name(String event_name) {
        this.event_name = event_name;
    }

    public String getEvent_date() {
        return event_date;
    }

    public void setEvent_date(String event_date) {
        this.event_date = event_date;
    }

    public String getEvent_time() {
        return event_time;
    }

    public void setEvent_time(String event_time) {
        this.event_time = event_time;
    }
}
