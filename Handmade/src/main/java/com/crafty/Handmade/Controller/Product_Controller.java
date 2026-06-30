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

import com.crafty.Handmade.Entity.Product_Entity;

import com.crafty.Handmade.Service.Product_Service;

@RestController
public class Product_Controller{
	
	@Autowired
	Product_Service service;
	
	@GetMapping("/fetchProduct")
	public List<Product_Entity> fetchProduct()
	{
		return service.fetchProduct();
	}
	
	@PostMapping("/insertProduct")
	public Product_Entity insertProduct(@RequestBody Product_Entity data)
	{
		return service.insertProduct(data);
	}
	
	@PutMapping("updateProduct/{ProductId}")
	public Product_Entity updateexistingProduct(@PathVariable int ProductId, @RequestBody Product_Entity data)
	{
		return service.updateProductData(ProductId,data);
		
	}
	@DeleteMapping("/deleterecordbyProductId/{ProductId}")
	public String deleteProductData(@PathVariable int ProductId)
	{
		return service.deleteProduct(ProductId);
	}
}