package com.crafty.Handmade.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.crafty.Handmade.Entity.Customer_Entity;
import com.crafty.Handmade.Repository.Customer_Repo;
import com.crafty.Handmade.Repository.Order_Repo;
import com.crafty.Handmade.Repository.SmtpRepo;
import com.crafty.Handmade.Entity.SmtpEntity;


import jakarta.mail.MessagingException;

@Service
public class Customer_Service {


	 @Autowired
	    Customer_Repo cust_repo;
	 
	 @Autowired
	    Order_Repo orRepo;
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private SmtpRepo mailrepo;

    public Customer_Entity updateData(int customerId, Customer_Entity data) {
        return cust_repo.save(data);
    }

    public List<Customer_Entity> getPaginatedRecord1(int pageNo, int pageSize, String custName) {
        Pageable page = PageRequest.of(pageNo, pageSize, Sort.by("customerName").ascending());  
        return cust_repo.findAll(page).getContent();
    }


    public List<Customer_Entity> fetchNames(String customerName) {
        return cust_repo.findByCustomerNameStartsWith(customerName);
    }

    public List<Customer_Entity> fetchNamesEnd(String customerName) {
        return cust_repo.findByCustomerNameEndsWith(customerName);
    }

    public List<Customer_Entity> fetchNamesContains(String customerName) {
        return cust_repo.findByCustomerNameContains(customerName);
    }

    public List<Customer_Entity> fetchNamesNotContains(String customerName) {
        return cust_repo.findByCustomerNameNotContains(customerName);
    }

    public List<Customer_Entity> fetchNamesContaining(String customerName) {
        return cust_repo.findByCustomerNameContaining(customerName);
    }

    public List<Customer_Entity> fetchNamesNotContaining(String customerName) {
        return cust_repo.findByCustomerNameNotContaining(customerName);
    }

    public boolean fetchNamesIsContaining(String customerName) {
        return cust_repo.existsByCustomerNameIsContaining(customerName);
    }
    
    
    public String deletecust(int customerId) {
    	if (cust_repo.existsById(customerId)) {
    		cust_repo.deleteById(customerId);
			return "Data deleted successfully";
		} else {
			return "Data doesn't exists";
		}
	}
	
    
    public Customer_Entity insertCustomer(Customer_Entity data) {
    	return cust_repo.save(data);
	}
    // SMTP Email Fetching and Sending
    public String fetchEmail(String receiver, String subject, String content) {
        try {
        	jakarta.mail.internet.MimeMessage msg = mailSender.createMimeMessage();
        	MimeMessageHelper mesHelper = new MimeMessageHelper(msg, true);

            mesHelper.setTo(receiver);
            mesHelper.setSubject(subject);
            mesHelper.setText(content);
            mailSender.send(msg);
            
            SmtpEntity smtp = new SmtpEntity();
            smtp.setReceiver(receiver);
            smtp.setContent(content);
            smtp.setSubject(subject);
            mailrepo.save(smtp);
            
            return "Mail sent Successfully";
        } catch (MessagingException e) {
            return "Mail not sent: " + e.getMessage();
        }
    }

  






	
}
