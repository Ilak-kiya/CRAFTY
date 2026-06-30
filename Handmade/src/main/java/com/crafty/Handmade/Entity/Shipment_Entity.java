package com.crafty.Handmade.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Table(name="shipmenttables")
@Entity
@Data
public class Shipment_Entity {


	@Id
	@Column(name="ShipmentId")
	private int ShipmentId;
	@Column(name="customerId")
	private int customerId;
	@Column(name="sellerId")
	private int sellerId;
	@Column(name="trackingId")
	private int trackingId;
	
	
}