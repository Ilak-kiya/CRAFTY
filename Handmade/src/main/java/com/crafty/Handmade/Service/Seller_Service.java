package com.crafty.Handmade.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crafty.Handmade.Entity.Seller_Entity;
import com.crafty.Handmade.Repository.Seller_Repo;
@Service
public class Seller_Service {


	@Autowired
	Seller_Repo repo;

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

	public List<Seller_Entity> fetchSeller() {
		 return repo.findAll();
	}

	public Seller_Entity insertSeller(Seller_Entity data) {
		return repo.save(data);
	}

	public String deleteSeller(int SellerId) {
		if (repo.existsById(SellerId)) {
			repo.deleteById(SellerId);
			return "Data deleted successfully";
		} else {
			return "Data doesn't exists";
		}
	}

	public Seller_Entity updateSellerData(int SellerId, Seller_Entity data) {
		return repo.save(data);
	}


}
