package com.ecommerce.mobzy.repositories;

import com.ecommerce.mobzy.models.CarrinhoModels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarrinhoRepository extends JpaRepository<CarrinhoModels, Integer> {

}
