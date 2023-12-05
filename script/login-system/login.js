const login_form = document.getElementById("login");

// var logged = false;
// var login_type = "";

login_form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputs = event.target.childNodes;

  let email;
  let password;

  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    if (input.id == "email") {
      email = input.value;
    } else if (input.id == "password") {
      password = input.value;
    }
  }

  if (LogIn(email, password)) {
  }
});

function LogIn(email, password) {
  const users = store_data.usuarios;
  let logged = false;

  users.forEach((user) => {
    if (user.email == email || user.password == password) {
      logged = true;
    }
  });

  return logged;
}
