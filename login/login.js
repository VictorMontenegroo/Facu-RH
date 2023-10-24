
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");

const classEmail = document.querySelector('.textfield-email');
const classSenha = document.querySelector('.textfield-senha');

const emailInvalido =  document.querySelector(".email-invalido")
const senhaInvalida =  document.querySelector(".senha-invalida")


function changeClassName() {
    const classRedEmail = document.querySelector('.red-email');
    const classRedSenha = document.querySelector('.red-senha');
    
    if (classRedEmail) {
        classRedEmail.classList.remove('red-email');
        classRedEmail.classList.add('textfield-email');
        emailInvalido.style.display = "none"
    } else if (classRedSenha)  {
        classRedSenha.classList.remove('red-senha');
        classRedSenha.classList.add('textfield-senha');
        senhaInvalida.style.display = "none"
    }
}


function login() {
    const email = emailInput.value
    const senha = senhaInput.value

    const usuario = JSON.stringify({
        "email": email,
        "senha": senha
    });

    $.ajax({
        url:"http://localhost:8888/usuarios/login",
        type:"post",
        data: usuario,
        contentType: "application/json",
    
        success: function(response) {
            console.log("response")
            if(response.primeiroAcesso) {
                window.location.href = '../primeiro-acesso/index.html'
            } else {
                if (response.perfil === 'ADMIN') {
                    window.location.href = '../home-page/index.html'
                } else {
                    window.location.href = '../contratado/home-page/index.html'
                }
                
            }
            
        },

        error: function(response) {
            validaResponse(response.responseJSON.causa);
        }
      })
}

function validaResponse(causa) {
    if (causa === "Email inválido") {
        classEmail.classList.remove('textfield-email');
        classEmail.classList.add('red-email');
        emailInvalido.style.display = "inline"
        
    }
    if (causa === "Senha inválida") {
        classSenha.classList.remove('textfield-senha');
        classSenha.classList.add('red-senha');
        senhaInvalida.style.display = "inline"
    }
}


$("#bnt-login").click(login);
$("#email").click(changeClassName);
$("#senha").click(changeClassName);
