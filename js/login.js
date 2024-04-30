'use strict';

const form = document.getElementById('loginForm');

form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    validarLogin();
});

async function validarLogin(){
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    console.log(email);

    if(email === '' || senha === ''){
        alert('Preencha todos os campos');
        return false;
    }

    try{
        const users = await fetch('https://back-login.vercel.app/usuarios');

        const listUsers = await users.json();

        let validaUsuario = false;

        listUsers.forEach((user)=>{
            if(email === user.email && senha === user.senha){
                alert('Usuário encontrado com sucesso!');
                localStorage.setItem("id", user.id);
                localStorage.setItem("nome", user.email);
                window.location.href = '../html/telaInicial.html';
                validaUsuario = true;
            }
        });

        if(!validaUsuario){
            alert('Usuário não encontrado.');
        }

    } catch(error){
        alert('Erro ao acessar a API');
        console.error(error);
    }
}