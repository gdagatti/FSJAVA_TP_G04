// funcionabilidad para una navbar responsive
let navResponsiveButton = document.getElementById("responsive-button");
let navLinksResponsive = document.getElementById("nav-links-responsive");

navResponsiveButton.addEventListener("click", () => {
  if (navLinksResponsive.style.display == "none")
    navLinksResponsive.style.display = "flex";
  else navLinksResponsive.style.display = "none";
});
