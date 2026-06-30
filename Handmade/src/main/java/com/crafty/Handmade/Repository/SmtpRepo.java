package com.crafty.Handmade.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.crafty.Handmade.Entity.SmtpEntity;

@Repository
public interface SmtpRepo extends JpaRepository<SmtpEntity, Integer> {
}
