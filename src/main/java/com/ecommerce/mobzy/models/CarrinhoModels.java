package com.ecommerce.mobzy.models;


import com.ecommerce.mobzy.entities.ItemCarrinho;
import jakarta.persistence.*;

@Entity
public class CarrinhoModels {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_carrinho")
    private int idCarrinho;

    @Column(name = "itens_carrinho")
    private ItemCarrinhoModels itemCarrinho;

    @Column(name = "valor_total")
    private double valorTotal;


    public int getIdCarrinho() {
        return idCarrinho;
    }

    public void setIdCarrinho(int idCarrinho) {
        this.idCarrinho = idCarrinho;
    }

    public ItemCarrinho getItemCarrinho() {
        return itemCarrinho;
    }

    public void setItemCarrinho(ItemCarrinhoModels itemCarrinho) {
        this.itemCarrinho = itemCarrinho;
    }

    public double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(double valorTotal) {
        this.valorTotal = valorTotal;
    }
}
