package com.ecommerce.mobzy.entities;

public class Produto {

    private String descricao;
    private String nome;
    private double preco;

    public Produto(String descricao, String nome, double preco) {
        this.descricao = descricao;
        this.nome = nome;
        this.preco = preco;
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

    @Override
    public String toString() {
        return "Produto{" +
                "descricao='" + descricao + '\'' +
                ", nome='" + nome + '\'' +
                ", preco=" + preco +
                '}';
    }
}
