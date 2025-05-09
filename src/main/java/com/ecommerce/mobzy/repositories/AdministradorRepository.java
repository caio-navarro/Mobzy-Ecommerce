package com.ecommerce.mobzy.repositories;

import com.ecommerce.mobzy.models.AdministradorModels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministradorRepository extends JpaRepository<AdministradorModels, Integer> {
}
