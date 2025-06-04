package com.ecommerce.mobzy.application;

import com.ecommerce.mobzy.models.ProdutoModels;
import com.ecommerce.mobzy.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Component
public class ProdutoApplication {

    @Autowired
    private ProdutoRepository produtoRepository;

    private static final String DIRETORIO_IMAGENS = "src/main/resources/static/images/produtos/";
    private static final String URL_BASE_IMAGENS = "http://localhost:8080/images/produtos/";

    public ProdutoModels cadastrar(ProdutoModels produto) {
        return produtoRepository.save(produto);
    }

    public List<ProdutoModels> listar() {
        return produtoRepository.findAll();
    }

    public void atualizar(ProdutoModels produto) {
        produtoRepository.save(produto);
    }

    public ProdutoModels buscarPorId(int id) {
        return produtoRepository.findById(id).orElse(null);
    }

    public void deletar(int id) {
        produtoRepository.deleteById(id);
    }

    public String salvarImagem(MultipartFile imagem) {
        try {
            if (imagem == null || imagem.isEmpty()) {
                throw new RuntimeException("Arquivo de imagem não fornecido");
            }
            
            String contentType = imagem.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new RuntimeException("Arquivo deve ser uma imagem");
            }
            
            if (imagem.getSize() > 5 * 1024 * 1024) {
                throw new RuntimeException("Imagem deve ter no máximo 5MB");
            }
            
            criarDiretorioSeNaoExistir();
            
            String extensao = obterExtensaoArquivo(imagem.getOriginalFilename());
            String nomeArquivo = System.currentTimeMillis() + "-" + 
                                System.nanoTime() + "." + extensao;
            
            Path caminhoArquivo = Paths.get(DIRETORIO_IMAGENS + nomeArquivo);
            
            Files.copy(imagem.getInputStream(), caminhoArquivo);
            
            return URL_BASE_IMAGENS + nomeArquivo;
            
        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar arquivo: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Erro inesperado ao salvar imagem: " + e.getMessage(), e);
        }
    }
    
    public void removerImagem(String imagemUrl) {
        try {
            if (imagemUrl != null && imagemUrl.startsWith(URL_BASE_IMAGENS)) {
                String nomeArquivo = imagemUrl.replace(URL_BASE_IMAGENS, "");
                Path caminhoArquivo = Paths.get(DIRETORIO_IMAGENS + nomeArquivo);
                
                if (Files.exists(caminhoArquivo)) {
                    Files.delete(caminhoArquivo);
                }
            }
        } catch (IOException e) {
            System.err.println("Erro ao remover imagem: " + e.getMessage());
        }
    }
    
    private void criarDiretorioSeNaoExistir() {
        try {
            Path diretorio = Paths.get(DIRETORIO_IMAGENS);
            if (!Files.exists(diretorio)) {
                Files.createDirectories(diretorio);
            }
        } catch (IOException e) {
            throw new RuntimeException("Erro ao criar diretório de imagens", e);
        }
    }
    
    private String obterExtensaoArquivo(String nomeArquivo) {
        if (nomeArquivo == null || !nomeArquivo.contains(".")) {
            return "jpg"; // extensão padrão
        }
        return nomeArquivo.substring(nomeArquivo.lastIndexOf(".") + 1).toLowerCase();
    }
}