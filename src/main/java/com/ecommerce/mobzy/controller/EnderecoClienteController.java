package com.ecommerce.mobzy.controller;

import com.ecommerce.mobzy.application.EnderecoClienteApplication;
import com.ecommerce.mobzy.models.EnderecoClienteModels;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/endereco-cliente")
public class EnderecoClienteController {

    @Autowired
    private EnderecoClienteApplication enderecoApplication;

    @GetMapping("/listar")
    public List listar(){
        return enderecoApplication.listar();
    }

    @PostMapping("/cadastrar")
    public EnderecoClienteModels cadastrar(@RequestBody EnderecoClienteModels endereco){
        return enderecoApplication.cadastrar(endereco);
    }

    @DeleteMapping("/deletar{id}")
    public void deletar(@PathVariable int id){
        enderecoApplication.deletar(id);
    }

    @PutMapping("/atualizar")
    public void atualizar(@RequestBody EnderecoClienteModels endereco){
        enderecoApplication.atualizar(endereco);
    }
}
