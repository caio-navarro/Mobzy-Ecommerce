// Alterna entre os formulários de login e cadastro
function switchTab(tab) {
    if (tab === 'login') {
        document.getElementById('login-tab').classList.add('active');
        document.getElementById('register-tab').classList.remove('active');
        document.getElementById('login-form').style.display = 'flex';
        document.getElementById('register-form').style.display = 'none';
    } else {
        document.getElementById('login-tab').classList.remove('active');
        document.getElementById('register-tab').classList.add('active');
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'flex';
    }
}

// Máscara para CPF
document.getElementById("reg-cpf").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 11);
    if (value.length >= 9) {
        e.target.value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    } else if (value.length >= 6) {
        e.target.value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else if (value.length >= 3) {
        e.target.value = value.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    } else {
        e.target.value = value;
    }
});

// Máscara para telefone
document.getElementById("reg-telefone").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 11);
    if (value.length > 10) {
        e.target.value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 6) {
        e.target.value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
        e.target.value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    } else {
        e.target.value = value;
    }
});

// cadastro
document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const cpf = document.getElementById("reg-cpf").value.replace(/\D/g, '');
    const telefone = document.getElementById("reg-telefone").value.replace(/\D/g, '');
    const senha = document.getElementById("reg-password").value;
    const confirmarSenha = document.getElementById("confirm-password").value;

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    const cadastroData = {
        nome,
        email,
        cpf,
        telefone,
        senha
    };

    fetch("http://localhost:8080/cliente/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cadastroData)
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(msg => {
                    throw new Error(msg);
                });
            }
            return response.text();
        })
        .then(msg => {
            console.log("Cliente cadastrado:", msg);
            alert("Cadastro realizado com sucesso!");
            window.location.href = "pg_login_cadastro.html"
        })
        .catch(error => {
            console.error("Erro ao cadastrar cliente:", error.message);
            alert("Erro: " + error.message);
        });
});

// login
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("password").value;

    const loginData = {
        email,
        senha
    };

    fetch("http://localhost:8080/cliente/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(msg => {
                throw new Error(msg);
            });
        }
        return response.json();
    })
    .then(cliente => {
        console.log("Login sucesso:", cliente);
        const idCliente = cliente.idCliente;
        const role = cliente.role;
        console.log("ID do cliente:", idCliente);
        console.log("Role:", role);

        // Salvar informações no localStorage
        localStorage.setItem('idCliente', idCliente);
        localStorage.setItem('nomeCliente', cliente.nome);
        localStorage.setItem('cpfCliente', cliente.cpf);
        localStorage.setItem('telCliente', cliente.telefone);
        localStorage.setItem('emailCliente', cliente.email);
        localStorage.setItem('roleCliente', role);

        // Verificar role e redirecionar
        if (role === "admin") {
            window.location.href = "dashboard_adm.html";
        } else {
            window.location.href = "dashboard_cliente.html";
        }
    })
    .catch(error => {
        console.error("Erro ", error.message);
        alert(error.message);
    });
});
