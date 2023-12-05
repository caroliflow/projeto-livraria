var store_data;

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
