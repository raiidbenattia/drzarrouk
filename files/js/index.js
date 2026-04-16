function toggleMenu() {
  document.querySelector(".nav-menu").classList.toggle("show");
}

// Close dropdown if clicked outside
let menu = document.querySelector(".w-nav-button");
menu.onclick = function (event) {
  let dropdown = document.querySelector(".nav-menu");
  if (dropdown.classList.contains("show")) {
    dropdown.classList.remove("show");
  } else {
    dropdown.classList.add("show");
  }
};
