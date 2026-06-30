package com.crafty.Handmade.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crafty.Handmade.Entity.Order_Entity;
import com.crafty.Handmade.Repository.Order_Repo;

@Service
public class Order_Service {


	@Autowired
	Order_Repo orderRepo;

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

	public List<Order_Entity> fetchOrder() {
		 return orderRepo.findAll();
	}

	public Order_Entity insertOrder(Order_Entity data) {
		return orderRepo.save(data);
	}

	public String deleteOrder(int OrderId) {
		if (orderRepo.existsById(OrderId)) {
			orderRepo.deleteById(OrderId);
			return "Data deleted successfully";
		} else {
			return "Data doesn't exists";
		}
	}

	public Order_Entity updateOrderData(int orderId, Order_Entity data) {
        if (orderRepo.existsById(orderId)) {
            data.setOrderId(orderId); // Preserve the order ID
            return orderRepo.save(data);
        } else {
            throw new RuntimeException("Order with ID " + orderId + " not found");
        }
    }
   
}
