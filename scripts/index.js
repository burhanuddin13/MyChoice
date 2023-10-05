const cardHeader = document.querySelectorAll("card-header");
const cardContent = document.querySelectorAll("card-content");
const expand = document.getElementsByClassName("expand");
const collapse = document.getElementsByClassName("collapse");

cardHeader.forEach((header, index) => {
  header.addEventListener("click", () => {
    if (cardContent[index].style.display == "block") {
      header.style.borderRadius = "30px 30px 30px 30px";
      cardContent[index].style.display = "none";
      expand[index].style.display = "block";
      collapse[index].style.display = "none";
    } else {
      cardContent[index].style.display = "block";
      header.style.borderRadius = "30px 30px 0px 0px";
      expand[index].style.display = "none";
      collapse[index].style.display = "block";
    }
    if (cardContent[index].style.maxHeight) {
      cardContent[index].style.maxHeight = null;
    } else {
      cardContent[index].style.maxHeight =
        cardContent[index].scrollHeight + "px";
    }
  });
});

const menuLogo = document.querySelector(".menu-logo");
const navPanel = document.querySelector("nav");
menuLogo.addEventListener("click", () => {
  navPanel.style.display = navPanel.style.display == "none" ? "flex" : "none";
})

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((navLink, index) => {
  navLink.addEventListener("click", () => {
    cardContent[index].style.display = "block";
    cardHeader[index].style.borderRadius = "30px 30px 0px 0px";
    expand[index].style.display = "none";
    collapse[index].style.display = "block";
    cardContent[index].style.maxHeight = cardContent[index].scrollHeight + "px";
    navPanel.style.display = "none"
  });
});

document.addEventListener("click", (event) => {
  if (!navPanel.contains(event.target) && !menuLogo.contains(event.target)) {
    navPanel.style.display = "none";
  }
})