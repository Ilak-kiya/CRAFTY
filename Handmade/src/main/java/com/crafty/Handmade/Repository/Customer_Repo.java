package com.crafty.Handmade.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crafty.Handmade.Entity.Customer_Entity;

@Repository
public interface Customer_Repo extends JpaRepository<Customer_Entity, Integer> {

    List<Customer_Entity> findByCustomerNameStartsWith(String customerName);
    List<Customer_Entity> findByCustomerNameEndsWith(String customerName);
    List<Customer_Entity> findByCustomerNameContains(String customerName);
    List<Customer_Entity> findByCustomerNameNotContains(String customerName);
    List<Customer_Entity> findByCustomerNameContaining(String customerName);
    List<Customer_Entity> findByCustomerNameNotContaining(String customerName);
    boolean existsByCustomerNameContaining(String customerName);
	boolean existsByCustomerNameIsContaining(String customerName);
}
