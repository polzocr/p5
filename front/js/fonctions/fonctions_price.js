
// on affiche le prix total
function totalPrice(){
    let elements = document.getElementsByClassName("cart__item__content__description"); //on recupère tous les éléments contenant les prix
    let totalPrice = 0;
    for(let element of elements){   //pour chaque élément, on fait la somme de tous les prix du panier
        totalPrice += JSON.parse(element.getElementsByTagName("p")[1].textContent.split(" ")[0]); //on recupère le 2eme paragraphe qui correspond au prix  
                                                                                                  //auquel on enlève le signe euro
    }
    document.getElementById("totalPrice").textContent = totalPrice; // on affiche la somme de tous les prix du panier dans le HTML
}

export {totalPrice};
