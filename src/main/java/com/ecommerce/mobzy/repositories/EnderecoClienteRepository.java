package com.ecommerce.mobzy.repositories;

import com.ecommerce.mobzy.entities.EnderecoCliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnderecoClienteRepository extends JpaRepository<EnderecoCliente, Integer> {
}
