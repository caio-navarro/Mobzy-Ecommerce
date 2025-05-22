package com.ecommerce.mobzy.entities;

import com.ecommerce.mobzy.entities.SubEntities.Cpf;
import com.ecommerce.mobzy.entities.SubEntities.Email;
import com.ecommerce.mobzy.entities.SubEntities.Nome;
import com.ecommerce.mobzy.entities.SubEntities.Telefone;
import com.ecommerce.mobzy.models.ClienteModels;
import java.util.Date;

public class Cliente {

    private int idCliente;
    private Nome nome = new Nome();
    private Date dataNascimento;
    private Email email = new Email();
    private Telefone telefone = new Telefone();
    private Cpf cpf = new Cpf();

    public static Cliente toCliente(ClienteModels clienteModels){
        Cliente cliente = new Cliente();

        cliente.setIdCliente(cliente.getIdCliente());

        Nome nome = new Nome();
        nome.setNome(cliente.getNome());
        cliente.nome = nome;

        cliente.setDataNascimento(cliente.getDataNascimento());

        Email email = new Email();
        cliente.setEmail(cliente.getEmail());
        cliente.email = email;

        Telefone telefone = new Telefone();
        cliente.setTelefone(cliente.getTelefone());
        cliente.telefone = telefone;

        Cpf cpf = new Cpf();
        cliente.setCpf(cliente.getCpf());
        cliente.cpf = cpf;

        return cliente;
    }



    public String getCpf() {
        return cpf.getCpf();
    }

    public void setCpf(String cpf) {
        this.cpf.setCpf(cpf);
    }

    public Date getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getEmail() {
        return email.getEmail();
    }

    public void setEmail(String email) {
        this.email.setEmail(email);
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

    public String getTelefone() {
        return telefone.getTelefone();
    }

    public void setTelefone(String telefone) {
        this.telefone.setTelefone(telefone);
    }
}