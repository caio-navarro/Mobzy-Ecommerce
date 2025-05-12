package com.ecommerce.mobzy.models;


import jakarta.persistence.*;

@Entity
@Table(name = "itens_carrinho")
public class ItemCarrinhoModels {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id_itens_carrinho")
    private int idItensCarriho;

    @Column(name = "quantidade")
    private int quantidade;






}
