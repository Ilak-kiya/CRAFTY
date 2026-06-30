package com.crafty.Handmade.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.Data;

@Table(name = "customertables")
@Entity
@Data
public class Customer_Entity {

    
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customerId")
    private int customerId;

    @Column(name = "customerName")
    private String customerName;

    @Column(name = "customerEmail")
    private String customerEmail;

    @Column(name = "customerPass")
    private String customerPass;

    
    @OneToMany(mappedBy = "customer")
    @JsonManagedReference
    private List<Order_Entity> orders;
  
    
    
}
