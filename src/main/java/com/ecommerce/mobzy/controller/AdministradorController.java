package com.ecommerce.mobzy.controller;


import com.ecommerce.mobzy.application.AdministradorApplication;
import com.ecommerce.mobzy.entities.Administrador;
import com.ecommerce.mobzy.models.AdministradorModels;
import com.ecommerce.mobzy.repositories.AdministradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/administrador-empresa")
public class AdministradorController {

    private final AdministradorApplication administradorApplication;

    @Autowired
    public AdministradorController(AdministradorApplication administradorApplication) {
        this.administradorApplication = administradorApplication;
    }

    @GetMapping("/listar")
    public List listar() {
        return administradorApplication.listar();
    }

    @DeleteMapping("/deletar{id}")
    public void deletar(@PathVariable int id) {
        administradorApplication.deletar(id);
    }

    @PostMapping("/cadastrar")
    public AdministradorModels cadastrar(@RequestBody AdministradorModels administradorModels) {
        return administradorApplication.cadastrar(administradorModels);
    }

    @PutMapping("/atualizar")
    public void atualizar(@RequestBody AdministradorModels administradorModels) {
        administradorApplication.atualizar(administradorModels);
    }


}
