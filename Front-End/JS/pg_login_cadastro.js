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

// cadastro
document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const cpf = document.getElementById("reg-cpf").value.trim();
    const telefone = document.getElementById("reg-telefone").value.trim();
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

    console.log({
        nome,
        email,
        cpf,
        telefone,
        senha
    });

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
            console.log("ID do cliente:", idCliente);

            localStorage.setItem('idCliente', idCliente);
            localStorage.setItem('nomeCliente', cliente.nome);
            localStorage.setItem('cpfCliente', cliente.cpf);
            localStorage.setItem('telCliente', cliente.telefone);
            localStorage.setItem('emailCliente', cliente.email);

            window.location.href = "dashboard_cliente.html";
        })
        .catch(error => {
            console.error("Erro ", error.message);
            alert(error.message);
        });
});