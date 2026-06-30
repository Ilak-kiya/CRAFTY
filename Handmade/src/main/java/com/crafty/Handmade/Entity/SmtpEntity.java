package com.crafty.Handmade.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="Smtp")
@Data
public class SmtpEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Id")
    private int id;
    
    @Column(name="Receiver")
    private String receiver;
    
    @Column(name="Subject")
    private String subject;
    
    @Column(name="Content")
    private String content;
}
