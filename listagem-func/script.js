localStorage.clear()

let perfilUser = "";

function consultar() {
    $.ajax({
        url: "http://localhost:8888/contratados",
        type: "get",

        success: function(response) {
            preencherTabela(response);
        },

        error: function(error) {
            alert("Não foi possível consultar os dados, provavelmente servidor não está de pé")
        }
    });
}


function preencherTabela(contratados) {
    console.log($("#tabela tbody tr"))
    console.log(contratados)
    $("#tabela tbody tr").remove();
    $.each(contratados, function(i, contratado) {

      var linkAcao = $("<a href='#'> <i class='bx bx-edit-alt' id='icon-att' ></i>")
        .on('click', event => {
            event.preventDefault();
            pegarPerfil(contratado.matricula)
            atualizar(contratado)

            setTimeout(() => {
              window.location.href = '../atualizar-func/atualizar.html'   
            }, 1000);

        })

        var linha = $("<tr>");
        linha.append(
            $("<td>").text(contratado.matricula),
            $("<td>").text(contratado.nome),
            $("<td>").text(contratado.email),
            $("<td>").text(contratado.cpf),
            $("<td>").text(contratado.cargo),
            $("<td>").text(contratado.dataAdmissao),
            $("<td>").append(linkAcao)
        );
        linha.appendTo("#tabela")
    });
}

function pegarPerfil(matricula) {
  $.ajax({
    url: "http://localhost:8888/usuarios/"+matricula,
    type: "get",

    success: function(response) {
      perfilUser = response.perfil;
      atualizarPerfil(perfilUser)
    },

    error: function(error) {
        alert("Não foi possível consultar os dados, provavelmente servidor não está de pé")
    }
});
}


$("#btn-consultar").click(consultar);

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


