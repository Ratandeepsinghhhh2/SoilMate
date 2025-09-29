
package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "farmer")
public class Farmer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int farmerID;

    private String name;
    private String location;
    private String crops;
    private String phone;
    private String email;

    // Getters & Setters
    public int getFarmerID() {
        return farmerID;
    }

    public void setFarmerID(int farmerID) {
        this.farmerID = farmerID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCrops() {
        return crops;
    }

    public void setCrops(String crops) {
        this.crops = crops;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
