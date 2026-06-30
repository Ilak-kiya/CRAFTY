package com.crafty.Handmade.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Table(name="categorytables")
@Entity
@Data
public class Category_Entity {

	@Id
	@Column(name="CategoryId")
	private int CategoryId;
	@Column(name="categoryName")
	private String categoryName;
	
	
}



