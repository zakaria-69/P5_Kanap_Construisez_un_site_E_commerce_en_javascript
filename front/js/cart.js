let productTable=JSON.parse(localStorage.getItem("produit"));


let cartItems=document.getElementById('cart__items');

function displayBasket(){
    for (let produit in productTable){
//création des éléments et ajouts de leurs attributs comparément à l'exemple présent dans le DOM//
        let article=document.createElement('article');
        article.classList.add("cart__item");
        article.setAttribute('data-id',productTable[produit]._id);
        article.setAttribute('data-color',productTable[produit].colors);
        
       
    let div=document.createElement('div');
        div.classList.add('cart__item__img');
      
    let img=document.createElement('img');
        img.src=`${productTable[produit].imageUrl}`
        img.alt=`${productTable[produit].altTxt}`;
        
    let content=document.createElement('div');
    content.classList.add("cart__item__content")
    
       
    let description=document.createElement('div');
        description.classList.add("cart__item__content__description");
       
    let titre=document.createElement('h2');
        titre.append(`${productTable[produit].name}`);
    
    
     let color=document.createElement('p');
        color.append(`${productTable[produit].colors}`);
       

    let prix=document.createElement('p');
        prix.append(`${productTable[produit].price}€`);

    let settings=document.createElement('div');
    settings.classList.add('cart__item__content__settings');

    let settingsQuantity=document.createElement('div');
    settingsQuantity.classList.add("cart__item__content__settings__quantity");

    let quantity=document.createElement('p');
    quantity.append(`Qté : ${productTable[produit].quantity}`);

    let input=document.getElementsByClassName('itemQantity');
     input=document.createElement('input');
       input.classList.add('itemQuantity');
        input.setAttribute("type","number");
        input.setAttribute("name","itemQuantity");
        input.setAttribute('min',1);
        input.setAttribute('max',100);
        input.setAttribute('value', productTable[produit].quantity);

    let divDelete=document.createElement('div');
    divDelete.classList.add('cart__item__content__settings__delete');

    let deleteItem=document.createElement('p');
    deleteItem.classList.add('deletItem');
    deleteItem.append("supprimer");
    
//implémentation des élement crée dans le DOM selon la hiérarchie présente dans l'exemple commenté du DOM//

        cartItems.append(article,div,img,content,description,titre,color,prix,settings,settingsQuantity,quantity,input,divDelete,deleteItem);
        article.append(div,img,content,description,titre,color,prix,settings,settingsQuantity,quantity,input,divDelete,deleteItem);
        div.append(img);
        content.append(description,titre,color,prix,settings,settingsQuantity,quantity,input,divDelete,deleteItem);
        description.append(titre,color,prix);
        settings.append(settingsQuantity,quantity,input,divDelete,deleteItem);
        settingsQuantity.append(quantity,input);
        divDelete.append(deleteItem);  
       
}}

//appel de la fonction crée ci-dessu//
displayBasket();


    


    
   
    