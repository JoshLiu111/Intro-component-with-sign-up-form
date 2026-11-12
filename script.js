const form = document.querySelector("#signup-form");
const successMsg = document.querySelector("#signup-success");
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const rules = {
  firstName: [[(v) => v !== "", "First Name cannot be empty"]],
  lastName: [[(v) => v !== "", "Last Name cannot be empty"]],
  email: [
    [(v) => v !== "", "Email Address cannot be empty"],
    [isEmail, "Looks like this is not an email"],
  ],
  password: [
    [(v) => v !== "", "Password cannot be empty"],
    [
      (v) => v.length >= 8 && /\d/.test(v),
      "Password must be at least 8 characters and include a number",
    ],
  ],
};

function validate(value, list) {
  for (const [test, message] of list) {
    if (!test(value)) return message;
  }
  return "";
}

function validateField(input) {
  const error = validate(input.value.trim(), rules[input.name]);
  const errorMsg = document.getElementById(
    input.getAttribute("aria-describedby"),
  );
  errorMsg.textContent = error;
  errorMsg.hidden = !error;
  input.setAttribute("aria-invalid", String(Boolean(error)));
  return !error;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fields = [...form.elements].filter((el) => el.name);
  const allOk = fields.map(validateField).every(Boolean);
  if (!allOk) {
    successMsg.hidden = true;
    const firstInvalid = fields.find(
      (el) => el.getAttribute("aria-invalid") === "true",
    );
    firstInvalid.focus();
    return;
  }

  successMsg.textContent =
    "Welcome aboard! Check your inbox to start your free trial.";
  successMsg.hidden = false;
  form.reset();
});

form.addEventListener("input", (e) => {
  const input = e.target;
  input.setAttribute("aria-invalid", "false");
  document.getElementById(input.getAttribute("aria-describedby")).hidden = true;
  successMsg.hidden = true;
});
