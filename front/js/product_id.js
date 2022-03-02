let img = document.getElementsByClassName("item__img");

let str= window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");
img[0].innerHTML = `<img src="../images/logo.png" alt="Photographie d'un canapé">`;

