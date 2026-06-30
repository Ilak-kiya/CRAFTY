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
import com.crafty.Handmade.Entity.Seller_Entity;
import com.crafty.Handmade.Service.Seller_Service;

@RestController
public class Seller_Controller{
	
	@Autowired
	Seller_Service service;
	
	@GetMapping("/fetchSeller")
	public List<Seller_Entity> fetchSeller()
	{
		return service.fetchSeller();
	}
	
	@PostMapping("/insertSeller")
	public Seller_Entity insertSeller(@RequestBody Seller_Entity data)
	{
		return service.insertSeller(data);
	}
	
	@PutMapping("updateSeller/{SellerId}")
	public Seller_Entity updateexistingSeller(@PathVariable int SellerId, @RequestBody Seller_Entity data)
	{
		return service.updateSellerData(SellerId,data);
		
	}
	@DeleteMapping("/deleterecordbySellerId/{SellerId}")
	public String deleteSellerData(@PathVariable int SellerId)
	{
		return service.deleteSeller(SellerId);
	}
}