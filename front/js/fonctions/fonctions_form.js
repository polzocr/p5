import {firstNameRegex, lastNameRegex, addressRegex, cityRegex, emailRegex} from './../utils/regex.js'; 
import {urlPost, urlConfirmation} from './../url/url.js';
import {Contact} from './../class/contact.js';


//fonction qui vérifie que les champ ne soient pas vides lors de la commande
function isEmpty(){
    let inputs = document.querySelectorAll(".cart__order__form__question input");
    for(let input of inputs){
        if(input.value == ""){
            return true;
        }
    }
}

/*fonction qui vérifie que les champs soient bien valides pour 
le deuxieme evenement qui est l'appuie sur le bouton pour commander */
function notValid(value, regex){
    if(value !== "" && regex.test(value)){
        return false;
    } else {
        return true;
    }
}

/*fonction qui permet d'écouter chaque input et de le
valider ou non selon son nom, et son regex
on affiche ensuite un message sous l'input */
function validateItemForm(name, nameFrench, regex){
    document.getElementById(name).addEventListener("input", function(event){
        let value = event.target.value; //on recupère l'input
        if(value !== "" && regex.test(value)){ // on test la validité du champ et on affiche un message en fonction
            document.getElementById( name + "ErrorMsg").textContent = ""; 
        } else {
            document.getElementById(name + "ErrorMsg").textContent = nameFrench + " valide doit être renseigné";
        }
    })
}
/*Fonction qui ecoute le bouton "commander" : 
    elle vérifie ensuite la validité de chaque valeur des champs,
    empeche de commander avec un panier vide,
    puis si tout est bon, créer un objet contact ainsi qu'un tableau 
    des ID des produits pour pouvoir les passer comme variable a la 
    fonction send qui est une requete POST */

function validateForm(){
    document.querySelector(".cart__order form").addEventListener("submit", function(event){
        let firstName = document.getElementById("firstName").value; //recupère toutes les valeurs
        let lastName = document.getElementById("lastName").value;
        let address = document.getElementById("address").value;
        let city = document.getElementById("city").value;
        let email = document.getElementById("email").value;
        if(localStorage.length == 0){   //si le panier est vide, alerte
            event.preventDefault();
            alert("Votre panier est vide");
        } else if(notValid(firstName, firstNameRegex) || notValid(lastName, lastNameRegex) || notValid(address, addressRegex) || notValid(city, cityRegex) || notValid(email, emailRegex) || isEmpty()){
            event.preventDefault();//si les champs ne sont pas valides ou vides, erreur
        } else { //sinon on fait la requête POST 
            event.preventDefault();
            const contact = new Contact(firstName,lastName,address,city,email); //création objet contact
            let products = [];
            for (let i = 0; i < localStorage.length; i++){  // création du tableau des id des produits
                let idProduct = JSON.parse(localStorage.getItem(localStorage.key(i)))[0];
                products.push(idProduct);   
            }
            
            send({contact, products}); //appel de la requête POST
        }
    })
}

/*Requete POST qui passe un objet contact ainsi qu'un tableau
avec les id des produits pour récupérer un numéro de commande.
On effectue une redirection vers la page confirmation avec 
ce même numéro de commande affiché dans l'URL de la page
 */

function send(value) {
    fetch(urlPost, {
      method: "POST",
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value) //on envoie nos données contact + id des produits
    })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
        localStorage.clear(); //on clear le localStorage car la commande est validée
        window.location.href= urlConfirmation + value.orderId   // on redirige vers la page confirmation avec orderId
    });
  }


export {validateItemForm, validateForm};