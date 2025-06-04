package com.ecommerce.mobzy.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "produtos")
public class ProdutoModels {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id_produtos")
    private int idProduto;

    @Column(name = "estoque")
    private int estoque;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "nome")
    private String nome;

    @Column(name = "preco")
    private double preco;

    @Column(name = "status")
    private String status = "ativo";

    @Column(name = "imagem_url")
    private String imagemUrl; 

    @OneToMany(mappedBy = "produto")
    private List<ItemCarrinhoModels> itensCarrinho;

    public ProdutoModels() {}

    public ProdutoModels(int idProduto, int estoque, String descricao, String nome, double preco) {
        this.idProduto = idProduto;
        this.estoque = estoque;
        this.descricao = descricao;
        this.nome = nome;
        this.preco = preco;

    }

    public int getIdProduto() {
        return idProduto;
    }

    public void setId(int id) {
        this.idProduto = id;
    }

    public String getImagemUrl() {
        return imagemUrl;
    }
    
    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getEstoque() {
        return estoque;
    }

    public void setEstoque(int estoque) {
        this.estoque = estoque;
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
