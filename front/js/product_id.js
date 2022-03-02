let url = new URL(window.location.href);

let id = url.searchParams.get("id");
let imgUrl = url.searchParams.get("img");
let name = url.searchParams.get("name");
let description = url.searchParams.get("description");
let price = url.searchParams.get("price");
let colors = url.searchParams.get("colors").split(",");




document.getElementsByClassName("item__img")[0].innerHTML = `<img src="${imgUrl}" alt="Photographie d'un canapé">`;
document.getElementById("title").textContent = name;
document.getElementById("price").textContent = price;
document.getElementById("description").textContent = description;

for(color of colors){
    document.getElementById("colors").innerHTML += `<option value="${color}">${color}</option>` 
}
