
/* Fonction qui vérifie si l'élément existe dans le panier : 
    1)Vérifie que la quantité ou la couleur ne soit pas nulle
    2)Si l'élément est déja dans le panier, on change sa quantité
    3)Si l'élément n'y est pas, on l'ajoute
*/
function elementExist(data, quantity, color){
    if(quantity == 0 || color == 0){        // 1)
        alert("Veuillez au moins un élément avec une couleur")
    } else if (localStorage.getItem(data.name + " " + color)) { // 2)
    changeQuantity(data, quantity, color); 
    } else { 
        addToCart(data, quantity, color); // 3)
    }
}

//fonction qui ajoute le produit choisi au panier
function addToCart(data, quantity, color){
    let tabProduct = [];
    tabProduct.push(data._id, color, quantity);                               //création d'un tableau avec l'id, la couleur et la quantité
    localStorage.setItem(data.name + " " + color, JSON.stringify(tabProduct));//On créer un élement avec le nom auquel on ajoute la couleur, avec notre tableau comme valeur
}

//fonction qui change la quantité du produit déja existant

function changeQuantity(data, quantity, color){
    let name = localStorage.getItem(data.name + " " + color);       //recupère l'élement
    let oldQuantity = JSON.parse(name)[2];                          //on recupère sa quantité    
    let newQuantity = parseInt(quantity) + parseInt(oldQuantity);   //on l'ajoute a la nouvelle quantité choisie
    addToCart(data,newQuantity, color);                             //on modifie la valeur du panier
}


export {elementExist};
