package com.ecommerce.mobzy.repositories;

import com.ecommerce.mobzy.models.ClienteModels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteModels, Integer> {
}
