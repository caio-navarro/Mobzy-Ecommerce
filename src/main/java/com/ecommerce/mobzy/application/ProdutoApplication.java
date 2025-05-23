package com.ecommerce.mobzy.application;

import com.ecommerce.mobzy.models.ProdutoModels;
import com.ecommerce.mobzy.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProdutoApplication {

    @Autowired
    private ProdutoRepository produtoRepository;

    public ProdutoModels cadastrar(ProdutoModels produto){
        return produtoRepository.save(produto);
    }

    public List listar(){
        return produtoRepository.findAll();
    }

    public void atualizar(ProdutoModels produto){
        produtoRepository.save(produto);
    }

    public ProdutoModels buscarPorId(int id){
        return produtoRepository.findById(id).get();
    }

    public void deletar(int id){
        produtoRepository.deleteById(id);
    }
}
