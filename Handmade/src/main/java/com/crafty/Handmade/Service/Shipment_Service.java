package com.crafty.Handmade.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crafty.Handmade.Entity.Shipment_Entity;

import com.crafty.Handmade.Repository.Shipment_Repo;
@Service
public class Shipment_Service {


	@Autowired
	Shipment_Repo repo;

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

	public List<Shipment_Entity> fetchShipment() {
		 return repo.findAll();
	}

	public Shipment_Entity insertShipment(Shipment_Entity data) {
		return repo.save(data);
	}

	public String deleteShipment(int ShipmentId) {
		if (repo.existsById(ShipmentId)) {
			repo.deleteById(ShipmentId);
			return "Data deleted successfully";
		} else {
			return "Data doesn't exists";
		}
	}

	public Shipment_Entity updateShipmentData(int ShipmentId, Shipment_Entity data) {
		return repo.save(data);
	}


}
