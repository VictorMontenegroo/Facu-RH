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


const form = document.getElementById("form");
const username = document.getElementById("username");
const mae = document.getElementById("mae");
const pai = document.getElementById("pai");
const emailInput = document.getElementById("email");
const cpfInput = document.getElementById("cpf");
const rgInput = document.getElementById("rg");
const data = document.getElementById("data");
const cargoInput = document.getElementById("cargo");

form.addEventListener("submit", (e) => {
  console.log("Funcionando")

  e.preventDefault();

  checkInputs();
  
});

function checkInputs() {
  const usernameValue = username.value;
  const maeValue = mae.value;
  const paiValue = pai.value;
  const emailValue = emailInput.value;
  const cpfValue = cpfInput.value;
  const rgValue = rgInput.value;
  const dataValue = data.value.split('-').reverse().join('/');
  const cargoValue = cargoInput.value;

  if (usernameValue === "") {
    setErrorFor(username, "O nome completo é obrigatório.");
  } else {
    setSuccessFor(username);
  }

  if (maeValue === "") {
    setErrorFor(mae, "O nome completo é obrigatório.");
  } else {
    setSuccessFor(mae);
  }

  if (paiValue === "") {
    setErrorFor(pai, "O nome completo é obrigatório.");
  } else {
    setSuccessFor(pai);
  }

  if (emailValue === "") {
    setErrorFor(email, "O email é obrigatório.");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Por favor, insira um email válido.");
  } else {
    setSuccessFor(email);
  }

  if (cpfValue === "") {
    setErrorFor(cpf, "O CPF é obrigatório.");
  } else if (!checkCpf(cpfValue)) {
    setErrorFor(cpf, "Por favor, insira um CPF válido.");
  } else {
    setSuccessFor(cpf);
  }

  if (rgValue === "") {
    setErrorFor(rg, "O RG é obrigatório.");
  } else if (!checkRg(rgValue)) {
    setErrorFor(rg, "Por favor, insira um RG válido.");
  } else {
    setSuccessFor(rg);
  }

  if (dataValue === "") {
    setErrorFor(data, "A data de nasicimento é obrigatória.");
  } else if (!checkData(dataValue)) {
    setErrorFor(data, "Por favor, insira uma Data válida.");
  } else {
    setSuccessFor(data);
  }

  if (cargoValue === "") {
    setErrorFor(cargo, "O seu cargo é obrigatório.");
  } else {
    setSuccessFor(cargo);
  }

  const formControls = form.querySelectorAll(".form-control");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control success";
  });

  if (formIsValid) {
    console.log("O formulário está 100% válido!");
    admitirContratado();
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  // Adiciona a mensagem de erro
  small.innerText = message;

  // Adiciona a classe de erro
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;

  // Adicionar a classe de sucesso
  formControl.className = "form-control success";
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function checkCpf(cpf) {
  return /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/.test(cpf);
}

function checkRg(v) {
  v=v.replace(/\D/g,"");
  if(v.length == 9) v=v.replace(/(\d{2})(\d{3})(\d{3})(\d{1})$/,"$1.$2.$3-$4");
  return v
}

function checkData(data) {
  return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(data);
}

function admitirContratado() {
  const nome = username.value;
  const nomeMae = mae.value;
  const nomePai = pai.value;
  const email = emailInput.value;
  const cpf = cpfInput.value;
  const rg = rgInput.value;
  const dataNascimento = data.value.split('-').reverse().join('/');
  var cargo = cargoInput.value.toUpperCase();

  if (cargo === "SCRUM MASTER") {
    cargo = "SCRUM_MASTER"
  }

  console.log(cargo)
  
  const contratado = JSON.stringify({
    "nome": nome,
    "nomeMae": nomeMae,
    "nomePai":nomePai,
    "email": email,
    "cpf":cpf,
    "registroGeral": rg,
    "dataNascimento": dataNascimento,
    "cargo": cargo
  });

  console.log(contratado)
  
  $.ajax({
    url:"http://localhost:8888/contratados",
    type:"post",
    data: contratado,
    contentType: "application/json",

    success: function(response) {
      window.location.href = "../home-page/index.html"
    }
  })

}
