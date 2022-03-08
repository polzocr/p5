import {urlAllProducts} from './url/url.js'; //on importe l'url de tous les produits

// Requête GET pour récupérer tous les produits et les afficher dans la page

fetch(urlAllProducts) 
.then(res => {
    if(res.ok) {
        return res.json();
    } else {
        console.log("Une erreur est survenue")
    }
})
.then(data => {
    for(let d of data){
        document.getElementById("items").innerHTML +=  `<a href="./product.html?id=${d._id}">
                                                            <article>
                                                                <img src="${d.imageUrl}" alt="${d.altTxt}, Kanap ${d.name}">
                                                                <h3 class="productName">Kanap ${d.name}</h3>
                                                                <p class="productDescription">${d.description}</p>
                                                            </article>
                                                        </a>`
    }
    
})


