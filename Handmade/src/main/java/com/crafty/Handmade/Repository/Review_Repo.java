package com.crafty.Handmade.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.crafty.Handmade.Entity.Review_Entity;

@Repository
public interface Review_Repo  extends JpaRepository<Review_Entity,Integer> {

}
