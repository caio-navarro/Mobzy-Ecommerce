package com.ecommerce.mobzy.entities;

import com.ecommerce.mobzy.models.AdministradorModels;

public class Administrador {

    private int idCliente;

    private String nome;

    private String email;

    private String usuario;

    private String senha;

    private String cpf;



    public Administrador() {}


    public Administrador toAdministrador(AdministradorModels administradorModels) {
        Administrador administrador = new Administrador();

        administrador.setIdCliente(administradorModels.getIdAdministrador());
        administrador.setNome(administradorModels.getNome());
        administrador.setEmail(administradorModels.getEmail());
        administrador.setUsuario(administradorModels.getUsuario());
        administrador.setSenha(administradorModels.getSenha());
        administrador.setCpf(administradorModels.getCpf());

        return administrador;

    }
    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
}
