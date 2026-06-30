package com.crafty.Handmade.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.crafty.Handmade.Entity.Order_Entity;

@Repository
public interface Order_Repo extends JpaRepository<Order_Entity, Integer> {
    
	 

	
}
