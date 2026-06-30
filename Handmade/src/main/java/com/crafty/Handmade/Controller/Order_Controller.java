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


import com.crafty.Handmade.Entity.Order_Entity;

import com.crafty.Handmade.Service.Order_Service;

@RestController
public class Order_Controller{
	
	@Autowired
	Order_Service service;
	
	@GetMapping("/fetchOrder")
	public List<Order_Entity> fetchOrder()
	{
		return service.fetchOrder();
	}
	
	@PostMapping("/insertOrder")
	public Order_Entity insertOrder(@RequestBody Order_Entity data)
	{
		return service.insertOrder(data);
	}
	
	@PutMapping("updateOrder/{orderId}")
	public Order_Entity updateexistingOrder(@PathVariable int OrderId, @RequestBody Order_Entity data)
	{
		return service.updateOrderData(OrderId,data);
		
	}
	@DeleteMapping("/deleterecordbyOrderId/{OrderId}")
	public String deletecatData(@PathVariable int OrderId)
	{
		return service.deleteOrder(OrderId);
	}
}