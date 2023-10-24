const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");
const sidebarClose = document.querySelector(".collapse_sidebar");
const sidebarExpand = document.querySelector(".expand_sidebar");
sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));

sidebar.addEventListener("mouseenter", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
  }
});
sidebar.addEventListener("mouseleave", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.add("close");
  }
});

darkLight.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    document.setI;
    darkLight.classList.replace("bx-sun", "bx-moon");
  } else {
    darkLight.classList.replace("bx-moon", "bx-sun");
  }
});

submenuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    item.classList.toggle("show_submenu");
    submenuItems.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show_submenu");
      }
    });
  });
});

if (window.innerWidth < 768) {
  sidebar.classList.add("close");
} else {
  sidebar.classList.remove("close");
}


let funcionario = pegar(); 

let inputNome = $("#username")
let inputMae = $("#mae")
let inputPai = $("#pai")
let inputEmail = $("#email")
let inputCargo = $("#cargo")

inputNome.val(funcionario.nome)
inputMae.val(funcionario.nomeMae)
inputPai.val(funcionario.nomePai)
inputEmail.val(funcionario.email)
inputCargo.val(funcionario.cargo)

if (funcionario.perfil !== "ADMIN") {
  inputCargo.prop("disabled", true );
}


form.addEventListener("submit", (e) => {
  console.log("Funcionando")

  e.preventDefault();

  editar()
});


function editar() {

  const funcionarioAtt =  JSON.stringify({
    "nome": inputNome.val(),
    "nomeMae": inputMae.val(),
    "nomePai": inputPai.val(),
    "email": inputEmail.val(),
    "cargo": inputCargo.val().toUpperCase()
  });
  
  $.ajax({
    url: "http://localhost:8888/contratados/"+funcionario.matricula,
    type: "put",
    data: funcionarioAtt,
    contentType: "application/json",

    success: function(response) {
      window.location.href = "../listagem-func/index.html"
    },

    error: function(error) {
        alert("Não foi possível atualizar o contratado!")
    }
});
}