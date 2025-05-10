package com.ecommerce.mobzy.models;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "clientes")
public class ClienteModels {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private int idCliente;

    @Column(name = "nome")
    private String nome;

    @Column(name = "data_nascimento")
    private Date dataNascimento;

    @Column(name = "email")
    private String email;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "cpf")
    private String cpf;

    @OneToOne
    @JoinColumn(name = "id_endereco_cliente", insertable = false, updatable = false)
    private EnderecoClienteModels enderecoCliente;

    @Column(name = "id_endereco_cliente")
    private int idEnderecoCliente;

    @OneToOne
    @JoinColumn(name = "id_carrinho", insertable = false, updatable = false)
    private CarrinhoModels carrinho;

    @Column(name = "id_carrinho")
    private int idCarrinho;

    public ClienteModels() {
    }

    public ClienteModels(CarrinhoModels carrinho, String telefone, String nome, int idEnderecoCliente, int idCarrinho, EnderecoClienteModels enderecoCliente, String email, Date dataNascimento, String cpf) {
        this.carrinho = carrinho;
        this.telefone = telefone;
        this.nome = nome;
        this.idEnderecoCliente = idEnderecoCliente;
        this.idCarrinho = idCarrinho;
        this.enderecoCliente = enderecoCliente;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
    }

    public int getIdCarrinho() {
        return idCarrinho;
    }

    public void setIdCarrinho(int idCarrinho) {
        this.idCarrinho = idCarrinho;
    }

    public int getIdEnderecoCliente() {
        return idEnderecoCliente;
    }

    public void setIdEnderecoCliente(int idEnderecoCliente) {
        this.idEnderecoCliente = idEnderecoCliente;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public EnderecoClienteModels getEnderecoCliente() {
        return enderecoCliente;
    }

    public void setEnderecoCliente(EnderecoClienteModels enderecoCliente) {
        this.enderecoCliente = enderecoCliente;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public CarrinhoModels getCarrinho() {
        return carrinho;
    }

    public void setCarrinho(CarrinhoModels carrinho) {
        this.carrinho = carrinho;
    }

}
