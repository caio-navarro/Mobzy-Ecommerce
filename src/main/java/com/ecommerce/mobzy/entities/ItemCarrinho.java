package com.ecommerce.mobzy.entities;

public class ItemCarrinho {

    private int quantidade;

    public ItemCarrinho(int quantidade) {
        this.quantidade = quantidade;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    @Override
    public String toString() {
        return "ItemCarrinho{" +
                "quantidade=" + quantidade +
                '}';
    }
}
