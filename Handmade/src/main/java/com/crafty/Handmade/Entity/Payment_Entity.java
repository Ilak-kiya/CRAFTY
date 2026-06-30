package com.crafty.Handmade.Entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Table(name="paymenttables")
@Entity
@Data
public class Payment_Entity {


	@Id
	@Column(name="PaymentId")
	private int PaymentId;
	
	@Column(name="PaymentDate")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate PaymentDate;
	
	
	@Column(name="totalAmount")
	private int totalAmount;
	
	 @OneToOne
	 @JoinColumn(name="OrderId")
	 private Order_Entity order;
	
	
}
