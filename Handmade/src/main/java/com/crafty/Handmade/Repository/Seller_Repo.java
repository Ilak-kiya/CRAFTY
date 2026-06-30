package com.crafty.Handmade.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crafty.Handmade.Entity.Seller_Entity;

@Repository
public interface Seller_Repo  extends JpaRepository<Seller_Entity,Integer> {

}