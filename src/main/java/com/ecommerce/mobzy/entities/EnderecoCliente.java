package com.ecommerce.mobzy.entities;

import com.ecommerce.mobzy.models.EnderecoClienteModels;

public class EnderecoCliente {

    private int idEnderecoCliente;
    private String cep;
    private String logradouro;
    private String bairro;
    private String numero;
    private String cidade;
    private String estado;
    private String complemento;

    public static EnderecoCliente toEndereco(EnderecoClienteModels enderecoModels){
        EnderecoCliente endereco = new EnderecoCliente();

        endereco.setIdEnderecoCliente(enderecoModels.getIdEnderecoCliente());
        endereco.setCep(enderecoModels.getCep());
        endereco.setLogradouro(enderecoModels.getLogradouro());
        endereco.setBairro(enderecoModels.getBairro());
        endereco.setNumero(enderecoModels.getNumero());
        endereco.setCidade(enderecoModels.getCidade());
        endereco.setEstado(enderecoModels.getEstado());

        return endereco;
    }

    public void logradouroIsInvalid() {
        if (logradouro == null || logradouro.trim().isEmpty() || logradouro.length() < 3 || logradouro.length() > 255) {
            throw new IllegalArgumentException("O logradouro deve ter entre 3 e 255 caracteres.");
        }
    }

    public void numeroIsInvalid() {
        if (numero == null || numero.trim().isEmpty()) {
            throw new IllegalArgumentException("O número do endereço é obrigatório.");
        }
    }

    public void cidadeIsInvalid() {
        if (cidade == null || cidade.trim().isEmpty() || cidade.length() < 2 || cidade.length() > 100) {
            throw new IllegalArgumentException("A cidade deve ter entre 2 e 100 caracteres.");
        }
    }

    public void estadoIsInvalid() {
        if (estado == null || estado.trim().isEmpty() || estado.length() != 2) {
            throw new IllegalArgumentException("O estado deve ser uma sigla válida de 2 caracteres.");
        }
    }

    public void cepIsInvalid() {
        String cepRegex = "^\\d{8}$";
        if (cep == null || !cep.matches(cepRegex)) {
            throw new IllegalArgumentException("O CEP deve conter exatamente 8 dígitos numérico");
        }
    }

    public void validar(){
        logradouroIsInvalid();
        numeroIsInvalid();
        cidadeIsInvalid();
        estadoIsInvalid();
        cepIsInvalid();
    }

    public EnderecoCliente() {
    }

    public EnderecoCliente(String bairro, String cep, String cidade, String complemento, String estado, String logradouro, String numero) {
        this.bairro = bairro;
        this.cep = cep;
        this.cidade = cidade;
        this.complemento = complemento;
        this.estado = estado;
        this.logradouro = logradouro;
        this.numero = numero;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
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

    public int getIdEnderecoCliente() {
        return idEnderecoCliente;
    }

    public void setIdEnderecoCliente(int idEnderecoCliente) {
        this.idEnderecoCliente = idEnderecoCliente;
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
}
