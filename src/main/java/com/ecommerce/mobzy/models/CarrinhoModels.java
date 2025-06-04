package com.ecommerce.mobzy.models;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "carrinhos")
public class CarrinhoModels {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_carrinho")
    private int idCarrinho;

    @OneToMany(mappedBy = "carrinho")
    private List<ItemCarrinhoModels> itemCarrinho;

    @Column(name = "valor_total")
    private double valorTotal;

    @OneToOne
    @JoinColumn(name = "id_cliente", insertable = false, updatable = false)
    private ClienteModels cliente;

    @Column(name = "id_cliente")
    private int idCliente;

    public int getIdCarrinho() {
        return idCarrinho;
    }

    public void setIdCarrinho(int idCarrinho) {
        this.idCarrinho = idCarrinho;
    }

    public double getValorTotal() {
        return valorTotal;
    }

    public int getIdCliente() {
        return idCliente;
    }

    public void setCliente(ClienteModels cliente) {
        this.cliente = cliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
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
}
