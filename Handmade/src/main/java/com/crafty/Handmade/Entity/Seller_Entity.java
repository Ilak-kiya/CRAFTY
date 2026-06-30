package com.crafty.Handmade.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Table(name="sellertables")
@Entity
@Data
public class Seller_Entity {


	@Id
	@Column(name="SellerId")
	private int SellerId;
	@Column(name="SellerName")
	private String SellerName;
	@Column(name="SellerEmail")
	private String SellerEmail;
	@Column(name="SellerPass")
	private String SellerPass;
	
//	 
//    @OneToMany(mappedBy = "seller")
//    @JsonManagedReference
//    private List<Product_Entity> product;
//  
	
	
}