package com.ecommerce.mobzy.application;

import com.ecommerce.mobzy.entities.Cliente;
import com.ecommerce.mobzy.models.ClienteModels;
import com.ecommerce.mobzy.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class ClienteApplication {

    @Autowired
    private ClienteRepository clienteRepository;

    public ResponseEntity<?> cadastrar(ClienteModels clienteModels) {
        try {
            Cliente cliente = Cliente.toCliente(clienteModels);
            cliente.validarDadosObrigatorios();

            clienteRepository.save(clienteModels);

            return ResponseEntity.ok("Cadastrado com sucesso!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            System.out.println("Erro no cadastro: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro inesperado: " + e.getMessage());
        }
    }

    public List listar() {
        return clienteRepository.findAll();
    }

    public ClienteModels buscarPorId(int id) {
        return clienteRepository.findById(id).get();
    }

    public void atualizar(ClienteModels cliente) {
        clienteRepository.save(cliente);
    }

    public void deletar(int id) {
        clienteRepository.deleteById(id);
    }
}
