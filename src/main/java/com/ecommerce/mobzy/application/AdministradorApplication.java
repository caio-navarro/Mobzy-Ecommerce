package com.ecommerce.mobzy.application;

import com.ecommerce.mobzy.models.AdministradorModels;
import com.ecommerce.mobzy.models.CarrinhoModels;
import com.ecommerce.mobzy.repositories.AdministradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AdministradorApplication {

    @Autowired
    AdministradorRepository administradorRepository;

    public AdministradorModels cadastrar (AdministradorModels administradorModels) {
        return administradorRepository.save(administradorModels);
    }

    public List listar ()  {
        return administradorRepository.findAll();
    }

    public AdministradorModels atualizar (AdministradorModels administradorModels) {
        return administradorRepository.save(administradorModels);
    }

    public void deletar(int id) {
        administradorRepository.deleteById(id);
    }

    public AdministradorModels buscarPorId(int id) {
        return administradorRepository.findById(id).get();
    }
}
