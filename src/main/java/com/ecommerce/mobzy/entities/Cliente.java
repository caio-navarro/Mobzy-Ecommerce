package com.ecommerce.mobzy.entities;

import com.ecommerce.mobzy.models.ClienteModels;
import java.util.Date;

public class Cliente {

    private int idCliente;
    private String nome;
    private Date dataNascimento;
    private String email;
    private String telefone;
    private String cpf;

    public static Cliente toCliente(ClienteModels clienteModels){
        Cliente cliente = new Cliente();

        cliente.setIdCliente(cliente.getIdCliente());
        cliente.setNome(cliente.getNome());
        cliente.setDataNascimento(cliente.getDataNascimento());
        cliente.setEmail(cliente.getEmail());
        cliente.setTelefone(cliente.getTelefone());
        cliente.setCpf(cliente.getCpf());

        return cliente;
    }

    public boolean isCpfValido() {
        if (cpf == null || cpf.length() != 11 || !cpf.matches("\\d+")) {
            return false;
        }
        int[] peso1 = {10, 9, 8, 7, 6, 5, 4, 3, 2};
        int[] peso2 = {11, 10, 9, 8, 7, 6, 5, 4, 3, 2};

        try {
            int soma1 = 0, soma2 = 0;
            for (int i = 0; i < 9; i++) {
                int digito = Character.getNumericValue(cpf.charAt(i));
                soma1 += digito * peso1[i];
                soma2 += digito * peso2[i];
            }

            int digito1 = 11 - (soma1 % 11);
            digito1 = (digito1 > 9) ? 0 : digito1;

            soma2 += digito1 * peso2[9];
            int digito2 = 11 - (soma2 % 11);
            digito2 = (digito2 > 9) ? 0 : digito2;

            return digito1 == Character.getNumericValue(cpf.charAt(9)) &&
                    digito2 == Character.getNumericValue(cpf.charAt(10));
        } catch (Exception e) {
            return false;
        }
    }

    public void verificaEmail() {
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email não pode ser nulo ou vazio");
        }
        if (!email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            throw new IllegalArgumentException("Email inválido");
        }
    }

    public void verificaTelefone() {
        if (telefone == null || telefone.trim().isEmpty()) {
            throw new IllegalArgumentException("O campo 'telefone' é obrigatório e não pode estar vazio.");
        }
        if (!telefone.matches("^\\(?\\d{2}\\)?[-.\\s]?\\d{4,5}[-.\\s]?\\d{4}$")) {
            throw new IllegalArgumentException("O telefone deve estar no formato válido, como (XX)XXXXX-XXXX ou XX-XXXXX-XXXX.");
        }
    }

    public void validar() {
        verificaEmail();
        verificaTelefone();
        if (!isCpfValido()) throw new IllegalArgumentException("CPF inválido.");
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Date getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
}