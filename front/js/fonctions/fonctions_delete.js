
//supprime le HTML
function deleteCart(element) {
    element.closest("article").remove();
}

//supprime le localStorage
function deleteStorage(name){
    localStorage.removeItem(name);
}




export{deleteCart, deleteStorage};