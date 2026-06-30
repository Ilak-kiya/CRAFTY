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

import com.crafty.Handmade.Entity.Payment_Entity;
import com.crafty.Handmade.Service.Payment_Service;

@RestController
public class Payment_Controller{
	
	@Autowired
	Payment_Service service;
	
	@GetMapping("/fetchPayment")
	public List<Payment_Entity> fetchPayment()
	{
		return service.fetchPayment();
	}
	
	@PostMapping("/insertPayment")
	public Payment_Entity insertPayment(@RequestBody Payment_Entity data)
	{
		return service.insertPayment(data);
	}
	
	@PutMapping("updatePayment/{PaymentId}")
	public Payment_Entity updateexistingPayment(@PathVariable int PaymentId, @RequestBody Payment_Entity data)
	{
		return service.updatePaymentData(PaymentId,data);
		
	}
	@DeleteMapping("/deleterecordbyPaymentId/{PaymentId}")
	public String deletePaymentData(@PathVariable int PaymentId)
	{
		return service.deletePayment(PaymentId);
	}
}