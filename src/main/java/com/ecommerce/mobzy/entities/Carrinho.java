package com.ecommerce.mobzy.entities;


import com.ecommerce.mobzy.models.CarrinhoModels;

public class Carrinho {

    private int idCarrinho;

    private double valorTotal;


    public static Carrinho toCarrinho(CarrinhoModels carrinhoModels) {
        Carrinho carrinho = new Carrinho();

        carrinho.setIdCarrinho(carrinhoModels.getIdCarrinho());
        carrinho.setValorTotal(carrinhoModels.getValorTotal());
        // item carrinho ainda falta
        return carrinho;
    }



    public Carrinho() {
    }

    public int getIdCarrinho() {
        return idCarrinho;
    }

    public void setIdCarrinho(int idCarrinho) {
        this.idCarrinho = idCarrinho;
    }

    public double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(double valorTotal) {
        this.valorTotal = valorTotal;
    }
}
