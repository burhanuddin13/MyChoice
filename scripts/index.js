const cardHeader = document.querySelectorAll("card-header");
const cardContent = document.querySelectorAll("card-content");
const expand = document.getElementsByClassName("expand");
const collapse = document.getElementsByClassName("collapse");
const readTime = document.querySelectorAll("read-time");

cardHeader.forEach((header, index) => {
  header.addEventListener("click", () => {
    if (cardContent[index].style.display == "block") {
      header.style.borderRadius = "30px 30px 30px 30px";
      cardContent[index].style.display = "none";
      expand[index].style.display = "block";
      collapse[index].style.display = "none";
      readTime[index].innerText = "";
    } else {
      cardContent[index].style.display = "block";
      header.style.borderRadius = "30px 30px 0px 0px";
      expand[index].style.display = "none";
      collapse[index].style.display = "block";
      readTime[index].innerText = getReadTime(cardContent[index].innerText);
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
    navPanel.style.display = "none";
    readTime[index].innerText = getReadTime(cardContent[index].innerText);
  });
});

document.addEventListener("click", (event) => {
  if (!navPanel.contains(event.target) && !menuLogo.contains(event.target)) {
    navPanel.style.display = "none";
  }
})

const getReadTime = (text) => {
  const wordsPerMinute = 200;
  const numberOfWords = text.split(/\s/g).length;
  const readTime = numberOfWords / wordsPerMinute;
  const minutes = Math.floor(readTime);
  const secondsDecimal = readTime - minutes;
  const seconds = Math.round(secondsDecimal * 60);
  return `${numberOfWords} words | Reading Time: ${minutes} min ${seconds} sec`;
}