package com.ecommerce.mobzy.application;

import com.ecommerce.mobzy.models.CarrinhoModels;
import com.ecommerce.mobzy.repositories.CarrinhoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CarrinhoApplication {

    @Autowired
    CarrinhoRepository carrinhoRepository;

    public CarrinhoModels cadastrar (CarrinhoModels carrinhoModels) {
        return carrinhoRepository.save(carrinhoModels);
    }

    public List listar ()  {
        return carrinhoRepository.findAll();
    }

    public CarrinhoModels atualizar (CarrinhoModels carrinhoModels) {
        return carrinhoRepository.save(carrinhoModels);
    }

    public void deletar(int id) {
        carrinhoRepository.deleteById(id);
    }

    public CarrinhoModels buscarPorId(int id) {
        return carrinhoRepository.findById(id).get();
    }
}
