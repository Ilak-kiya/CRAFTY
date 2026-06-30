package com.crafty.Handmade.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crafty.Handmade.Entity.Review_Entity;
import com.crafty.Handmade.Repository.Review_Repo;
@Service
public class Review_Service {


	@Autowired
	Review_Repo repo;

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

	public List<Review_Entity> fetchReview() {
		 return repo.findAll();
	}

	public Review_Entity insertReview(Review_Entity data) {
		return repo.save(data);
	}

	public String deleteReview(int ReviewId) {
		if (repo.existsById(ReviewId)) {
			repo.deleteById(ReviewId);
			return "Data deleted successfully";
		} else {
			return "Data doesn't exists";
		}
	}

	public Review_Entity updateReviewData(int ReviewId, Review_Entity data) {
		return repo.save(data);
	}


}
