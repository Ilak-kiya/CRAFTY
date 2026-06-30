package com.crafty.Handmade.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.crafty.Handmade.Entity.Product_Entity;

@Repository
public interface Product_Repo  extends JpaRepository<Product_Entity,Integer> {

}
