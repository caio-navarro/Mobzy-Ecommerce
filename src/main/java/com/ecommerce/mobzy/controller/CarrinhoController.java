package com.ecommerce.mobzy.controller;

import com.ecommerce.mobzy.application.CarrinhoApplication;
import com.ecommerce.mobzy.models.CarrinhoModels;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

    @RestController
    @RequestMapping("/carrinho")
    public class CarrinhoController {

        private final CarrinhoApplication carrinhoApplication;

        @Autowired
        public CarrinhoController(CarrinhoApplication carrinhoApplication) {
            this.carrinhoApplication = carrinhoApplication;
        }


        @GetMapping("/listar")
        public List listar() {
            return carrinhoApplication.listar();
        }

        @DeleteMapping("/deletar{id}")
        public void deletar(@PathVariable int id) {
            carrinhoApplication.deletar(id);
        }

        @PostMapping("/cadastrar")
        public CarrinhoModels cadastrar(@RequestBody CarrinhoModels carrinhoModels) {
            return carrinhoApplication.cadastrar(carrinhoModels);
        }

        @PutMapping("/atualizar")
        public void atualizar(@RequestBody CarrinhoModels carrinhoModels) {
            carrinhoApplication.atualizar(carrinhoModels);
        }
}
