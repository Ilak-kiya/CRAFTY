package com.crafty.Handmade.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crafty.Handmade.Entity.Category_Entity;

@Repository
public interface Category_Repo extends JpaRepository<Category_Entity,Integer>{

}
