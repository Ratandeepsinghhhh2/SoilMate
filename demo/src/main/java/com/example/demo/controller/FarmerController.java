package com.example.demo.controller;

import com.example.demo.model.Farmer;
import com.example.demo.repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farmers")
@CrossOrigin(origins = "http://localhost:5173") // allow React frontend
public class FarmerController {

    @Autowired
    private FarmerRepository farmerRepository;

    // Get all farmers
    @GetMapping
    public List<Farmer> getFarmers() {
        return farmerRepository.findAll();
    }

    // Add farmer
    @PostMapping
    public Farmer addFarmer(@RequestBody Farmer farmer) {
        return farmerRepository.save(farmer);
    }

    // Update farmer
    @PutMapping("/{id}")
    public Farmer updateFarmer(@PathVariable int id, @RequestBody Farmer farmer) {
        Farmer existing = farmerRepository.findById(id).orElseThrow();
        existing.setName(farmer.getName());
        existing.setLocation(farmer.getLocation());
        existing.setCrops(farmer.getCrops());
        existing.setPhone(farmer.getPhone());
        existing.setEmail(farmer.getEmail());
        return farmerRepository.save(existing);
    }

    // Delete farmer
    @DeleteMapping("/{id}")
    public void deleteFarmer(@PathVariable int id) {
        farmerRepository.deleteById(id);
    }
}
