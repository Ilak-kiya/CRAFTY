package com.crafty.Handmade.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crafty.Handmade.Entity.Product_Entity;

import com.crafty.Handmade.Repository.Product_Repo;
@Service
public class Product_Service {


	@Autowired
	Product_Repo repo;

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

	public List<Product_Entity> fetchProduct() {
		 return repo.findAll();
	}

	public Product_Entity insertProduct(Product_Entity data) {
		return repo.save(data);
	}

	public String deleteProduct(int ProductId) {
		if (repo.existsById(ProductId)) {
			repo.deleteById(ProductId);
			return "Data deleted successfully";
		} else {
			return "Data doesn't exists";
		}
	}

	public Product_Entity updateProductData(int ProductId, Product_Entity data) {
		return repo.save(data);
	}


}
