package com.ecommerce.mobzy.models;

import jakarta.persistence.*;
import java.time.LocalDate;

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
    private LocalDate dataNascimento;

    @Column(name = "email")
    private String email;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "cpf")
    private String cpf;

    @Column(name = "senha")
    private String senha;

    @OneToOne(optional = true)
    @JoinColumn(name = "id_endereco_cliente", insertable = false, updatable = false)
    private EnderecoClienteModels enderecoCliente;

    @Column(name = "id_endereco_cliente")
    private Integer idEnderecoCliente;

    @OneToOne(optional = true)
    @JoinColumn(name = "id_carrinho", insertable = false, updatable = false)
    private CarrinhoModels carrinho;

    @Column(name = "id_carrinho")
    private Integer idCarrinho;

    public ClienteModels() {
    }

    public ClienteModels(CarrinhoModels carrinho, String telefone, String nome, String senha, Integer idEnderecoCliente, Integer idCarrinho, EnderecoClienteModels enderecoCliente, String email, LocalDate dataNascimento, String cpf) {
        this.carrinho = carrinho;
        this.telefone = telefone;
        this.nome = nome;
        this.senha = senha;
        this.idEnderecoCliente = idEnderecoCliente;
        this.idCarrinho = idCarrinho;
        this.enderecoCliente = enderecoCliente;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
    }

    public Integer getIdCarrinho() {
        return idCarrinho;
    }

    public void setIdCarrinho(Integer idCarrinho) {
        this.idCarrinho = idCarrinho;
    }

    public Integer getIdEnderecoCliente() {
        return idEnderecoCliente;
    }

    public void setIdEnderecoCliente(Integer idEnderecoCliente) {
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

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public CarrinhoModels getCarrinho() {
        return carrinho;
    }

    public void setCarrinho(CarrinhoModels carrinho) {
        this.carrinho = carrinho;
    }

}
