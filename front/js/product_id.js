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
        elementExist(data);
    })
})


function addToCart(data, quantity){
    let tabProduct = [];
    tabProduct.push(data._id, document.getElementById("colors").value, quantity);
    localStorage.setItem(data.name + " " + document.getElementById("colors").value, JSON.stringify(tabProduct));  

}

function elementExist(data){
    if(localStorage.getItem(data.name + " " + document.getElementById("colors").value)) {
        console.log("l'élément existe déja");
        changeQuantity(data);
    } else {
        console.log("l'élément n'existe pas");
        addToCart(data, document.getElementById("quantity").value);
    }
}

function changeQuantity(data){
    let name = localStorage.getItem(data.name + " " + document.getElementById("colors").value);
    let oldQuantity = JSON.parse(name)[2];
    let newQuantity = parseInt(document.getElementById("quantity").value) + parseInt(oldQuantity);
    console.log(newQuantity);
    addToCart(data,newQuantity);


  
}



