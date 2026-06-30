package com.crafty.Handmade.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crafty.Handmade.Entity.Payment_Entity;

import com.crafty.Handmade.Repository.Payment_Repo;
@Service
public class Payment_Service {


	@Autowired
	Payment_Repo repo;

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

	public List<Payment_Entity> fetchPayment() {
		 return repo.findAll();
	}

	public Payment_Entity insertPayment(Payment_Entity data) {
		return repo.save(data);
	}

	public String deletePayment(int PaymentId) {
		if (repo.existsById(PaymentId)) {
			repo.deleteById(PaymentId);
			return "Data deleted successfully";
		} else {
			return "Data doesn't exists";
		}
	}

	public Payment_Entity updatePaymentData(int PaymentId, Payment_Entity data) {
		return repo.save(data);
	}


}
