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

// Função para salvar perfil - CORRIGIDA para manter a senha
// Função para salvar perfil - VERSÃO SEGURA que preserva a senha
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
    const telefone = document.getElementById('telefone').value.trim();

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

    try {
        const botaoSalvar = document.querySelector('#profile-form button[type="submit"]');
        const textoOriginal = botaoSalvar.innerHTML;
        botaoSalvar.innerHTML = 'Salvando...';
        botaoSalvar.disabled = true;

        // PASSO 1: Buscar dados atuais do cliente para preservar campos não alterados
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

        // PASSO 2: Processar endereço
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

        // Criar/atualizar endereço se houver dados
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

        // PASSO 3: Montar dados do cliente preservando campos existentes
        const dadosCliente = {
            idCliente: parseInt(idCliente),
            nome: nome,
            email: email,
            telefone: telefone,
            cpf: document.getElementById('cpf').value.trim(),
            // PRESERVAR senha atual se não for alterada
            senha: novaSenha || clienteAtual.senha || undefined
        };

        // Adicionar ID do endereço
        if (idEnderecoCliente) {
            dadosCliente.idEnderecoCliente = idEnderecoCliente;
        }

        // Remover campos undefined para não enviar ao backend
        Object.keys(dadosCliente).forEach(key => {
            if (dadosCliente[key] === undefined) {
                delete dadosCliente[key];
            }
        });

        // PASSO 4: Atualizar cliente
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

        // Atualizar localStorage
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

        // Limpar campos de senha após salvamento bem-sucedido
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

// Função para buscar CEP
async function buscarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length !== 8) {
        return; // CEP deve ter exatamente 8 dígitos
    }

    try {
        // Mostrar loading (opcional)
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

        // Preencher os campos com os dados retornados
        document.getElementById('rua').value = data.logradouro || '';
        document.getElementById('bairro').value = data.bairro || '';
        document.getElementById('cidade').value = data.localidade || '';

        // Habilitar os campos novamente
        campos.forEach(campo => {
            document.getElementById(campo).disabled = false;
        });

        // Focar no campo número se a rua foi preenchida
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

// Função para formatar CEP enquanto digita
function formatarCEP(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não é número
    valor = valor.replace(/^(\d{5})(\d)/, '$1-$2'); // Adiciona hífen após 5 dígitos
    input.value = valor;
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

    // Carregar dados do perfil
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

    // Verificar se há dados salvos e preencher os campos
    if (nomeCliente) document.getElementById("nome").value = nomeCliente;
    if (emailCliente) document.getElementById("email").value = emailCliente;
    if (telCliente) document.getElementById("telefone").value = telCliente;
    if (cpfCliente) document.getElementById("cpf").value = cpfCliente;
    if (cepCliente) document.getElementById("cep").value = cepCliente;
    if (numeroCliente) document.getElementById("numero").value = numeroCliente;
    if (ruaCliente) document.getElementById("rua").value = ruaCliente;
    if (bairroCliente) document.getElementById("bairro").value = bairroCliente;
    if (cidadeCliente) document.getElementById("cidade").value = cidadeCliente;
    if (complementoCliente) document.getElementById("complemento").value = complementoCliente;

    // Se não houver ID do cliente, pode ser necessário fazer login novamente
    if (!idCliente) {
        console.warn('ID do cliente não encontrado no localStorage');
    }
});

// Placeholder functions for cart functionality
function adicionarAoCarrinho(produtoId) {
    // TODO: Implementar funcionalidade do carrinho
    console.log('Adicionar ao carrinho produto ID:', produtoId);
    alert('Funcionalidade do carrinho ainda não implementada');
}

function finalizarCompra() {
    // TODO: Implementar funcionalidade de finalização da compra
    console.log('Finalizar compra');
    alert('Funcionalidade de finalização da compra ainda não implementada');
}