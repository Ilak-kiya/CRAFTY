package com.crafty.Handmade.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.crafty.Handmade.Entity.Shipment_Entity;
import com.crafty.Handmade.Service.Shipment_Service;

@RestController
public class Shipment_Controller{
	
	@Autowired
	Shipment_Service service;
	
	@GetMapping("/fetchShipment")
	public List<Shipment_Entity> fetchShipment()
	{
		return service.fetchShipment();
	}
	
	@PostMapping("/insertShipment")
	public Shipment_Entity insertShipment(@RequestBody Shipment_Entity data)
	{
		return service.insertShipment(data);
	}
	
	@PutMapping("updateShipment/{ShipmentId}")
	public Shipment_Entity updateexistingShipment(@PathVariable int ShipmentId, @RequestBody Shipment_Entity data)
	{
		return service.updateShipmentData(ShipmentId,data);
		
	}
	@DeleteMapping("/deleterecordbyShipmentId/{ShipmentId}")
	public String deleteShipmentData(@PathVariable int ShipmentId)
	{
		return service.deleteShipment(ShipmentId);
	}
}