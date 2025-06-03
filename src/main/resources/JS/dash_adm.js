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
                ${produto.imagem ? `<img src="${produto.imagem}" alt="${produto.nome}">` : 'Sem imagem'}
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

// Função para abrir modal
function openModal(tipo, produto = null) {
    const modal = document.getElementById('product-modal');
    const title = document.getElementById('modal-title');
    
    if (tipo === 'add-product') {
        title.textContent = 'Adicionar Produto';
        limparFormulario();
        produtoEditando = null;
    } else if (tipo === 'edit-product') {
        title.textContent = 'Editar Produto';
        preencherFormulario(produto);
        produtoEditando = produto;
    }
    
    modal.style.display = 'block';
}

// Função para fechar modal
function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
    limparFormulario();
    produtoEditando = null;
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
}

// Função para adicionar produto
async function adicionarProduto(dadosProduto) {
    try {
        const response = await fetch('http://localhost:8080/produto/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosProduto)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao adicionar produto: ${response.status} - ${errorText}`);
        }

        // Verifica se há conteúdo na resposta antes de tentar fazer parse JSON
        const responseText = await response.text();
        let resultado = null;
        
        if (responseText && responseText.trim() !== '') {
            try {
                resultado = JSON.parse(responseText);
            } catch (parseError) {
                console.warn('Resposta não é JSON válido:', responseText);
                resultado = { message: responseText };
            }
        }

        alert('Produto cadastrado com sucesso!');
        carregarProdutos(); // Recarrega a lista
        return resultado;
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        alert('Erro ao cadastrar produto: ' + error.message);
        throw error;
    }
}

// Função para atualizar produto
async function atualizarProduto(id, dadosProduto) {
    try {
        // Inclui o ID no objeto de dados
        const dadosComId = {
            ...dadosProduto,
            idProduto: id
        };

        const response = await fetch(`http://localhost:8080/produto/atualizar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosComId)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao atualizar produto: ${response.status} - ${errorText}`);
        }

        // Verifica se há conteúdo na resposta antes de tentar fazer parse JSON
        const responseText = await response.text();
        let resultado = null;
        
        if (responseText && responseText.trim() !== '') {
            try {
                resultado = JSON.parse(responseText);
            } catch (parseError) {
                console.warn('Resposta não é JSON válido:', responseText);
                resultado = { message: responseText };
            }
        }

        alert('Produto atualizado com sucesso!');
        carregarProdutos(); // Recarrega a lista
        return resultado;
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

        // Para DELETE, geralmente não esperamos conteúdo na resposta
        alert('Produto excluído com sucesso!');
        carregarProdutos(); // Recarrega a lista
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
        
        // Coleta os dados do formulário
        const formData = {
            nome: document.getElementById('product-name').value.trim(),
            preco: parseFloat(document.getElementById('product-price').value),
            estoque: parseInt(document.getElementById('product-stock').value),
            descricao: document.getElementById('product-description').value.trim(),
            status: document.getElementById('product-status').value
        };

        // Validação básica
        if (!formData.nome || !formData.preco || !formData.estoque) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        if (formData.preco <= 0) {
            alert('O preço deve ser maior que zero!');
            return;
        }

        if (formData.estoque < 0) {
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
            // Erro já tratado nas funções específicas
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
    
    // Criar CSV simples
    let csvContent = "Nome,Preço,Estoque,Descrição,Status\n";
    produtos.forEach(produto => {
        csvContent += `"${produto.nome}","${produto.preco}","${produto.estoque}","${produto.descricao || ''}","${produto.status}"\n`;
    });
    
    // Download do arquivo
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

// Função para importar produtos
function importarProdutos() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const csv = e.target.result;
                const lines = csv.split('\n');
                const headers = lines[0].split(',');
                
                // Processar cada linha (exceto header)
                for (let i = 1; i < lines.length; i++) {
                    if (lines[i].trim()) {
                        const values = lines[i].split(',');
                        const produto = {
                            nome: values[0]?.replace(/"/g, ''),
                            preco: parseFloat(values[1]?.replace(/"/g, '')),
                            estoque: parseInt(values[2]?.replace(/"/g, '')),
                            descricao: values[3]?.replace(/"/g, ''),
                            status: values[4]?.replace(/"/g, '') || 'ativo'
                        };
                        
                        if (produto.nome && produto.preco && produto.estoque >= 0) {
                            adicionarProduto(produto);
                        }
                    }
                }
                
                alert('Importação concluída!');
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        closeModal();
    }
}