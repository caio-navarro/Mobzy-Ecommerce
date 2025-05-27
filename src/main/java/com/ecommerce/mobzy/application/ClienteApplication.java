package com.ecommerce.mobzy.application;

import com.ecommerce.mobzy.entities.Cliente;
import com.ecommerce.mobzy.models.CarrinhoModels;
import com.ecommerce.mobzy.models.ClienteModels;
import com.ecommerce.mobzy.repositories.CarrinhoRepository;
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

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    public ResponseEntity<?> cadastrar(ClienteModels clienteModels) {
        try {
            Cliente cliente = Cliente.toCliente(clienteModels);
            cliente.validarDadosObrigatorios();

            clienteRepository.save(clienteModels);

            CarrinhoModels carrinho = new CarrinhoModels();
            carrinho.setIdCliente(clienteModels.getIdCliente());
            carrinho.setValorTotal(0.0);

            carrinhoRepository.save(carrinho);

            clienteModels.setIdCarrinho(carrinho.getIdCarrinho());
            clienteModels.setCarrinho(carrinho);
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

    public ResponseEntity<?> login(ClienteModels clienteModels){
        ClienteModels cliente = clienteRepository.findByEmail(clienteModels.getEmail());

        if(cliente == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não encontrado");
        }

        if(!cliente.getSenha().equals(clienteModels.getSenha())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta.");
        }

        return ResponseEntity.ok(cliente);

    }
}
