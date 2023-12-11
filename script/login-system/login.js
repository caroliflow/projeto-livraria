const login_form = document.getElementById("login");

const auth = {
  EMAIL: "",
  PASSWORD: "",
  TYPE: "",
};

login_form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputs = event.target.childNodes;

  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    if (input.id == "email") {
      auth["EMAIL"] = input.value;
    } else if (input.id == "password") {
      auth["PASSWORD"] = input.value;
    }
  }
});

function LogIn(email, password) {
  const users = store_data.users;
  let logged = false;

  users.forEach((user) => {
    if (user.email == email || user.password == password) {
      logged = true;
    }
  });

  return logged;
}
