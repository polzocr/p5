

fetch("http://localhost:3000/api/products")
.then(res => {
    if(res.ok) {
        return res.json();
    } else {
        console.log("Une erreur est survenue")
    }
})
/* Méthode avec toutes les valeurs dans l'url

.then(data => {
    for(let d of data){
        //let colors = JSON.stringify(d.colors);
        //const product = new Product(d.colors,d._id,d.name,d.price,d.imageUrl,d.description,d.altTxt);
        document.getElementById("items").innerHTML +=  `<a href="./product.html?id=${d._id}&img=${d.imageUrl}&name=${d.name}&description=${d.description}&price=${d.price}&colors=${d.colors}">
                                                            <article>
                                                            <img src="${d.imageUrl}" alt="${d.altTxt}, Kanap ${d.name}">
                                                            <h3 class="productName">Kanap ${d.name}</h3>
                                                            <p class="productDescription">${d.description}</p>
                                                            </article>
                                                        </a>`
    }
    
})
*/
//  Méthode avec uniquement l'id dans l'url

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


