function submenu() {
  const items = document.getElementsByClassName("dropdown");

  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", () => {
      items[i].classList.toggle("active");
      items[i].getElementsByClassName("submenu")[0].classList.toggle("active");
    });
  }
}
