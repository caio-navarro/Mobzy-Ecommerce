package com.ecommerce.mobzy.application;

import com.ecommerce.mobzy.models.ItemCarrinhoModels;
import com.ecommerce.mobzy.repositories.ItemCarrinhoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ItemCarrinhoApplication {

    @Autowired
    ItemCarrinhoRepository itemCarrinhoRepository;

    public ItemCarrinhoModels cadastrar(ItemCarrinhoModels item) {
        return itemCarrinhoRepository.save(item);
    }

    public List<ItemCarrinhoModels> listar() {
        return itemCarrinhoRepository.findAll();
    }


    public void atualizar(ItemCarrinhoModels item) {
        itemCarrinhoRepository.save(item);
    }

    public ItemCarrinhoModels buscarPorId(int id) {
        return itemCarrinhoRepository.findById(id).get();
    }

    public void deletar(int id) {
        itemCarrinhoRepository.deleteById(id);
    }
}
