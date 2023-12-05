var store_data;

const login_form = document.getElementById("login");

var logged = false;
var login_type = "";

document.getElementById("store-data").addEventListener("change", (event) => {
  const file = event.target.files[0];
  console.log(file);

  const reader = new FileReader();
  reader.onload = function (event) {
    const content = event.target.result;
    store_data = JSON.parse(content);
  };

  reader.readAsText(file);
});

login_form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputs = event.target.childNodes;

  let email;
  let password;

  inputs.forEach((input) => {
    if (input.id === "email") {
      email = input.value;
    } else if (input.id === "password") {
      password = input.value;
    }
  });
});

function LogIn(email, password) {
  const users = store_data.usuarios;
  users.forEach((user) => {
    if (user.email == email || user.password == password) {
      logged = true;
      login_type = user.tipo;
    } else {
      console.log("Coudldn't log In");
    }
  });
}

function getInformation(data) {
  const test = document.getElementById("test");
  data.usuarios.forEach((user) => {
    test.innerHTML += `
      <p>
        <strong>Nome: </strong>${user.nome} </br>
        <strong>Email: </strong>${user.email} </br>
        <strong>Senha: </strong>${user.senha} </br>
        <strong>Cargo: </strong>${user.cargo} </br>
        <strong>Tipo: </strong>${user.tipo}
      </p>
    `;
  });
}
