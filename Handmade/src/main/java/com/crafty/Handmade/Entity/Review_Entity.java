package com.crafty.Handmade.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import jakarta.persistence.Table;
import lombok.Data;

@Table(name="reviewtables")
@Entity
@Data
public class Review_Entity {


	@Id
	@Column(name="ReviewId")
	private int ReviewId;
	@Column(name="ReviewCont")
	private String ReviewCont;
	@Column(name="totalAmount")
	private String ReviewRatings;
	
	

	
	
	
}