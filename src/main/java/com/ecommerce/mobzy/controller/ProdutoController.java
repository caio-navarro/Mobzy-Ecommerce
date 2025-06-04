package com.ecommerce.mobzy.controller;

import com.ecommerce.mobzy.application.ProdutoApplication;
import com.ecommerce.mobzy.models.ProdutoModels;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/produto")
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private ProdutoApplication produtoApplication;

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar(
            @RequestParam("nome") String nome,
            @RequestParam("preco") double preco,
            @RequestParam("estoque") int estoque,
            @RequestParam("descricao") String descricao,
            @RequestParam("status") String status,
            @RequestParam(value = "imagem", required = false) MultipartFile imagem) {
        
        try {
            ProdutoModels produto = new ProdutoModels();
            produto.setNome(nome);
            produto.setPreco(preco);
            produto.setEstoque(estoque);
            produto.setDescricao(descricao);
            produto.setStatus(status);
            
            if (imagem != null && !imagem.isEmpty()) {
                String imagemUrl = produtoApplication.salvarImagem(imagem);
                produto.setImagemUrl(imagemUrl);
            }
            
            produtoApplication.cadastrar(produto);
            return ResponseEntity.ok("Produto cadastrado com sucesso!");
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao cadastrar produto: " + e.getMessage());
        }
    }

    @PutMapping("/atualizar")
    public ResponseEntity<String> atualizar(
            @RequestParam("idProduto") int idProduto,
            @RequestParam("nome") String nome,
            @RequestParam("preco") double preco,
            @RequestParam("estoque") int estoque,
            @RequestParam("descricao") String descricao,
            @RequestParam("status") String status,
            @RequestParam(value = "imagem", required = false) MultipartFile imagem) {
        
        try {
            ProdutoModels produto = produtoApplication.buscarPorId(idProduto);
            
            if (produto == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Produto não encontrado!");
            }
            
            produto.setNome(nome);
            produto.setPreco(preco);
            produto.setEstoque(estoque);
            produto.setDescricao(descricao);
            produto.setStatus(status);
            
            if (imagem != null && !imagem.isEmpty()) {
                String imagemUrl = produtoApplication.salvarImagem(imagem);
                produto.setImagemUrl(imagemUrl);
            }
            
            produtoApplication.atualizar(produto);
            return ResponseEntity.ok("Produto atualizado com sucesso!");
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao atualizar produto: " + e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ProdutoModels>> listar() {
        try {
            List<ProdutoModels> produtos = produtoApplication.listar();
            return ResponseEntity.ok(produtos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletar(@PathVariable int id) {
        try {
            ProdutoModels produto = produtoApplication.buscarPorId(id);
            if (produto == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Produto não encontrado!");
            }
 
            if (produto.getImagemUrl() != null && !produto.getImagemUrl().isEmpty()) {
                produtoApplication.removerImagem(produto.getImagemUrl());
            }
            
            produtoApplication.deletar(id);
            return ResponseEntity.ok("Produto excluído com sucesso!");
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao excluir produto: " + e.getMessage());
        }
    }
}