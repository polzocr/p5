import {urlAllProducts} from './url/url.js';
import {firstNameRegex, lastNameRegex, addressRegex, cityRegex, emailRegex} from './utils/regex.js'; 
import {deleteCart, deleteStorage} from './fonctions/fonctions_delete.js';
import {totalPrice} from './fonctions/fonctions_price.js';
import {changeQuantityCartInHTML, changeQuantityCartInStorage} from './fonctions/fonctions_change.js';
import {validateItemForm, validateForm} from './fonctions/fonctions_form.js';

// Initialisation de certaines variables 
let tabQuantity = [];     
let cartPrice = []; 
let sumQuantity = 0;     

/*
On va faire une boucle sur chaque élément du panier( dans le localStorage) : 
    - on va récuperer la couleur et la quantité et l'id 
    - on fait ensuite une requete GET pour récupérer les données relatives à cet élément et les afficher
    - on creer un évenement qui ecoute le changement de quantité
    - on créer un évenement qui écoute la suppression d'un élément
*/

for(let i = 0; i < localStorage.length; i++){

    let color = localStorage.key(i).split(" ")[2];  //recupère la couleur de l'élément
    let getInfo = JSON.parse(localStorage.getItem(localStorage.key(i))); //recupère l'élément du panier
    let id = getInfo[0];    //recupère l'id de l'élement
    let quantity = getInfo[2]; //recupère la quantité de l'élément
    tabQuantity.push(quantity); //on insère cette quantité dans un tableau
    
    
 /*
Requête GET pour afficher les données de chaque produits puis 
ajouter à ces produits un évènement qui change la quantité et un autre 
qui gère la suppression d'un produit
 */   
    fetch(urlAllProducts + id)
    .then(res => {
        if(res.ok) {
            return res.json();
        }else {
            console.log("Une erreur est survenue")
        }
    })
    .then(data => {
        
        cartPrice.push(data.price); //on met le prix de chaque élement dans un tableau
        
        document.getElementById("cart__items").innerHTML += `   <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                                                                    <div class="cart__item__img">
                                                                        <img src="${data.imageUrl}" alt="Photographie d'un canapé">
                                                                    </div>
                                                                    <div class="cart__item__content">
                                                                        <div class="cart__item__content__description">
                                                                            <h2>${data.name}</h2>
                                                                            <p>${color}</p>
                                                                            <p>${data.price*quantity} €</p>
                                                                        </div>
                                                                        <div class="cart__item__content__settings">
                                                                            <div class="cart__item__content__settings__quantity">
                                                                                <p>Qté : </p>
                                                                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                                                                            </div>
                                                                            <div class="cart__item__content__settings__delete">
                                                                            <p class="deleteItem">Supprimer</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </article> `

             
        totalPrice();           // Affichage du prix total du panier


        let deleteButton = document.getElementsByClassName("deleteItem"); // variable qui recupère les boutons supprimer
        for(let i = 0; i < deleteButton.length; i ++){                    //evenement ajouter à chaque bouton
            deleteButton[i].addEventListener("click", function(e){
                deleteCart(this);   //supprimer le HTML
                //supprimer le panier
                deleteStorage(this.parentNode.parentNode.parentElement.childNodes[0].nextElementSibling.firstChild.nextElementSibling.innerHTML+ " " + this.parentNode.parentNode.parentElement.childNodes[0].nextElementSibling.firstChild.nextElementSibling.nextElementSibling.innerHTML);
                deleteTotalQuantity(i); //change la quantité totale d'articles
                totalPrice();           //affiche le prix total du panier
        })
        }
        
        let oldQuantity = document.querySelectorAll(".cart__item__content__settings__quantity input"); // variable qui recupère toutes les quantités
        for(let i = 0; i < oldQuantity.length; i++ ){           //evenement ajouter à chaque changement de quantité
            oldQuantity[i].addEventListener("change", function(event){
                if(event.target.value == 0){                    //si la quantité est passé à zero -> erreur
                    alert("Veuillez supprimer l'élement");
                    event.target.value = this.getAttribute("value");    //on remet la quantité a comment elle était avant l'erreur
                } else {
                    changeQuantityCartInHTML(this);     //change la value dans le HTML
                    changeQuantityCartInStorage(this);  // change la quantité dans le panier en localStorage
                    changePriceCart(this, i);           // change le prix afficher par rapport au nombre d'éléments
                    changeTotalQuantity(i);             //change la quantité totale d'articles
                    totalPrice()                        //change le prix total
                }
               
            })
        }
        
    })   
}
  

totalQuantity();        // Recuperation de la quantité totale 
totalQuantityHTML();    // Affichage de cette quantité dans le HTML  


//on trouve la quantité totale d'article
function totalQuantity(){
    for(let tab of tabQuantity){
        if(tab){
        sumQuantity += parseInt(tab); //pour chaque produit, on ajoute sa quantité
        }
    }
}
//affichage quantité totale d'article dans le HTML
function totalQuantityHTML(){
    document.getElementById("totalQuantity").textContent = sumQuantity;
}

//change la quantité totale apres suppression
function deleteTotalQuantity(index){
    delete tabQuantity[index]; //supprime notre élément du tableau des quantités
    sumQuantity = 0;           //on reajuste la variable de la somme
    totalQuantity();            //on recalcule la somme
    totalQuantityHTML();        //on affiche cette nouvelle somme
}

// change la quantité totale apres que l'utilisateur la modifie
function changeTotalQuantity(index){
    tabQuantity[index] = event.target.value; //notre element devient la valeur de l'input
    sumQuantity = 0;
    totalQuantity();
    totalQuantityHTML();
}

//on change l'affichage du prix dans le panier lorsqu'on change la quantité
function changePriceCart(element, index){
    element.parentElement.parentElement.previousElementSibling.children[2].textContent = (event.target.value)*cartPrice[index] + " €";
}




/*==============================================================

ON PASSE AU NIVEAU DU FORMULAIRE 

==============================================================*/

validateItemForm("firstName", "Un prenom", firstNameRegex);
validateItemForm("lastName", "Un nom de famille", lastNameRegex);
validateItemForm("address", "Une adresse", addressRegex);
validateItemForm("city", "Une ville", cityRegex );
validateItemForm("email", "Un e-mail", emailRegex );
validateForm();









   

               












