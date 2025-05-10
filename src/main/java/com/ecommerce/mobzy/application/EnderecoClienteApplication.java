package com.ecommerce.mobzy.application;

import com.ecommerce.mobzy.models.ClienteModels;
import com.ecommerce.mobzy.models.EnderecoClienteModels;
import com.ecommerce.mobzy.repositories.EnderecoClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class EnderecoClienteApplication {

    @Autowired
    private EnderecoClienteRepository enderecoRepository;

    public EnderecoClienteModels cadastrar(EnderecoClienteModels endereco){
        return enderecoRepository.save(endereco);
    }

    public List listar(){
        return enderecoRepository.findAll();
    }

    public EnderecoClienteModels buscarPorId(int id){
        return enderecoRepository.findById(id).get();
    }

    public void atualizar(EnderecoClienteModels endereco){
        enderecoRepository.save(endereco);
    }

    public void deletar(int id){
        enderecoRepository.deleteById(id);
    }
}
