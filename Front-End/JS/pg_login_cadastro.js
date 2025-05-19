 // Função para alternar entre os formulários de login e cadastro
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

        // Função para processar o login
        function fazerLogin(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Aqui você implementaria a lógica de autenticação
            // Por exemplo, enviar para uma API de autenticação
            
            console.log('Tentativa de login com:', email);
            
            // Simulação de login bem-sucedido
            alert('Login realizado com sucesso!');
            window.location.href = 'index.html'; // Redireciona para a página inicial após login
        }

        // Função para processar o cadastro
        function fazerCadastro(event) {
            event.preventDefault();
            const nome = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Validação básica
            if (password !== confirmPassword) {
                alert('As senhas não correspondem.');
                return;
            }
            
            // Aqui você implementaria a lógica para enviar os dados para o servidor
            console.log('Cadastro:', { nome, email });
            
            // Simulação de cadastro bem-sucedido
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'index.html'; // Redireciona para a página inicial após cadastro
        }

        // Funções para login com redes sociais
        function loginSocial(rede) {
            console.log(`Tentativa de login com ${rede}`);
            // Implementar integração com APIs de login social
            alert(`Login com ${rede} iniciado!`);
        }

        function cadastroSocial(rede) {
            console.log(`Tentativa de cadastro com ${rede}`);
            // Implementar integração com APIs de cadastro social
            alert(`Cadastro com ${rede} iniciado!`);
        }

        // Função para aplicar código promocional
        function aplicarCodigo() {
            const codigo = document.querySelector('.promocode-input input').value;
            if (codigo) {
                alert(`Código "${codigo}" aplicado com sucesso!`);
            } else {
                alert('Por favor, insira um código promocional válido.');
            }
        }