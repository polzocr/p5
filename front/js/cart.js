import {Contact} from './contact.js';
import {urlAllProducts} from './url/url.js';
import {firstNameRegex, lastNameRegex, addressRegex, cityRegex, emailRegex} from './utils/regex.js'; 

// Initialisation de certaines variables 
let tabQuantity = [];   
let sumQuantity = 0;    
let tabPrice = [];      
let sumPrice = 0;       
let cartPrice = [];     

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
  
totalPrice();           // Affichage du prix total du panier
totalQuantity();        // Recuperation de la quantité totale 
totalQuantityHTML();    // Affichage de cette quantité dans le HTML  



function deleteCart(element) {
    element.closest("article").remove();
}

function deleteStorage(name){
    localStorage.removeItem(name);
}


function changeQuantityCartInHTML(element){
    element.setAttribute("value", event.target.value);
}

function changeQuantityCartInStorage(element){
    let nameCart = element.parentElement.parentElement.previousElementSibling.children[0].innerHTML + " " + element.parentElement.parentElement.previousElementSibling.children[1].innerHTML
    let findElementStorage = localStorage.getItem(nameCart);
    let findQuantity = JSON.parse(findElementStorage);
    findQuantity[2] = event.target.value;
    localStorage.setItem(nameCart, JSON.stringify(findQuantity));
}


function changePriceCart(element, index){
    /*if( document.querySelectorAll(".cart__item__content__description")[index]) {
        document.querySelectorAll(".cart__item__content__description")[index].querySelectorAll("p")[1].textContent = (event.target.value)*cartPrice[index] + " €";
    }*/
    element.parentElement.parentElement.previousElementSibling.children[2].textContent = (event.target.value)*cartPrice[index] + " €";
}

function totalQuantity(){
    for(let tab of tabQuantity){
        if(tab){
        sumQuantity += parseInt(tab);
        }
    }
}

function totalQuantityHTML(){
    document.getElementById("totalQuantity").textContent = sumQuantity;
}

function changeTotalQuantity(index){
    tabQuantity[index] = event.target.value;
    sumQuantity = 0;
    totalQuantity();
    totalQuantityHTML();
}

function deleteTotalQuantity(index){
    delete tabQuantity[index];
    sumQuantity = 0;
    totalQuantity();
    totalQuantityHTML();
}





function setTotalPrice(data, quantity){
    
    tabPrice.push(data*quantity); 
    let totalPrice= 0;
    for(let tab of tabPrice){
        totalPrice += tab;
    } 
    document.getElementById("totalPrice").textContent = totalPrice;
}



function changeTotalPrice(index){
    console.log(tabPrice);
    tabPrice[index]= cartPrice[index]* event.target.value ;
    console.log(tabPrice)
    let totalPrice = 0;
    for(tab of tabPrice){
        totalPrice += tab;
    } 
    document.getElementById("totalPrice").textContent = totalPrice;    
}

function changeTotalPrice2(element, index){
    tabPrice[index] = JSON.parse(element.parentElement.parentElement.previousElementSibling.children[2].textContent.split(" ")[0]);  
    document.getElementById("totalPrice").textContent = tabPrice; 
}

function totalPrice(){
    let elements = document.getElementsByClassName("cart__item__content__description");
    let totalPrice = 0;
    for(let element of elements){
        totalPrice += JSON.parse(element.getElementsByTagName("p")[1].textContent.split(" ")[0]);
        
    }
    document.getElementById("totalPrice").textContent = totalPrice;
}














function isEmpty(){
    let inputs = document.querySelectorAll(".cart__order__form__question input");
    for(let input of inputs){
        if(input.value == ""){
            return true;
        }
    }
}


function validateItemForm(name, nameFrench, regex){
    document.getElementById(name).addEventListener("input", function(event){
        let value = event.target.value;
        if(value !== "" && regex.test(value)){
            document.getElementById( name + "ErrorMsg").textContent = "";
        } else {
            document.getElementById(name + "ErrorMsg").textContent = nameFrench + " valide doit être renseigné";
        }
    })
}


function notValid(value, regex){
    if(value !== "" && regex.test(value)){
        return false;
    } else {
        return true;
    }
}

function validateForm(){
    document.querySelector(".cart__order form").addEventListener("submit", function(event){
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let address = document.getElementById("address").value;
        let city = document.getElementById("city").value;
        let email = document.getElementById("email").value;
        if(localStorage.length == 0){
            event.preventDefault();
            alert("Votre panier est vide");
        } else if(notValid(firstName, firstNameRegex) || notValid(lastName, lastNameRegex) || notValid(address, addressRegex) || notValid(city, cityRegex) || notValid(email, emailRegex) || isEmpty()){
            event.preventDefault();
        } else {
            event.preventDefault();
            const contact = new Contact(firstName,lastName,address,city,email);
            let products = [];
            for (let i = 0; i < localStorage.length; i++){
                let idProduct = JSON.parse(localStorage.getItem(localStorage.key(i)))[0];
                products.push(idProduct);
            }
            
            send({contact, products});
        }
    })
}


function send(value) {
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
        //let url = new URL("http://127.0.0.1:5500/front/html/confirmation.html");
        //url.searchParams.append("orderId", value.orderId);
        //window.location.href= url;
        localStorage.clear();
        window.location.href="./confirmation.html?orderId="+value.orderId
    });
  }


validateItemForm("firstName", "Un prenom", firstNameRegex);
validateItemForm("lastName", "Un nom de famille", lastNameRegex);
validateItemForm("address", "Une adresse", addressRegex);
validateItemForm("city", "Une ville", cityRegex );
validateItemForm("email", "Un e-mail", emailRegex );
validateForm();





/*=============================================================================================================================================*/
/*=============================================================================================================================================*/







   

               












