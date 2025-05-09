package com.ecommerce.mobzy.models;


import jakarta.persistence.*;

@Entity
public class CarrinhoModels {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_carrinho")
    private int idCarrinho;

    @Column(name = "valor_total")
    private double valorTotal;

    //private ItenCarrinhoModels itemCarrinho;


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
