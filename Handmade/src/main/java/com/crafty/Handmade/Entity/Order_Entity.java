package com.crafty.Handmade.Entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

@Table(name = "ordertables")
@Entity
@Data
public class Order_Entity {

    @Id
    @Column(name = "OrderId")
    private int OrderId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate orderDate;
    @Column(name = "totalAmount", nullable = false)
    private int totalAmount;

    @ManyToOne
    @JoinColumn(name="Ordering", nullable=false)
    @JsonBackReference
    private Customer_Entity customer;
    
    
    

}
