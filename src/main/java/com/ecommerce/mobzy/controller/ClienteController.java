package com.ecommerce.mobzy.controller;

import com.ecommerce.mobzy.application.ClienteApplication;
import com.ecommerce.mobzy.models.ClienteModels;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private ClienteApplication clienteApplication;

    @GetMapping("/listar")
    public List<ClienteModels> listar(){
        return clienteApplication.listar();
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ClienteModels cliente){
        return clienteApplication.cadastrar(cliente);
    }

    @DeleteMapping("/deletar/{id}")
    public void deletar(@PathVariable int id){
        clienteApplication.deletar(id);
    }

    @PutMapping("/atualizar")
    public void atualizar(@RequestBody ClienteModels cliente){
        clienteApplication.atualizar(cliente);
    }
}