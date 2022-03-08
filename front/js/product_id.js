/*  Méthode avec toutes les valeurs dans l'url

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

*/

let url = new URL(window.location.href);
let id = url.searchParams.get("id");


fetch("http://localhost:3000/api/products/" + id)
.then( res => {
    if (res.ok) {
        return res.json();
    }else {
        console.log("Une erreur est survenu")
    }
})
.then(data => {

    document.getElementsByClassName("item__img")[0].innerHTML = `<img src="${data.imageUrl}" alt="Photographie d'un canapé">`;
    document.getElementById("title").textContent = data.name;
    document.getElementById("price").textContent = data.price;
    document.getElementById("description").textContent = data.description;
    for(color of data.colors){
        document.getElementById("colors").innerHTML += `<option value="${color}">${color}</option>` 
    }
    document.getElementById("addToCart").addEventListener('click', function(event){
        let quantityValue = document.getElementById("quantity").value;
        let colorValue =  document.getElementById("colors").value;
        elementExist(data, quantityValue, colorValue);
    })
})

document.getElementById("quantity").value = 1; //mise à 1 de la value pour eviter de commander 0 objet

function addToCart(data, quantity, color){
    let tabProduct = [];
    tabProduct.push(data._id, color, quantity);
    localStorage.setItem(data.name + " " + color, JSON.stringify(tabProduct));  
}

function elementExist(data, quantity, color){
    if(quantity == 0 || color == 0){
        alert("Veuillez au moins un élément avec une couleur")
    } else if (localStorage.getItem(data.name + " " + color)) { 
    changeQuantity(data, quantity, color); //l'élement existe déja, on le modifie si besoin
    } else { 
        addToCart(data, quantity, color); // l'élement n'existe pas, on l'ajoute
    }
}

function changeQuantity(data, quantity, color){
    let name = localStorage.getItem(data.name + " " + color);
    let oldQuantity = JSON.parse(name)[2];
    let newQuantity = parseInt(quantity) + parseInt(oldQuantity);
    addToCart(data,newQuantity, color);
}



