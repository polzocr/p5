
for(let i = 0; i < localStorage.length; i++){
    //let name = localStorage.key(i).split(" ")[0] + " " + localStorage.key(i).split(" ")[1];
    let color = localStorage.key(i).split(" ")[2];
    let getInfo = JSON.parse(localStorage.getItem(localStorage.key(i)));
    let id = getInfo[0];
    let quantity = getInfo[2];
    fetch("http://localhost:3000/api/products/" + id)
    .then(res => {
        if(res.ok) {
            return res.json();
        }else {
            console.log("Une erreur est survenue")
        }
    })
    .then(data => {
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

    
        let deleteButton = document.getElementsByClassName("deleteItem")
        for(let i = 0; i< deleteButton.length; i ++){
            deleteButton[i].addEventListener("click", function(e){
            console.log("ca marche ?");
            deleteCart(); 
            })
        }
    })    
}

function deleteCart() {
    let article = document.querySelector("h2").closest("article");
    let articleParent = document.getElementById("cart__items");
    console.log(articleParent);
    articleParent.removeChild(article);
}








