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

import com.crafty.Handmade.Entity.Review_Entity;

import com.crafty.Handmade.Service.Review_Service;

@RestController
public class Review_Controller{
	
	@Autowired
	Review_Service service;
	
	@GetMapping("/fetchReview")
	public List<Review_Entity> fetchReview()
	{
		return service.fetchReview();
	}
	
	@PostMapping("/insertReview")
	public Review_Entity insertReview(@RequestBody Review_Entity data)
	{
		return service.insertReview(data);
	}
	
	@PutMapping("updateReview/{ReviewId}")
	public Review_Entity updateexistingReview(@PathVariable int ReviewId, @RequestBody Review_Entity data)
	{
		return service.updateReviewData(ReviewId,data);
		
	}
	@DeleteMapping("/deleterecordbyReviewId/{ReviewId}")
	public String deleteReviewData(@PathVariable int ReviewId)
	{
		return service.deleteReview(ReviewId);
	}
}