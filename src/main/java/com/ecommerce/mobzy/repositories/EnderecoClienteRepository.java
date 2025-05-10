package com.ecommerce.mobzy.repositories;

import com.ecommerce.mobzy.models.EnderecoClienteModels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnderecoClienteRepository extends JpaRepository<EnderecoClienteModels, Integer> {
}
