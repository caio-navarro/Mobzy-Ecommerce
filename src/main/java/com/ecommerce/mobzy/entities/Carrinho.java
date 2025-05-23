package com.ecommerce.mobzy.entities;


import com.ecommerce.mobzy.models.CarrinhoModels;

public class Carrinho {

    private int idCarrinho;

    private double valorTotal;

    private ItemCarrinho itemCarrinho;


    public Carrinho toCarrinho(CarrinhoModels carrinhoModels) {
        Carrinho carrinho = new Carrinho();

        carrinho.setIdCarrinho(carrinhoModels.getIdCarrinho());
        carrinho.setValorTotal(carrinhoModels.getValorTotal());
        carrinho.setItemCarrinho(carrinhoModels.getItemCarrinho());
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

    public ItemCarrinho getItemCarrinho() {
        return itemCarrinho;
    }

    public void setItemCarrinho(ItemCarrinho itemCarrinho) {
        this.itemCarrinho = itemCarrinho;
    }
}
