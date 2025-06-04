// Variável global para armazenar produtos
let produtos = [];

async function carregarProdutos() {
    try {
        const response = await fetch('http://localhost:8080/produto/listar');
        if (!response.ok) {
            throw new Error('Erro HTTP: ' + response.status);
        }
        produtos = await response.json();

        const grid = document.getElementById('products-grid');
        grid.innerHTML = '';

        // Filtrar apenas produtos ativos
        const produtosAtivos = produtos.filter(produto => {
            // Verifica se o produto está ativo (considera 'ativo' ou ausência do campo status como ativo)
            return !produto.status || produto.status === 'ativo';
        });

        produtosAtivos.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.onclick = () => abrirDetalheProduto(produto.idProduto);
            card.innerHTML = `
                <div class="product-image">
                    ${produto.imagemUrl ? 
                        `<img src="${produto.imagemUrl}" alt="${produto.nome}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">` : 
                        '<div style="width: 100%; height: 200px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #666; border-radius: 8px;">Sem imagem</div>'
                    }
                </div>
                <div class="product-info">
                    <div class="product-name">${produto.nome}</div>
                    <div class="product-price">R$ ${produto.preco.toFixed(2)}</div>
                    <div style="font-size: 14px; color: #666; margin-block-end: 10px;">
                        ${produto.descricao ? produto.descricao.substring(0, 80) + '...' : 'Sem descrição'}
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary" onclick="event.stopPropagation(); adicionarAoCarrinho(${produto.idProduto})">
                            Adicionar ao Carrinho
                        </button>
                        <button class="btn btn-secondary" onclick="event.stopPropagation(); abrirDetalheProduto(${produto.idProduto})">
                            Ver Detalhes
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Erro no fetch:', error);
        alert('Não foi possível carregar os produtos. ' + error.message);
    }
}

// Função para mostrar seções
function showSection(sectionName) {
    // Ocultar todas as seções
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Remover classe active de todos os nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Mostrar seção selecionada
    document.getElementById(sectionName + '-section').classList.add('active');

    // Adicionar classe active ao nav link correspondente
    if (sectionName !== 'carrinho') {
        const targetLink = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }
    }
}

// Função para filtrar produtos
function filtrarProdutos() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const priceFilter = document.getElementById('price-filter').value;

    let produtosFiltrados = produtos.filter(produto => {
        // Verifica se o produto está ativo - condição mais rigorosa
        if (produto.status && produto.status !== 'ativo') return false;

        const matchesSearch = produto.nome.toLowerCase().includes(searchTerm);

        let matchesPrice = true;
        if (priceFilter) {
            const price = produto.preco;
            switch (priceFilter) {
                case '0-50':
                    matchesPrice = price <= 50;
                    break;
                case '50-100':
                    matchesPrice = price > 50 && price <= 100;
                    break;
                case '100-200':
                    matchesPrice = price > 100 && price <= 200;
                    break;
                case '200+':
                    matchesPrice = price > 200;
                    break;
            }
        }

        return matchesSearch && matchesPrice;
    });

    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    produtosFiltrados.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => abrirDetalheProduto(produto.idProduto);
        card.innerHTML = `
            <div class="product-image">
                ${produto.imagemUrl ? 
                    `<img src="${produto.imagemUrl}" alt="${produto.nome}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">` : 
                    '<div style="width: 100%; height: 200px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #666; border-radius: 8px;">Sem imagem</div>'
                }
            </div>
            <div class="product-info">
                <div class="product-name">${produto.nome}</div>
                <div class="product-price">R$ ${produto.preco.toFixed(2)}</div>
                <div style="font-size: 14px; color: #666; margin-block-end: 10px;">
                    ${produto.descricao ? produto.descricao.substring(0, 80) + '...' : 'Sem descrição'}
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); adicionarAoCarrinho(${produto.idProduto})">
                        Adicionar ao Carrinho
                    </button>
                    <button class="btn btn-secondary" onclick="event.stopPropagation(); abrirDetalheProduto(${produto.idProduto})">
                        Ver Detalhes
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Função para abrir detalhes do produto
function abrirDetalheProduto(produtoId) {
    const produto = produtos.find(p => p.idProduto === produtoId); 
    if (!produto) {
        console.error('Produto não encontrado:', produtoId);
        alert('Produto não encontrado!');
        return;
    }

    // Verificação adicional de segurança para produtos inativos
    if (produto.status && produto.status !== 'ativo') {
        console.warn('Tentativa de acessar produto inativo:', produtoId);
        alert('Este produto não está mais disponível!');
        return;
    }

    document.getElementById('modal-product-name').textContent = produto.nome;

    const modalContent = document.getElementById('modal-product-content');
    modalContent.innerHTML = `
        <div class="product-detail-image">
            ${produto.imagemUrl ? 
                `<img src="${produto.imagemUrl}" alt="${produto.nome}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">` : 
                '<div style="width: 100%; height: 300px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #666; border-radius: 8px; margin-bottom: 20px;">Sem imagem disponível</div>'
            }
        </div>
        <div style="margin-block-end: 20px;">
            <div class="product-price" style="font-size: 24px; margin-block-end: 10px;">R$ ${produto.preco.toFixed(2)}</div>
            <p style="color: #666; line-height: 1.6;">${produto.descricao || 'Sem descrição disponível'}</p>
        </div>
        
        <div style="text-align: center; margin-block-start: 30px;">
            <button class="btn btn-primary" style="padding: 15px 30px; font-size: 16px;" onclick="adicionarAoCarrinho(${produto.idProduto})">
                Adicionar ao Carrinho
            </button>
        </div>
    `;

    document.getElementById('product-modal').style.display = 'block';
}

// Função para fechar modal
function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

// ============== FUNÇÕES DE FORMATAÇÃO ==============

// Função para formatar CPF enquanto digita (apenas visual)
function formatarCPF(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não é número
    
    // Limita a 11 dígitos
    valor = valor.substring(0, 11);
    
    // Aplica a máscara: 000.000.000-00
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3}\.\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3}\.\d{3}\.\d{3})(\d{2})/, '$1-$2');
    
    input.value = valor;
}

// Função para formatar telefone enquanto digita (apenas visual)
function formatarTelefone(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não é número
    
    // Limita a 11 dígitos (celular) ou 10 dígitos (fixo)
    valor = valor.substring(0, 11);
    
    // Aplica a máscara baseada na quantidade de dígitos
    if (valor.length <= 10) {
        // Telefone fixo: (00) 0000-0000
        valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
        valor = valor.replace(/(\(\d{2}\) \d{4})(\d)/, '$1-$2');
    } else {
        // Celular: (00) 00000-0000
        valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
        valor = valor.replace(/(\(\d{2}\) \d{5})(\d)/, '$1-$2');
    }
    
    input.value = valor;
}

// Função para obter apenas números do CPF
function obterCPFLimpo(cpfFormatado) {
    return cpfFormatado.replace(/\D/g, '');
}

// Função para obter apenas números do telefone
function obterTelefoneLimpo(telefoneFormatado) {
    return telefoneFormatado.replace(/\D/g, '');
}

// Função para formatar CPF para exibição (recebe números, retorna formatado)
function formatarCPFParaExibicao(cpfNumeros) {
    if (!cpfNumeros || cpfNumeros.length !== 11) return cpfNumeros;
    
    return cpfNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Função para formatar telefone para exibição (recebe números, retorna formatado)
function formatarTelefoneParaExibicao(telefoneNumeros) {
    if (!telefoneNumeros) return telefoneNumeros;
    
    if (telefoneNumeros.length === 10) {
        // Telefone fixo: (00) 0000-0000
        return telefoneNumeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (telefoneNumeros.length === 11) {
        // Celular: (00) 00000-0000
        return telefoneNumeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    
    return telefoneNumeros;
}

// Função para formatar CEP enquanto digita
function formatarCEP(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    valor = valor.replace(/^(\d{5})(\d)/, '$1-$2'); // Adiciona hífen após 5 dígitos
    input.value = valor;
}

// ============== FUNÇÃO SALVAR PERFIL ATUALIZADA ==============

// Função para salvar perfil - VERSÃO ATUALIZADA com formatação
async function salvarPerfil(event) {
    event.preventDefault();

    const idCliente = localStorage.getItem('idCliente');
    if (!idCliente) {
        alert('Erro: ID do cliente não encontrado. Faça login novamente.');
        return;
    }

    // Verificar se o usuário quer alterar a senha
    const senhaAtual = document.getElementById('senha-atual').value.trim();
    const novaSenha = document.getElementById('nova-senha').value.trim();
    const confirmarSenha = document.getElementById('confirmar-senha').value.trim();

    // Se algum campo de senha foi preenchido, validar todos
    if (senhaAtual || novaSenha || confirmarSenha) {
        if (!senhaAtual) {
            alert('Para alterar a senha, você deve informar a senha atual.');
            return;
        }
        if (!novaSenha) {
            alert('Digite a nova senha.');
            return;
        }
        if (novaSenha !== confirmarSenha) {
            alert('A confirmação da senha não confere.');
            return;
        }
        if (novaSenha.length < 6) {
            alert('A nova senha deve ter pelo menos 6 caracteres.');
            return;
        }
    }

    // Validações básicas dos dados obrigatórios
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefoneFormatado = document.getElementById('telefone').value.trim();
    
    // CONVERTER TELEFONE PARA APENAS NÚMEROS
    const telefone = obterTelefoneLimpo(telefoneFormatado);

    if (!nome || !email || !telefone) {
        alert('Por favor, preencha todos os campos obrigatórios (Nome, E-mail e Telefone).');
        return;
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    if (telefone.length < 10 || telefone.length > 11) {
        alert('Por favor, insira um telefone válido.');
        return;
    }

    try {
        const botaoSalvar = document.querySelector('#profile-form button[type="submit"]');
        const textoOriginal = botaoSalvar.innerHTML;
        botaoSalvar.innerHTML = 'Salvando...';
        botaoSalvar.disabled = true;

        console.log('Buscando dados atuais do cliente...');
        const responseAtual = await fetch(`http://localhost:8080/cliente/buscar/${idCliente}`);

        let clienteAtual = {};
        if (responseAtual.ok) {
            const responseText = await responseAtual.text();
            if (responseText.trim()) {
                try {
                    clienteAtual = JSON.parse(responseText);
                    console.log('Dados atuais encontrados:', { ...clienteAtual, senha: '[OCULTA]' });
                } catch (e) {
                    console.warn('Erro ao fazer parse dos dados atuais:', e);
                }
            }
        } else {
            console.warn('Não foi possível buscar dados atuais do cliente');
        }

        const dadosEndereco = {
            idCliente: parseInt(idCliente),
            cep: document.getElementById('cep').value.replace(/\D/g, ''),
            logradouro: document.getElementById('rua').value.trim(),
            bairro: document.getElementById('bairro').value.trim(),
            numero: document.getElementById('numero').value.trim(),
            cidade: document.getElementById('cidade').value.trim(),
            complemento: document.getElementById('complemento').value.trim()
        };

        let idEnderecoCliente = clienteAtual.idEnderecoCliente || null;

        if (dadosEndereco.cep || dadosEndereco.logradouro) {
            console.log('Criando/atualizando endereço:', dadosEndereco);

            const responseEndereco = await fetch('http://localhost:8080/endereco-cliente/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosEndereco)
            });

            if (!responseEndereco.ok) {
                let errorMessage = `Erro ao salvar endereço: ${responseEndereco.status}`;
                try {
                    const errorData = await responseEndereco.json();
                    errorMessage = `Erro ao salvar endereço: ${errorData.message || responseEndereco.status}`;
                } catch (e) {
                    console.warn('Erro ao fazer parse do JSON de erro do endereço:', e);
                }
                throw new Error(errorMessage);
            }

            const responseEnderecoText = await responseEndereco.text();
            if (responseEnderecoText.trim()) {
                try {
                    const resultadoEndereco = JSON.parse(responseEnderecoText);
                    idEnderecoCliente = resultadoEndereco.idEnderecoCliente || resultadoEndereco.id || idEnderecoCliente;
                } catch (e) {
                    console.warn('Resposta do endereço não é um JSON válido:', responseEnderecoText);
                }
            }
            console.log('Endereço processado com ID:', idEnderecoCliente);
        }

        const cpfFormatado = document.getElementById('cpf').value.trim();
        const cpfLimpo = obterCPFLimpo(cpfFormatado); 

        const dadosCliente = {
            idCliente: parseInt(idCliente),
            nome: nome,
            email: email,
            telefone: telefone, 
            cpf: cpfLimpo,
            senha: novaSenha || clienteAtual.senha || undefined
        };

        if (idEnderecoCliente) {
            dadosCliente.idEnderecoCliente = idEnderecoCliente;
        }

        Object.keys(dadosCliente).forEach(key => {
            if (dadosCliente[key] === undefined) {
                delete dadosCliente[key];
            }
        });

        console.log('Dados do cliente a serem enviados:', { ...dadosCliente, senha: '[OCULTA]' });

        const responseCliente = await fetch('http://localhost:8080/cliente/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosCliente)
        });

        if (!responseCliente.ok) {
            let errorMessage = `Erro HTTP: ${responseCliente.status}`;
            try {
                const errorData = await responseCliente.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                console.warn('Erro ao fazer parse do JSON de erro do cliente:', e);
            }
            throw new Error(errorMessage);
        }

        const responseClienteText = await responseCliente.text();
        let resultadoCliente = {};

        if (responseClienteText.trim()) {
            try {
                resultadoCliente = JSON.parse(responseClienteText);
            } catch (e) {
                console.warn('Resposta do cliente não é um JSON válido:', responseClienteText);
                resultadoCliente = { message: 'Cliente atualizado com sucesso' };
            }
        } else {
            resultadoCliente = { message: 'Cliente atualizado com sucesso' };
        }

        console.log('Cliente atualizado com sucesso');

        localStorage.setItem('nomeCliente', dadosCliente.nome);
        localStorage.setItem('emailCliente', dadosCliente.email);
        localStorage.setItem('telCliente', dadosCliente.telefone);
        localStorage.setItem('cpfCliente', dadosCliente.cpf); 
        localStorage.setItem('cepCliente', dadosEndereco.cep);
        localStorage.setItem('bairroCliente', dadosEndereco.bairro);
        localStorage.setItem('cidadeCliente', dadosEndereco.cidade);
        localStorage.setItem('ruaCliente', dadosEndereco.logradouro);
        localStorage.setItem('numeroCliente', dadosEndereco.numero);
        localStorage.setItem('complementoCliente', dadosEndereco.complemento);

        document.getElementById('senha-atual').value = '';
        document.getElementById('nova-senha').value = '';
        document.getElementById('confirmar-senha').value = '';

        alert('Perfil atualizado com sucesso!');

        botaoSalvar.innerHTML = textoOriginal;
        botaoSalvar.disabled = false;

    } catch (error) {
        console.error('Erro ao salvar perfil:', error);
        alert('Erro ao salvar perfil: ' + error.message);

        const botaoSalvar = document.querySelector('#profile-form button[type="submit"]');
        botaoSalvar.innerHTML = 'Salvar Alterações';
        botaoSalvar.disabled = false;
    }
}

async function buscarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); 

    if (cep.length !== 8) {
        return; 
    }

    try {
        const campos = ['rua', 'bairro', 'cidade'];
        campos.forEach(campo => {
            document.getElementById(campo).value = 'Buscando...';
            document.getElementById(campo).disabled = true;
        });

        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            alert('CEP não encontrado!');
            limparCamposEndereco();
            return;
        }

        document.getElementById('rua').value = data.logradouro || '';
        document.getElementById('bairro').value = data.bairro || '';
        document.getElementById('cidade').value = data.localidade || '';

        campos.forEach(campo => {
            document.getElementById(campo).disabled = false;
        });

        if (data.logradouro) {
            document.getElementById('numero').focus();
        }

    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        alert('Erro ao buscar CEP. Tente novamente.');
        limparCamposEndereco();
    }
}

// Função para limpar campos de endereço
function limparCamposEndereco() {
    const campos = ['rua', 'bairro', 'cidade'];
    campos.forEach(campo => {
        document.getElementById(campo).value = '';
        document.getElementById(campo).disabled = false;
    });
}

// Função de logout
function logout() {
    if (confirm('Deseja realmente sair?')) {
        window.location.href = 'index.html';
    }
}

// Fechar modal ao clicar fora dele
window.onclick = function (event) {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        closeModal();
    }
}


// Inicialização 
document.addEventListener('DOMContentLoaded', function () {
    carregarProdutos();

    const idCliente = localStorage.getItem('idCliente');
    const nomeCliente = localStorage.getItem('nomeCliente');
    const emailCliente = localStorage.getItem('emailCliente');
    const telCliente = localStorage.getItem('telCliente');
    const cpfCliente = localStorage.getItem('cpfCliente');
    const cepCliente = localStorage.getItem('cepCliente');
    const ruaCliente = localStorage.getItem('ruaCliente');
    const bairroCliente = localStorage.getItem('bairroCliente');
    const cidadeCliente = localStorage.getItem('cidadeCliente');
    const complementoCliente = localStorage.getItem('complementoCliente');
    const numeroCliente = localStorage.getItem('numeroCliente');

    if (nomeCliente) document.getElementById("nome").value = nomeCliente;
    if (emailCliente) document.getElementById("email").value = emailCliente;

    if (telCliente) {
        document.getElementById("telefone").value = formatarTelefoneParaExibicao(telCliente);
    }
 
    if (cpfCliente) {
        document.getElementById("cpf").value = formatarCPFParaExibicao(cpfCliente);
    }
    
    if (cepCliente) document.getElementById("cep").value = cepCliente;
    if (numeroCliente) document.getElementById("numero").value = numeroCliente;
    if (ruaCliente) document.getElementById("rua").value = ruaCliente;
    if (bairroCliente) document.getElementById("bairro").value = bairroCliente;
    if (cidadeCliente) document.getElementById("cidade").value = cidadeCliente;
    if (complementoCliente) document.getElementById("complemento").value = complementoCliente;

    if (!idCliente) {
        console.warn('ID do cliente não encontrado no localStorage');
    }
});

function adicionarAoCarrinho(produtoId) {
    console.log('Adicionar ao carrinho produto ID:', produtoId);
    alert('Funcionalidade do carrinho ainda não implementada');
}

// Variável global para armazenar itens do carrinho
let carrinho = [];

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.idProduto === produtoId);
    if (!produto) {
        alert('Produto não encontrado!');
        return;
    }

    // Verificar se o produto já está no carrinho
    const itemExistente = carrinho.find(item => item.produto.idProduto === produtoId);
    
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            produto: produto,
            quantidade: 1
        });
    }

    atualizarContadorCarrinho();
    mostrarNotificacao(`${produto.nome} adicionado ao carrinho!`);
    
    console.log('Carrinho atualizado:', carrinho);
}

// Função para remover produto do carrinho
function removerDoCarrinho(produtoId) {
    const index = carrinho.findIndex(item => item.produto.idProduto === produtoId);
    if (index > -1) {
        carrinho.splice(index, 1);
        atualizarContadorCarrinho();
        carregarCarrinho();
    }
}

// Função para alterar quantidade de um item no carrinho
function alterarQuantidade(produtoId, novaQuantidade) {
    const item = carrinho.find(item => item.produto.idProduto === produtoId);
    if (item) {
        if (novaQuantidade <= 0) {
            removerDoCarrinho(produtoId);
        } else {
            item.quantidade = novaQuantidade;
            atualizarContadorCarrinho();
            carregarCarrinho();
        }
    }
}

// Função para atualizar contador do carrinho
function atualizarContadorCarrinho() {
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    document.getElementById('cart-count').textContent = totalItens;
}

// Função para calcular total do carrinho
function calcularTotalCarrinho() {
    return carrinho.reduce((total, item) => total + (item.produto.preco * item.quantidade), 0);
}

// Função para carregar itens do carrinho na interface
function carregarCarrinho() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (carrinho.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Seu carrinho está vazio</h3>
                <p>Adicione produtos para continuar comprando</p>
                <button class="btn btn-primary" onclick="showSection('produtos')">
                    Ver Produtos
                </button>
            </div>
        `;
        cartTotal.style.display = 'none';
        return;
    }

    let cartHTML = '';
    carrinho.forEach(item => {
        const subtotal = item.produto.preco * item.quantidade;
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-image">
                    ${item.produto.imagemUrl ? 
                        `<img src="${item.produto.imagemUrl}" alt="${item.produto.nome}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">` : 
                        '<div class="no-image" style="width: 80px; height: 80px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #666; border-radius: 8px; font-size: 12px;">Sem imagem</div>'
                    }
                </div>
                <div class="cart-item-details">
                    <h4>${item.produto.nome}</h4>
                    <p class="cart-item-price">R$ ${item.produto.preco.toFixed(2)}</p>
                    <p class="cart-item-description">
                        ${item.produto.descricao ? item.produto.descricao.substring(0, 60) + '...' : 'Sem descrição'}
                    </p>
                </div>
                <div class="cart-item-quantity">
                    <label>Quantidade:</label>
                    <div class="quantity-controls">
                        <button onclick="alterarQuantidade(${item.produto.idProduto}, ${item.quantidade - 1})" 
                                class="quantity-btn">-</button>
                        <span class="quantity-display">${item.quantidade}</span>
                        <button onclick="alterarQuantidade(${item.produto.idProduto}, ${item.quantidade + 1})" 
                                class="quantity-btn">+</button>
                    </div>
                </div>
                <div class="cart-item-subtotal">
                    <p><strong>R$ ${subtotal.toFixed(2)}</strong></p>
                    <button onclick="removerDoCarrinho(${item.produto.idProduto})" 
                            class="btn btn-danger btn-small">
                        Remover
                    </button>
                </div>
            </div>
        `;
    });

    cartItems.innerHTML = cartHTML;
    
    // Mostrar total
    const total = calcularTotalCarrinho();
    document.getElementById('total-amount').textContent = total.toFixed(2);
    cartTotal.style.display = 'block';
}

// Função para mostrar notificação
function mostrarNotificacao(mensagem) {
    // Criar elemento de notificação
    const notificacao = document.createElement('div');
    notificacao.className = 'notification';
    notificacao.textContent = mensagem;
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notificacao);
    
    // Animar entrada
    setTimeout(() => {
        notificacao.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notificacao.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notificacao.parentNode) {
                notificacao.parentNode.removeChild(notificacao);
            }
        }, 300);
    }, 3000);
}

// Função para finalizar compra (placeholder)
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    const total = calcularTotalCarrinho();
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    
    alert(`Compra finalizada!\nItens: ${totalItens}\nTotal: R$ ${total.toFixed(2)}\n\nFuncionalidade de pagamento ainda não implementada.`);
}

// Modificar a função showSection para carregar o carrinho quando necessário
function showSection(sectionName) {
    // Ocultar todas as seções
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Remover classe active de todos os nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Mostrar seção selecionada
    document.getElementById(sectionName + '-section').classList.add('active');

    // Adicionar classe active ao nav link correspondente
    if (sectionName !== 'carrinho') {
        const targetLink = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }
    }

    // Carregar carrinho se a seção carrinho foi selecionada
    if (sectionName === 'carrinho') {
        carregarCarrinho();
    }
}