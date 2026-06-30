package com.crafty.Handmade.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.crafty.Handmade.Entity.Shipment_Entity;

@Repository
public interface Shipment_Repo  extends JpaRepository<Shipment_Entity,Integer> {

}