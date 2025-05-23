package com.ecommerce.mobzy.models;


import jakarta.persistence.*;

@Entity
@Table(name = "itens_carrinho")
public class ItemCarrinhoModels {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id_itens_carrinho")
    private int idItemCarrinho;

    @Column(name = "quantidade")
    private int quantidade;

    @ManyToOne
    @JoinColumn(name = "id_produto", nullable = false)
    private ProdutoModels produto;

    @ManyToOne
    @JoinColumn(name = "id_carrinho", nullable = false)
    private CarrinhoModels carrinho;

    public ItemCarrinhoModels() {}

    public ItemCarrinhoModels(int idItemCarrinho, int quantidade) {
        this.idItemCarrinho = idItemCarrinho;
        this.quantidade = quantidade;
    }

    public ProdutoModels getProduto() {
        return produto;
    }

    public void setProduto(ProdutoModels produto) {
        this.produto = produto;
    }

    public CarrinhoModels getCarrinho() {
        return carrinho;
    }

    public void setCarrinho(CarrinhoModels carrinho) {
        this.carrinho = carrinho;
    }

    public int getIdItemCarrinho() {
        return idItemCarrinho;
    }

    public void setIdItemCarrinho(int idItemCarrinho) {
        this.idItemCarrinho = idItemCarrinho;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
}
