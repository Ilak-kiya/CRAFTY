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
import com.crafty.Handmade.Entity.Category_Entity;
import com.crafty.Handmade.Service.Category_Service;

@RestController
public class Category_Controller {

	@Autowired
	Category_Service service;
	
	@GetMapping("/fetchCategory")
	public List<Category_Entity> fetchCategory()
	{
		return service.fetchcat();
	}
	
	@PostMapping("/insertCategory")
	public Category_Entity insertCategory(@RequestBody Category_Entity data)
	{
		return service.insertcat(data);
	}
	
	@PutMapping("updateCategory/{categoryId}")
	public Category_Entity updateexistingcat(@PathVariable int categoryId, @RequestBody Category_Entity data)
	{
		return service.updatecatData(categoryId,data);
		
	}
	@DeleteMapping("/deleterecordbycatId/{categoryId}")
	public String deletecatData(@PathVariable int categoryId)
	{
		return service.deletecat(categoryId);
	}
	


}
