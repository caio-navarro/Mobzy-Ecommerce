package com.ecommerce.mobzy.entities;

import com.ecommerce.mobzy.models.ItemCarrinhoModels;
import com.ecommerce.mobzy.models.ProdutoModels;

public class ItemCarrinho {

    private int idItemCarrinho;
    private Produto produto;
    private int quantidade;

    public ItemCarrinho() {
    }

    public ItemCarrinho(Produto produto, int quantidade) {
        this.produto = produto;
        this.quantidade = quantidade;
        validar();
    }

    public static ItemCarrinho toItemCarrinho(ItemCarrinhoModels itemModels) {
        ItemCarrinho item = new ItemCarrinho();

        item.setIdItemCarrinho(itemModels.getIdItemCarrinho());
        item.setProduto(itemModels.getProduto());
        item.setQuantidade(itemModels.getQuantidade());

        return item;
    }

    public void validar() {
        produtoIsInvalid();
        quantidadeIsInvalid();
    }

    private void produtoIsInvalid() {
        if (produto == null) {
            throw new IllegalArgumentException("Produto não pode ser nulo.");
        }
    }

    private void quantidadeIsInvalid() {
        if (quantidade <= 0) {
            throw new IllegalArgumentException("A quantidade deve ser maior que zero.");
        }
        if (quantidade > 1000) {
            throw new IllegalArgumentException("A quantidade excede o limite permitido (1000).");
        }
    }

    public int getIdItemCarrinho() {
        return idItemCarrinho;
    }

    public void setIdItemCarrinho(int idItemCarrinho) {
        this.idItemCarrinho = idItemCarrinho;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(ProdutoModels produto) {
        this.produto = Produto.toProduto(produto);
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
        quantidadeIsInvalid();
    }

    @Override
    public String toString() {
        return "ItemCarrinho{" +
                "idItemCarrinho=" + idItemCarrinho +
                ", produto=" + produto +
                ", quantidade=" + quantidade +
                '}';
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }
}
