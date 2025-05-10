package com.ecommerce.mobzy.application;

import com.ecommerce.mobzy.models.ClienteModels;
import com.ecommerce.mobzy.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class ClienteApplication {

    @Autowired
    private ClienteRepository clienteRepository;

    public ClienteModels cadastrar(ClienteModels cliente){
        return clienteRepository.save(cliente);
    }

    public List listar(){
        return clienteRepository.findAll();
    }

    public ClienteModels buscarPorId(int id){
        return clienteRepository.findById(id).get();
    }

    public void atualizar(ClienteModels cliente){
        clienteRepository.save(cliente);
    }

    public void deletar(int id){
        clienteRepository.deleteById(id);
    }
}
