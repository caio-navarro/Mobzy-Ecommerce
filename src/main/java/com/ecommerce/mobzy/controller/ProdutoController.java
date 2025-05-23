package com.ecommerce.mobzy.controller;

import com.ecommerce.mobzy.application.ProdutoApplication;
import com.ecommerce.mobzy.models.ProdutoModels;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    private final ProdutoApplication produtoApplication;

    @Autowired
    public ProdutoController(ProdutoApplication produtoApplication) {
        this.produtoApplication = produtoApplication;
    }

    @GetMapping("/listar")
    public List listar() {
        return produtoApplication.listar();
    }

    @DeleteMapping("/deletar{id}")
    public void deletar(@PathVariable int id) {
        produtoApplication.deletar(id);
    }

    @PostMapping("/cadastrar")
    public ProdutoModels cadastrar(@RequestBody ProdutoModels produtoModels) {
        return produtoApplication.cadastrar(produtoModels);
    }

    @PutMapping("/atualizar")
    public void atualizar(@RequestBody ProdutoModels produtoModels) {
        produtoApplication.atualizar(produtoModels);
    }

    @GetMapping("/buscar{id}")
    public ProdutoModels buscarPorId(@PathVariable int id) {
        return produtoApplication.buscarPorId(id);
    }
}
