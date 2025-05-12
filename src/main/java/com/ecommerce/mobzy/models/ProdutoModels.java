package com.ecommerce.mobzy.models;


import jakarta.persistence.*;

@Entity
@Table(name = "produtos")
public class ProdutoModels {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id_produtos")
    private int id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "nome")
    private String nome;

    @Column(name = "preco")
    private double preco;


    public ProdutoModels() {}

    public ProdutoModels(int id, String descricao, String nome, double preco) {
        this.id = id;
        this.descricao = descricao;
        this.nome = nome;
        this.preco = preco;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }
}
