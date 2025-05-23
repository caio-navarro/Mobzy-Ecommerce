package com.ecommerce.mobzy.entities;

import com.ecommerce.mobzy.models.ProdutoModels;

public class Produto {

    private int idProduto;
    private String nome;
    private String descricao;
    private double preco;
    private int estoque;

    public Produto() {
    }

    public Produto(int idProduto, String nome, String descricao, double preco, int estoque) {
        this.idProduto = idProduto;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.estoque = estoque;
        validar();
    }

    public static Produto toProduto(ProdutoModels produtoModels) {
        Produto produto = new Produto();

        produto.setIdProduto(produtoModels.getIdProduto());
        produto.setNome(produtoModels.getNome());
        produto.setDescricao(produtoModels.getDescricao());
        produto.setPreco(produtoModels.getPreco());
        produto.setEstoque(produtoModels.getEstoque());

        return produto;
    }

    public void nomeIsInvalid() {
        if (nome == null || nome.trim().isEmpty() || nome.length() < 2 || nome.length() > 100) {
            throw new IllegalArgumentException("O nome do produto deve ter entre 2 e 100 caracteres.");
        }
    }

    public void descricaoIsInvalid() {
        if (descricao == null || descricao.trim().isEmpty() || descricao.length() < 5 || descricao.length() > 500) {
            throw new IllegalArgumentException("A descrição deve ter entre 5 e 500 caracteres.");
        }
    }

    public void precoIsInvalid() {
        if (preco < 0) {
            throw new IllegalArgumentException("O preço não pode ser negativo.");
        }
    }

    public void estoqueIsInvalid() {
        if (estoque < 0) {
            throw new IllegalArgumentException("O estoque não pode ser negativo.");
        }
    }

    public void validar() {
        nomeIsInvalid();
        descricaoIsInvalid();
        precoIsInvalid();
        estoqueIsInvalid();
    }

    // Getters e Setters

    public int getIdProduto() {
        return idProduto;
    }

    public void setIdProduto(int idProduto) {
        this.idProduto = idProduto;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
        nomeIsInvalid();
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
        descricaoIsInvalid();
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
        precoIsInvalid();
    }

    public int getEstoque() {
        return estoque;
    }

    public void setEstoque(int estoque) {
        this.estoque = estoque;
        estoqueIsInvalid();
    }
}
