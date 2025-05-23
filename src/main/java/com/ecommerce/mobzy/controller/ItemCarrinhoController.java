package com.ecommerce.mobzy.controller;

import com.ecommerce.mobzy.application.ItemCarrinhoApplication;
import com.ecommerce.mobzy.models.ItemCarrinhoModels;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item-carrinho")
public class ItemCarrinhoController {

    private final ItemCarrinhoApplication itemCarrinhoApplication;

    @Autowired
    public ItemCarrinhoController(ItemCarrinhoApplication itemCarrinhoApplication) {
        this.itemCarrinhoApplication = itemCarrinhoApplication;
    }

    @GetMapping("/listar")
    public List<ItemCarrinhoModels> listar() {
        return itemCarrinhoApplication.listar();
    }

    @PostMapping("/cadastrar")
    public ItemCarrinhoModels cadastrar(@RequestBody ItemCarrinhoModels item) {
        return itemCarrinhoApplication.cadastrar(item);
    }

    @PutMapping("/atualizar")
    public void atualizar(@RequestBody ItemCarrinhoModels item) {
        itemCarrinhoApplication.atualizar(item);
    }

    @GetMapping("/buscar/{id}")
    public ItemCarrinhoModels buscarPorId(@PathVariable int id) {
        return itemCarrinhoApplication.buscarPorId(id);
    }

    @DeleteMapping("/deletar/{id}")
    public void deletar(@PathVariable int id) {
        itemCarrinhoApplication.deletar(id);
    }
}
