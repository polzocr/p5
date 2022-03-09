//reajustement de la quantité dans le HTML
function changeQuantityCartInHTML(element){
    element.setAttribute("value", event.target.value);
}

//changement de la quantité dans le localStorage
function changeQuantityCartInStorage(element){
    //on recupère le nom du produit(nom +  " " + couleur)
    let nameCart = element.parentElement.parentElement.previousElementSibling.children[0].innerHTML + " " + element.parentElement.parentElement.previousElementSibling.children[1].innerHTML
    let findElementStorage = localStorage.getItem(nameCart); //on recupère le produit du localStorage grace au nom
    let findQuantity = JSON.parse(findElementStorage);      //on prend sa quantité
    findQuantity[2] = event.target.value;                   //On la change par la nouvelle value
    localStorage.setItem(nameCart, JSON.stringify(findQuantity));   //on reajuste le localStorage
}



export {changeQuantityCartInHTML, changeQuantityCartInStorage};