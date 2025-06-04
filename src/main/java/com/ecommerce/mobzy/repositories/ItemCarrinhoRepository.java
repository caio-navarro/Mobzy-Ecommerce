package com.ecommerce.mobzy.repositories;

import com.ecommerce.mobzy.models.ItemCarrinhoModels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemCarrinhoRepository extends JpaRepository<ItemCarrinhoModels, Integer> {
}
