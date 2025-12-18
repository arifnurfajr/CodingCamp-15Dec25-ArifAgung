// ===== NAV TOGGLE (MOBILE) =====
const navToggleBtn = document.querySelector(".nav__toggle");
const nav = document.querySelector(".nav");

if (navToggleBtn && nav) {
  navToggleBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav--open");
    navToggleBtn.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu after clicking a nav link (mobile UX)
  nav.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.tagName === "A") {
      nav.classList.remove("nav--open");
      navToggleBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Close menu when clicking outside nav (mobile UX)
  document.addEventListener("click", (e) => {
    const clickedInsideNav = nav.contains(e.target);
    const clickedToggle = navToggleBtn.contains(e.target);
    if (!clickedInsideNav && !clickedToggle) {
      nav.classList.remove("nav--open");
      navToggleBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// ===== FORM + VALIDATION + OUTPUT + GREETING =====
const form = document.getElementById("messageForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("messageText");

const errorName = document.getElementById("errorName");
const errorEmail = document.getElementById("errorEmail");
const errorPhone = document.getElementById("errorPhone");
const errorMessage = document.getElementById("errorMessage");

const outTime = document.getElementById("outTime");
const outName = document.getElementById("outName");
const outEmail = document.getElementById("outEmail");
const outPhone = document.getElementById("outPhone");
const outMessage = document.getElementById("outMessage");

const displayName = document.getElementById("displayName");

function clearErrors() {
  if (errorName) errorName.textContent = "";
  if (errorEmail) errorEmail.textContent = "";
  if (errorPhone) errorPhone.textContent = "";
  if (errorMessage) errorMessage.textContent = "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function phoneDigitsOnly(phone) {
  return /^\d+$/.test(phone);
}

function phoneLengthValid(phone) {
  return phone.length >= 10 && phone.length <= 13;
}

function setOutput({ name, email, phone, message }) {
  const now = new Date();
  if (outTime) outTime.textContent = now.toLocaleString();
  if (outName) outName.textContent = name;
  if (outEmail) outEmail.textContent = email;
  if (outPhone) outPhone.textContent = phone;
  if (outMessage) outMessage.textContent = message;
}

function updateGreeting(name) {
  if (displayName) displayName.textContent = name;
}

function attachLiveClear(inputEl, errorEl) {
  if (!inputEl || !errorEl) return;
  inputEl.addEventListener("input", () => {
    errorEl.textContent = "";
  });
}

attachLiveClear(nameInput, errorName);
attachLiveClear(emailInput, errorEmail);
attachLiveClear(phoneInput, errorPhone);
attachLiveClear(messageInput, errorMessage);

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    const name = (nameInput?.value || "").trim();
    const email = (emailInput?.value || "").trim();
    const phone = (phoneInput?.value || "").trim();
    const message = (messageInput?.value || "").trim();

    let isValid = true;

    if (!name) {
      if (errorName) errorName.textContent = "Name is required";
      isValid = false;
    }

    if (!email) {
      if (errorEmail) errorEmail.textContent = "Email is required";
      isValid = false;
    } else if (!isValidEmail(email)) {
      if (errorEmail) errorEmail.textContent = "Email format is not valid";
      isValid = false;
    }

    if (!phone) {
      if (errorPhone) errorPhone.textContent = "Phone number is required";
      isValid = false;
    } else if (!phoneDigitsOnly(phone)) {
      if (errorPhone) errorPhone.textContent = "Phone must contain digits only";
      isValid = false;
    } else if (!phoneLengthValid(phone)) {
      if (errorPhone) errorPhone.textContent = "Phone must be 10–13 digits";
      isValid = false;
    }

    if (!message) {
      if (errorMessage) errorMessage.textContent = "Message is required";
      isValid = false;
    }

    if (!isValid) return;

    setOutput({ name, email, phone, message });
    updateGreeting(name);

    form.reset();
  });
}
