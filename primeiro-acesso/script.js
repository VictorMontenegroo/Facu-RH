
const emailInput = document.getElementById("email");
const senhaValhaInput = document.getElementById("senhaVelha");
const senhaNovaInput = document.getElementById("senhaNova");
const confirmaSenhaNovaInput = document.getElementById("confirmaSenhaNova");

const classEmail = document.querySelector('.textfield-email');
const classSenha = document.querySelector('.textfield-senha');
const classNovaSenha1= document.querySelector('.textfield-nova-senha1');
const classNovaSenha2= document.querySelector('.textfield-nova-senha2');

const emailInvalido =  document.querySelector(".email-invalido")
const senhaInvalida =  document.querySelector(".senha-invalida")

const senhaInvalida1 =  document.querySelector(".senha-invalida1")
const senhaInvalida2 =  document.querySelector(".senha-invalida2")


function changeClassName() {
    const classRedEmail = document.querySelector('.red-email');
    const classRedSenha = document.querySelector('.red-senha');
    const classRedSenha1 = document.querySelector('.red-senha');
    const classRedSenha2 = document.querySelector('.red-senha');
    
    if (classRedEmail) {
        classRedEmail.classList.remove('red-email');
        classRedEmail.classList.add('textfield-email');
        emailInvalido.style.display = "none"
    } else if (classRedSenha)  {
        classRedSenha.classList.remove('red-senha');
        classRedSenha.classList.add('textfield-senha');
        senhaInvalida.style.display = "none"
    } else if (classRedSenha1) {
        classRedSenha1.classList.remove('red-senha');
        classNovaSenha1.classList.add('textfield-nova-senha1');
        senhaInvalida1.style.display = "none"
    } else if (classRedSenha2) {
        classRedSenha2.classList.remove('red-senha');
        classRedSenha2.classList.add('textfield-nova-senha2');
        senhaInvalida2.style.display = "none"
    }
}

function trocaSenha() {
    const email = emailInput.value
    const senhaVelha = senhaValhaInput.value
    const senhaNova = senhaNovaInput.value
    const confirmaSenhaNova = confirmaSenhaNovaInput.value

    const usuario = JSON.stringify({
        "email": email,
        "senhaVelha": senhaVelha,
        "senhaNova":senhaNova,
        "confirmaNovaSenha":confirmaSenhaNova
    });

    console.log(usuario)

    $.ajax({
        url:"http://localhost:8888/usuarios/primeiro-acesso",
        type:"post",
        data: usuario,
        contentType: "application/json",
    
        success: function(response) {
            if (response.perfil === 'ADMIN') {
                window.location.href = '../home-page/index.html'
            } else {
                window.location.href = '../contratado/home-page/index.html'
            }
            
            
        },
        error: function(response) {
            console.log(response)
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
    } else if (causa === "Não use a mesma senha"){
        classNovaSenha1.classList.remove('textfield-nova-senha1');
        classNovaSenha2.classList.remove('textfield-nova-senha2');
        classNovaSenha1.classList.add('red-senha');
        classNovaSenha2.classList.add('red-senha');
        senhaInvalida1.style.display = "inline"
        senhaInvalida2.style.display = "inline"

        $(".senha-invalida1").text(`${causa}`)
        $(".senha-invalida2").text(`${causa}`)
    
    } else {
        classNovaSenha1.classList.remove('textfield-nova-senha1');
        classNovaSenha2.classList.remove('textfield-nova-senha2');
        classNovaSenha1.classList.add('red-senha');
        classNovaSenha2.classList.add('red-senha');
        senhaInvalida1.style.display = "inline"
        senhaInvalida2.style.display = "inline"
    }
}


$("#bnt-nova-senha").click(trocaSenha);
$("#email").click(changeClassName);
$("#senhaVelha").click(changeClassName);
$("#senhaNova").click(changeClassName);
$("#confirmaSenhaNova").click(changeClassName);
