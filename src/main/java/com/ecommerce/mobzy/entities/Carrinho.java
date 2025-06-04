package com.ecommerce.mobzy.entities;

import java.util.List;
import com.ecommerce.mobzy.models.CarrinhoModels;
import com.ecommerce.mobzy.models.ClienteModels;
import com.ecommerce.mobzy.models.ItemCarrinhoModels;

public class Carrinho {

    private int idCarrinho;
    private double valorTotal;
    private List<ItemCarrinhoModels> itemCarrinho;
    private ClienteModels cliente;
    private int idCliente;

    public static Carrinho toCarrinho(CarrinhoModels carrinhoModels) {
        Carrinho carrinho = new Carrinho();

        carrinho.setIdCarrinho(carrinhoModels.getIdCarrinho());
        carrinho.setValorTotal(carrinhoModels.getValorTotal());
        carrinho.setItemCarrinho(carrinhoModels.getItemCarrinho());
        carrinho.setIdCliente(carrinhoModels.getIdCliente());
        return carrinho;
    }

    public Carrinho() {
    }

    public Carrinho(double valorTotal, List<ItemCarrinhoModels> itemCarrinho, ClienteModels cliente, int idCliente) {
        this.valorTotal = valorTotal;
        this.itemCarrinho = itemCarrinho;
        this.cliente = cliente;
        this.idCliente = idCliente;
    }

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

    public List<ItemCarrinhoModels> getItemCarrinho() {
        return itemCarrinho;
    }

    public void setItemCarrinho(List<ItemCarrinhoModels> itemCarrinho) {
        this.itemCarrinho = itemCarrinho;
    }

    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public ClienteModels getCliente() {
        return cliente;
    }

    public void setCliente(ClienteModels cliente) {
        this.cliente = cliente;
    }

    
}
