let produtos = [];
let produtoEditando = null;

// Função para carregar produtos da API
async function carregarProdutos() {
    try {
        const response = await fetch('http://localhost:8080/produto/listar');
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro HTTP: ${response.status} - ${errorText}`);
        }
        
        const responseText = await response.text();
        if (!responseText || responseText.trim() === '') {
            produtos = [];
            renderizarProdutos(produtos);
            return;
        }
        
        try {
            produtos = JSON.parse(responseText);
            renderizarProdutos(produtos);
        } catch (parseError) {
            console.error('Erro ao fazer parse do JSON:', parseError);
            throw new Error('Resposta do servidor não é um JSON válido');
        }
    } catch (error) {
        console.error('Erro no fetch:', error);
        alert('Não foi possível carregar os produtos. ' + error.message);
    }
}

// Função para renderizar produtos na grid
function renderizarProdutos(produtosParaRenderizar) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    if (produtosParaRenderizar.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1/-1;">Nenhum produto encontrado.</p>';
        return;
    }

    produtosParaRenderizar.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                ${produto.imagemUrl ? 
                    `<img src="${produto.imagemUrl}" alt="${produto.nome}" style="width: 100%; height: 200px; object-fit: cover;">` : 
                    '<div style="width: 100%; height: 200px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #666;">Sem imagem</div>'
                }
            </div>
            <div class="product-info">
                <div class="product-name">${produto.nome}</div>
                <div class="product-price">R$ ${produto.preco.toFixed(2)}</div>
                <div class="product-stock">Estoque: ${produto.estoque || 0}</div>
                <div class="product-description">
                    ${produto.descricao ? produto.descricao.substring(0, 80) + '...' : 'Sem descrição'}
                </div>
                <div class="product-status">
                    <span class="status-badge ${produto.status === 'ativo' ? 'active' : 'inactive'}">
                        ${produto.status || 'ativo'}
                    </span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="editarProduto(${produto.idProduto})">
                        Editar
                    </button>
                    <button class="btn btn-danger" onclick="excluirProduto(${produto.idProduto})">
                        Excluir
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Função for preview da imagem
function previewImagem(input) {
    const preview = document.getElementById('image-preview');
    const file = input.files[0];
    
    if (file) {
        // Validar tipo de arquivo
        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecione apenas arquivos de imagem.');
            input.value = '';
            preview.style.display = 'none';
            return;
        }
        
        // Validar tamanho (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('A imagem deve ter no máximo 5MB.');
            input.value = '';
            preview.style.display = 'none';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 200px; max-height: 200px; object-fit: cover;">`;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none';
    }
}

// Função para abrir modal
function openModal(tipo, produto = null) {
    const modal = document.getElementById('product-modal');
    const title = document.getElementById('modal-title');
    const preview = document.getElementById('image-preview');
    
    if (tipo === 'add-product') {
        title.textContent = 'Adicionar Produto';
        limparFormulario();
        produtoEditando = null;
        preview.style.display = 'none';
    } else if (tipo === 'edit-product') {
        title.textContent = 'Editar Produto';
        preencherFormulario(produto);
        produtoEditando = produto;
        
        // Mostrar imagem atual se existir
        if (produto.imagemUrl) {
            preview.innerHTML = `<img src="${produto.imagemUrl}" alt="Imagem atual" style="max-width: 200px; max-height: 200px; object-fit: cover;">`;
            preview.style.display = 'block';
        } else {
            preview.style.display = 'none';
        }
    }
    
    modal.style.display = 'block';
}

// Função para fechar modal
function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
    limparFormulario();
    produtoEditando = null;
    document.getElementById('image-preview').style.display = 'none';
}

// Função para limpar formulário
function limparFormulario() {
    document.getElementById('product-form').reset();
}

// Função para preencher formulário com dados do produto
function preencherFormulario(produto) {
    document.getElementById('product-name').value = produto.nome || '';
    document.getElementById('product-price').value = produto.preco || '';
    document.getElementById('product-stock').value = produto.estoque || '';
    document.getElementById('product-description').value = produto.descricao || '';
    document.getElementById('product-status').value = produto.status || 'ativo';
    // Campo de imagem é limpo, mas mostramos preview da imagem atual
    document.getElementById('product-image').value = '';
}

// Função para adicionar produto com imagem
async function adicionarProduto(formData) {
    try {
        const response = await fetch('http://localhost:8080/produto/cadastrar', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao adicionar produto: ${response.status} - ${errorText}`);
        }

        const responseText = await response.text();
        alert('Produto cadastrado com sucesso!');
        carregarProdutos();
        return responseText;
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        alert('Erro ao cadastrar produto: ' + error.message);
        throw error;
    }
}

// Função para atualizar produto com imagem
async function atualizarProduto(id, formData) {
    try {
        // Adiciona o ID ao FormData
        formData.append('idProduto', id);

        const response = await fetch(`http://localhost:8080/produto/atualizar`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao atualizar produto: ${response.status} - ${errorText}`);
        }

        const responseText = await response.text();
        alert('Produto atualizado com sucesso!');
        carregarProdutos();
        return responseText;
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        alert('Erro ao atualizar produto: ' + error.message);
        throw error;
    }
}

// Função para editar produto
function editarProduto(id) {
    const produto = produtos.find(p => p.idProduto === id);
    if (produto) {
        openModal('edit-product', produto);
    } else {
        alert('Produto não encontrado!');
    }
}

// Função para excluir produto
async function excluirProduto(id) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/produto/deletar/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao excluir produto: ${response.status} - ${errorText}`);
        }

        alert('Produto excluído com sucesso!');
        carregarProdutos();
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto: ' + error.message);
    }
}

// Função para filtrar produtos
function filtrarProdutos() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value;

    let produtosFiltrados = produtos.filter(produto => {
        const matchesSearch = produto.nome.toLowerCase().includes(searchTerm) ||
                            (produto.descricao && produto.descricao.toLowerCase().includes(searchTerm));

        const matchesStatus = !statusFilter || produto.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    renderizarProdutos(produtosFiltrados);
}

// Event listener para o formulário
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('product-form');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Criar FormData para envio
        const formData = new FormData();
        
        // Adicionar campos do formulário
        formData.append('nome', document.getElementById('product-name').value.trim());
        formData.append('preco', document.getElementById('product-price').value);
        formData.append('estoque', document.getElementById('product-stock').value);
        formData.append('descricao', document.getElementById('product-description').value.trim());
        formData.append('status', document.getElementById('product-status').value);
        
        // Adicionar imagem se foi selecionada
        const imagemInput = document.getElementById('product-image');
        if (imagemInput.files[0]) {
            formData.append('imagem', imagemInput.files[0]);
        }

        // Validação básica
        const nome = formData.get('nome');
        const preco = parseFloat(formData.get('preco'));
        const estoque = parseInt(formData.get('estoque'));
        
        if (!nome || !preco || estoque === null || estoque === undefined) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        if (preco <= 0) {
            alert('O preço deve ser maior que zero!');
            return;
        }

        if (estoque < 0) {
            alert('O estoque não pode ser negativo!');
            return;
        }

        try {
            if (produtoEditando) {
                // Atualizar produto existente
                await atualizarProduto(produtoEditando.idProduto, formData);
            } else {
                // Adicionar novo produto
                await adicionarProduto(formData);
            }
            
            closeModal();
        } catch (error) {
            console.error('Erro no submit:', error);
        }
    });

    // Carregar produtos quando a página carrega
    carregarProdutos();
});

// Função para logout
function logout() {
    if (confirm('Deseja realmente sair?')) {
        window.location.href = 'pg_login_cadastro.html';
    }
}

// Função para exportar produtos
function exportarProdutos() {
    if (produtos.length === 0) {
        alert('Não há produtos para exportar!');
        return;
    }
    
    let csvContent = "Nome,Preço,Estoque,Descrição,Status,URL da Imagem\n";
    produtos.forEach(produto => {
        csvContent += `"${produto.nome}","${produto.preco}","${produto.estoque}","${produto.descricao || ''}","${produto.status}","${produto.imagemUrl || ''}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'produtos.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        closeModal();
    }
}