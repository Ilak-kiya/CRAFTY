package com.crafty.Handmade.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Table(name="producttables")
@Entity
@Data
public class Product_Entity {


	@Id
	@Column(name="ProductId")
	private int ProductId;
	@Column(name="ProductName")
	private String ProductName;
	@Column(name="ProductPrice")
	private int ProductPrice;
	@Column(name="ProductDescription")
	private String ProductDescription;
	
	
//	 @ManyToOne
//	    @JoinColumn(name="selling", nullable=false)
//	    @JsonBackReference
//	    private Seller_Entity seller;

	
}