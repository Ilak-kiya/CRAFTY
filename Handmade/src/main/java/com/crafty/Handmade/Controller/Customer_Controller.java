package com.crafty.Handmade.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.crafty.Handmade.Entity.Customer_Entity;

import com.crafty.Handmade.Service.Customer_Service;
import com.crafty.Handmade.Service.Order_Service;

@RestController
public class Customer_Controller {

    @Autowired
    Customer_Service cust_service;

    @Autowired
    Order_Service order_service;

    @GetMapping("/pagination")
    public List<Customer_Entity> fetchSortedRecords(@RequestParam int pageNo, 
                                                    @RequestParam int pageSize, 
                                                    @RequestParam String custName) {
        return cust_service.getPaginatedRecord1(pageNo, pageSize, custName);
    }

    @GetMapping("/customers/search")
    public List<Customer_Entity> searchCustomers(@RequestParam String keyword, @RequestParam String type) {
        switch (type) {
            case "startsWith": return cust_service.fetchNames(keyword);
            case "endsWith": return cust_service.fetchNamesEnd(keyword);
            case "contains": return cust_service.fetchNamesContains(keyword);
            case "notContains": return cust_service.fetchNamesNotContains(keyword);
            case "containing": return cust_service.fetchNamesContaining(keyword);
            case "notContaining": return cust_service.fetchNamesNotContaining(keyword);
            default: return List.of();
        }
    }

    @PostMapping("/customers/insert")
    public Customer_Entity insertCustomer(@RequestBody Customer_Entity data) {
        return cust_service.insertCustomer(data);
    }

    @PutMapping("/customers/update/{customerId}")
    public Customer_Entity updateCustomer(@PathVariable int customerId, @RequestBody Customer_Entity data) {
        return cust_service.updateData(customerId, data);
    }

    @DeleteMapping("/customers/delete/{customerId}")
    public String deleteCustomer(@PathVariable int customerId) {
        return cust_service.deletecust(customerId);
    }

    @PostMapping("/customers/sendEmail")
    public String sendEmail(@RequestParam String receiver, @RequestParam String subject, @RequestParam String content) {
        return cust_service.fetchEmail(receiver, subject, content);
    }

    
}
