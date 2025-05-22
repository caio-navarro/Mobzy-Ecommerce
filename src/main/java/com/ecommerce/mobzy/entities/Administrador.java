package com.ecommerce.mobzy.entities;

import com.ecommerce.mobzy.entities.SubEntities.Cpf;
import com.ecommerce.mobzy.entities.SubEntities.Email;
import com.ecommerce.mobzy.entities.SubEntities.Nome;
import com.ecommerce.mobzy.models.AdministradorModels;

public class Administrador {

    private int idCliente;

    private Nome nome = new Nome();

    private Email email = new Email();

    private String usuario;

    private String senha;

    private Cpf cpf = new Cpf();



    public Administrador() {}


    public static Administrador toAdministrador(AdministradorModels administradorModels) {
        Administrador administrador = new Administrador();

        administrador.setIdCliente(administradorModels.getIdAdministrador());

        Nome nome = new Nome();
        nome.setNome(administradorModels.getNome());
        administrador.nome = nome;

        Email email = new Email();
        email.setEmail(administradorModels.getEmail());
        administrador.email = email;


        administrador.setUsuario(administradorModels.getUsuario());
        administrador.setSenha(administradorModels.getSenha());

        Cpf cpf = new Cpf();
        administrador.setCpf(administradorModels.getCpf());
        administrador.cpf = cpf;

        return administrador;

    }
    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public String getNome() {
        return nome.getNome();
    }

    public void setNome(String nome) {
        this.nome.setNome(nome);
    }

    public String getEmail() {
        return email.getEmail();
    }

    public void setEmail(String email) {
        this.email.setEmail(email);
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
        return cpf.getCpf();
    }

    public void setCpf(String cpf) {
        this.cpf.setCpf(cpf);
    }
}
