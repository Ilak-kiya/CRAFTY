package com.crafty.Handmade.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crafty.Handmade.Entity.Category_Entity;
import com.crafty.Handmade.Repository.Category_Repo;

@Service
public class Category_Service {
	@Autowired
	Category_Repo repo;

	public static void main(String[] args) {

		String url = "jdbc:mysql://localhost:3306/crafty";
		String username = "root";
		String password = "Ravimani1967$";

		try (Connection con = DriverManager.getConnection(url, username, password)) {

			if (con != null) {
				System.out.println("Connection established success");
			} else {
				System.out.println("Connection failed");
			}
		} 
		catch (SQLException ex) {
			System.out.print("Failed to connect db" + ex.getMessage());
		}	
	}

	public List<Category_Entity> fetchcat() {
		 return repo.findAll();
	}

	public Category_Entity insertcat(Category_Entity data) {
		return repo.save(data);
	}

	public Category_Entity updatecatData(int categoryId, Category_Entity data) {
		
		return repo.save(data);
	}

	public String deletecat(int categoryId) {
		if (repo.existsById(categoryId)) {
			repo.deleteById(categoryId);
			return "Data deleted successfully";
		} else {
			return "Data doesn't exists";
		}
	}


}