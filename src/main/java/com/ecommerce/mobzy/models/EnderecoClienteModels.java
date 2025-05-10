package com.ecommerce.mobzy.models;

import jakarta.persistence.*;

@Entity
@Table(name = "endereco_clientes")
public class EnderecoClienteModels {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_endereco_cliente")
    private int idEnderecoCliente;

    @Column(name = "cep")
    private String cep;

    @Column(name = "logradouro")
    private String logradouro;

    @Column(name = "bairro")
    private String bairro;

    @Column(name = "numero")
    private String numero;

    @Column(name = "cidade")
    private String cidade;

    @Column(name = "estado")
    private String estado;

    @Column(name = "complemento")
    private String complemento;

    public EnderecoClienteModels() {
    }

    public EnderecoClienteModels(String bairro, String cep, String cidade, String complemento, String estado, String logradouro, String numero) {
        this.bairro = bairro;
        this.cep = cep;
        this.cidade = cidade;
        this.complemento = complemento;
        this.estado = estado;
        this.logradouro = logradouro;
        this.numero = numero;
    }

    public int getIdEnderecoCliente() {
        return idEnderecoCliente;
    }

    public void setIdEnderecoCliente(int idEnderecoCliente) {
        this.idEnderecoCliente = idEnderecoCliente;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }
}
