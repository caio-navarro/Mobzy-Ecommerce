package com.ecommerce.mobzy.repositories;

import com.ecommerce.mobzy.models.ProdutoModels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<ProdutoModels, Integer> {
}
