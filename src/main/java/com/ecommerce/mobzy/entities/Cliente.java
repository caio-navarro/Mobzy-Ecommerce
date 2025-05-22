package com.ecommerce.mobzy.entities;

import com.ecommerce.mobzy.models.CarrinhoModels;
import com.ecommerce.mobzy.models.ClienteModels;
import com.ecommerce.mobzy.models.EnderecoClienteModels;
import java.time.LocalDate;

public class Cliente {

    private int idCliente;
    private String nome;
    private LocalDate dataNascimento;
    private String email;
    private String telefone;
    private String cpf;
    private String senha;
    private Integer idEnderecoCliente;
    private EnderecoClienteModels enderecoCliente;
    private Integer idCarrinho;
    private CarrinhoModels carrinho;

    public static Cliente toCliente(ClienteModels clienteModels) {
        Cliente cliente = new Cliente();

        cliente.setIdCliente(clienteModels.getIdCliente());
        cliente.setNome(clienteModels.getNome());
        cliente.setDataNascimento(clienteModels.getDataNascimento());
        cliente.setEmail(clienteModels.getEmail());
        cliente.setTelefone(clienteModels.getTelefone());
        cliente.setCpf(clienteModels.getCpf());
        cliente.setSenha(clienteModels.getSenha());
        cliente.setIdEnderecoCliente(clienteModels.getIdEnderecoCliente());
        cliente.setEnderecoCliente(clienteModels.getEnderecoCliente());
        cliente.setIdCarrinho(clienteModels.getIdCarrinho());
        cliente.setCarrinho(clienteModels.getCarrinho());

        return cliente;
    }

    public Integer getIdCarrinho() {
        return idCarrinho;
    }

    public void setIdCarrinho(Integer idCarrinho) {
        this.idCarrinho = idCarrinho;
    }

    public CarrinhoModels getCarrinho() {
        return carrinho;
    }

    public void setCarrinho(CarrinhoModels carrinho) {
        this.carrinho = carrinho;
    }

    public boolean isCpfValido() {
        if (cpf == null || cpf.length() != 11 || !cpf.matches("\\d+")) {
            return false;
        }
        int[] peso1 = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
        int[] peso2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };

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
        if (!telefone.matches("^\\(?\\d{2}\\)?[-.\\s]?\\d{4,5}[-.\\s]?\\d{4}$")) {
            throw new IllegalArgumentException(
                    "O telefone deve estar no formato válido, como (XX)XXXXX-XXXX ou XX-XXXXX-XXXX.");
        }
    }

    public void validarCompleto() {
        verificaEmail();
        verificaTelefone();
        if (!isCpfValido())
            throw new IllegalArgumentException("CPF inválido.");
    }

    public void validarDadosObrigatorios() {
        if (nome == null || nome.trim().isEmpty()) {
            throw new IllegalArgumentException("Nome é obrigatório.");
        }
        if (senha == null || senha.trim().isEmpty()) {
            throw new IllegalArgumentException("Senha é obrigatória.");
        }
        verificaEmail();
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
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

    public EnderecoClienteModels getEnderecoCliente() {
        return enderecoCliente;
    }

    public void setEnderecoCliente(EnderecoClienteModels enderecoCliente) {
        this.enderecoCliente = enderecoCliente;
    }

    public Integer getIdEnderecoCliente() {
        return idEnderecoCliente;
    }

    public void setIdEnderecoCliente(Integer idEnderecoCliente) {
        this.idEnderecoCliente = idEnderecoCliente;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}