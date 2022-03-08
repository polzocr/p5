//on importe l'url de tous les produits
import {urlAllProducts} from './url/url.js'; 
import {elementExist} from './fonctions/fonctions_products.js';

let url = new URL(window.location.href); // on récupère l'url de la page actuelle
let id = url.searchParams.get("id"); //on recupère l'id de cette page 

//requête GET sur un produit en particulier
fetch(urlAllProducts + id) 
.then( res => {
    if (res.ok) {
        return res.json();
    }else {
        console.log("Une erreur est survenu")
    }
})
.then(data => {
    //on affiche tous les éléments dans le html
    document.getElementsByClassName("item__img")[0].innerHTML = `<img src="${data.imageUrl}" alt="Photographie d'un canapé">`;
    document.getElementById("title").textContent = data.name;
    document.getElementById("price").textContent = data.price;
    document.getElementById("description").textContent = data.description;
    
    for(let color of data.colors){      //boucle for pour afficher toutes les couleurs disponibles
        document.getElementById("colors").innerHTML += `<option value="${color}">${color}</option>` 
    }
    document.getElementById("addToCart").addEventListener('click', function(event){ //on ecoute l'évènement click sur le bouton ajout au panier
        let quantityValue = document.getElementById("quantity").value;              //on créer une variable qui recupère la quantité choisie
        let colorValue =  document.getElementById("colors").value;                  //on créer une variable qui récupère la couleur choisie
        elementExist(data, quantityValue, colorValue);                              //On appelle notre fonction qui va ajouter ces éléments dans le panier et le localStorage
    })
})

document.getElementById("quantity").value = 1; //mise à 1 de la value pour eviter de commander 0 objet




