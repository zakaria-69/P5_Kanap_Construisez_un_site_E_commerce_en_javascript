//recuperation du contenu des "produits" du localstorage 
let productsInLocalStorage = JSON.parse(localStorage.getItem("produits"));
let cartItems = document.getElementById('cart__items');
let finalProducts = [];
////////////////////////////////////////////////////////récupération des données du tableau de l'API via la method fetch///////////////////////////////////////////////////////
async function productTable() {
  await fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((promise) => {
      DatasFromApi = promise;
      OrderTable(DatasFromApi);
    }
    )
}

/////////////////////////////////////////////////fonction orderTable modification du tableau DatasFromApi(données de promise du fetch API)/////////////////////////////////////////
function OrderTable(DatasFromApi) {

  for (let identifiants in productsInLocalStorage) {
    //on parcour le tableau et attribut les éléments du tableau de l'api dans un nouveau tableau
    for (let i = 0; i < DatasFromApi.length; i++) {
      if (productsInLocalStorage[identifiants].id == DatasFromApi[i]._id) {
        let finalProduct = [];
        finalProduct["price"] = DatasFromApi[i].price;
        finalProduct["name"] = DatasFromApi[i].name;
        finalProduct["altTxt"] = DatasFromApi[i].altTxt;
        finalProduct["imageUrl"] = DatasFromApi[i].imageUrl;
        finalProduct["_id"] = DatasFromApi[i]._id;
        finalProduct["selectedColor"] = productsInLocalStorage[identifiants].colors;
        finalProduct["quantity"] = productsInLocalStorage[identifiants].quantity;
        finalProducts.push(finalProduct);
        break;
      }
    }
  };
  //on appel la fonction displayBasket 
  displayBasket(finalProducts);
}

//////////////////////////////////////////////////////////fonction displayBasket création et intégration des éléments au DOM/////////////////////////////////////////////
function displayBasket(finalProducts) {
  for (let i = 0; i < finalProducts.length; i++) {
    //on déclare les variables pour tout les éléments du DOM comme présenté en commentée dans le HTML

    let article = document.createElement('article');
    let div = document.createElement('div');
    let img = document.createElement('img');
    let content = document.createElement('div');
    let description = document.createElement('div');
    let titre = document.createElement('h2');
    let color = document.createElement('p');
    let prix = document.createElement('p');
    let settings = document.createElement('div');
    let settingsQuantity = document.createElement('div');
    let quantity = document.createElement('p');
    let input = document.getElementsByClassName('itemQantity');
    let divDelete = document.createElement('div');
    let deleteItem = document.createElement('p');

    //création des éléments et ajouts de leurs attributs comparément à l'exemple présent dans le DOM//

    //traitement balise article
    article.classList.add("cart__item");
    article.setAttribute('data-id', finalProducts[i]._id);
    article.setAttribute('data-color', finalProducts[i].selectedColor);

    //traitement balise div
    div.classList.add('cart__item__img');

    //traitement balise img
    img.src = `${finalProducts[i].imageUrl}`;
    img.alt = `${finalProducts[i].altTxt}`;

    //traitement balise div class content
    content.classList.add("cart__item__content");

    //traitement balise div class description
    description.classList.add("cart__item__content__description");

    //traitement balise h2
    titre.append(`${finalProducts[i].name}`);

    //traitement balise p couleur
    color.append(`${finalProducts[i].selectedColor}`);


    //traitement balise p prix
    prix.append(`${finalProducts[i].price}€`);

    //traitement balise div settings
    settings.classList.add('cart__item__content__settings');

    //traitement balise div settings quantity
    settingsQuantity.classList.add("cart__item__content__settings__quantity");

    //traitement balise p quantity
    quantity.append(`Qté : ${finalProducts[i].quantity}`);

    //traitement input
    input = document.createElement('input');
    input.classList.add('itemQuantity');
    input.setAttribute("type", "number");
    input.setAttribute("name", "itemQuantity");
    input.setAttribute('min', 1);
    input.setAttribute('max', 100);
    input.setAttribute('value', finalProducts[i].quantity);

    //traitement div settingsDelete
    divDelete.classList.add('cart__item__content__settings__delete');

    //traitement p deleteItem
    deleteItem.classList.add('deletItem');
    deleteItem.append("supprimer");

    //implémentation des élements crée dans le DOM selon la hiérarchie présente dans l'exemple commenté du DOM//  
    cartItems.append(article, div, img, content, description, titre, color, prix, settings, settingsQuantity, quantity, input, divDelete, deleteItem);
    article.append(div, img, content, description, titre, color, prix, settings, settingsQuantity, quantity, input, divDelete, deleteItem);
    div.append(img);
    content.append(description, titre, color, prix, settings, settingsQuantity, quantity, input, divDelete, deleteItem);
    description.append(titre, color, prix);
    settings.append(settingsQuantity, quantity, input, divDelete, deleteItem);
    settingsQuantity.append(quantity, input);
    divDelete.append(deleteItem);
  }
  //on appel la fonction quantityBasketFromInput avec son callback
  quantityBasketFromInput(productsInLocalStorage);

  //appel de la fonction totalQuantityBasket
  totalQuantityBasket(productsInLocalStorage);

  //on appel la variable deletProducts et son callback
  deletProducts(productsInLocalStorage);

  totalPriceItems(finalProducts);
}
////////////////////////////////////////traitement des boutons de séléction de quantitées sur la page panier modification quantitées//////////////////////////////////////

function quantityBasketFromInput(productsInLocalStorage) {
  let itemQuantity = document.getElementsByClassName('itemQuantity');
  for (let i = 0; i < itemQuantity.length; i++) {
    let maxQuantity = 100;
    let minQuantity = 1;

    itemQuantity[i].addEventListener('change', (e) => {
      if (itemQuantity[i].value > maxQuantity || itemQuantity[i].value < minQuantity) {
        productsInLocalStorage[i].quantity = itemQuantity[i].value;
        alert("veuillez saisir une quantité comprise entre 1 et 100 articles");
        itemQuantity[i].value = "1";

      } else {
        //sinon tableau du ls quantity=valeur de l'input 
        productsInLocalStorage[i].quantity = itemQuantity[i].value;
        finalProducts = productsInLocalStorage;
        localStorage.setItem("produits", JSON.stringify(productsInLocalStorage));
        location.reload();
      }
    })
  }
}

////////////////////////////////////////////////////////////////calcul la quantité total des éléments du panier//////////////////////////////////////////////////////
function totalQuantityBasket(productsInLocalStorage) {
  let totalQuantityItems = document.getElementById("totalQuantity");
  //productsInLocalStorage=JSON.parse(localStorage.getItem("produits"));

  //creation d'un tableau vide pour y mettre les quantitées
  let quantityTotalCalcul = [];

  //boucle pour recupérer toutes les quantitées du panier
  for (let i = 0; i < productsInLocalStorage.length; i++) {

    //on passe la quantité en Number dans une nouvelle variable
    let quantityItem = Number(productsInLocalStorage[i].quantity);

    //on insére les quantitées récupérer dans le tableau
    quantityTotalCalcul.push(quantityItem);
  }
  //calcul des quantitées
  let sommeQuantity = quantityTotalCalcul.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  })
  //integration du résultat au DOM
  totalQuantityItems.append(sommeQuantity);
}


///////////////////////////////////////////////////////////supprimer un élément sur la page panier////////////////////////////////////////////////////
function deletProducts(productsInLocalStorage) {

  let deletItem = document.getElementsByClassName('deletItem');
  //boucle a travers l'html collection
  for (let i = 0; i < deletItem.length; i++) {
    deletCard = deletItem[i];
    //on ecoute le click sur chaque bouton delete 
    deletCard.addEventListener("click", (e) => {
      //on initie des variables qui prenne pour id et couleurs les id et couleur de l'élément cliquer du LS
      let deletId = productsInLocalStorage[i].id;
      let deletItemColor = productsInLocalStorage[i].colors;

      //dans le LS on filtre les elements si l'élément cliqué a un id different ou une couleur differente de l'élement que l'on veut delet dans le ls on les garde sinon on le retire
      productsInLocalStorage = productsInLocalStorage.filter(el => el.id !== deletId || el.colors !== deletItemColor);

      //on push le nouveau tableau dans le LS avec l'elements retirer 
      localStorage.setItem('produits', JSON.stringify(productsInLocalStorage));

      //si le LS se retrouve vide on le vide pour ne pas garder de tableau vide
      if (productsInLocalStorage == 0 || productsInLocalStorage == null) {
        localStorage.clear();
      }
      //pour chaque item suprimer on averti l'utilisateur et on recharge la page pour afficher la suppression instantannément 

      alert("produit supprimer");
      location.reload();
    })
  }
}

////////////////////////////////////////////////////////////////calcul le prix total des éléments du panier//////////////////////////////////////////////////////

function totalPriceItems(finalProducts) {
  console.log('finalProducts ' + finalProducts.length)
  let totalPrice = document.getElementById("totalPrice");
  let prixTotalCalcul = [];

  //boucle sur le tableau finalProducts correspondant au localstorage + infos a ne pas afficher dans le ls(prix ,description etc...)
  for (let i = 0; i < finalProducts.length; i++) {
    //initation de variable pour recuperer la quantité pour chaque article et le prix unitaire pour chaque article,on passe les quantitées du tableau de string a Number
    let quantityItem = Number(finalProducts[i].quantity);
    let PriceByItems = finalProducts[i].price;

    //calcul du prix pour une seul référence d'item
    let priceUnit = quantityItem * PriceByItems;
    //on push dans un tableau le total prix de chaque item
    prixTotalCalcul.push(priceUnit)
  }
  console.log('prixTotalCalcul ' + prixTotalCalcul.length)
  //on calcul via la method reduce le prix total qu'on stock dans l'accumulator
  let sommePrice = prixTotalCalcul.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  })
  //on sort de la boucle pour recupérer seulement le dernier total et on l'integre au DOM
  console.log('sommePrice ' + sommePrice)
  totalPrice.append(sommePrice);
}


///////////////////////////////////////////////////////////////////////traitement du formulaire//////////////////////////////////////////////////////////////
function formValidation(productsInLocalStorage) {
  //récuperation des éléments du formulaire page panier
  const firstName = document.getElementById('firstName');
  const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
  const lastName = document.getElementById('lastName');
  const lastNameErrorMSg = document.getElementById('lastNameErrorMsg');
  const address = document.getElementById('address');
  const addressErrorMsg = document.getElementById('addressErrorMsg');
  const city = document.getElementById('city');
  const cityErrorMsg = document.getElementById('cityErrorMsg');
  const email = document.getElementById('email');
  const emailErrorMsg = document.getElementById('emailErrorMsg');
  const order = document.getElementById('order');

  //traitements des inputs et du bouton d'envoie du formulaire

  firstName.addEventListener('change', (e) => {
    value = e.target.value;
    if (value.match(/^[a-zA-Z-]*$/)) {
      firstNameErrorMsg.textContent = ("valid");
      firstName.style.border = 'yellowgreen solid 2px';
      firstNameErrorMsg.style.color = 'yellowgreen'
    } else if (!value.match(/^[a-zA-Z-]*$/)) {
      firstNameErrorMsg.textContent = ('Autorise les lettres et les "-" uniquement')
      firstName.style.border = 'red solid 2px';
      firstNameErrorMsg.style.color = 'red';
    }
  })

  lastName.addEventListener('change', (e) => {
    value = e.target.value;
    if (value.match(/^[a-zA-Z-]*$/)) {
      lastNameErrorMSg.textContent = ("valid");
      lastName.style.border = 'yellowgreen solid 2px';
      lastNameErrorMSg.style.color = 'yellowgreen';
    } else if (!value.match(/^[a-zA-Z-]*$/)) {
      lastNameErrorMSg.textContent = ('Autorise les lettres et les tirets "-" uniquement')
      lastName.style.border = 'red solid 2px';
      lastNameErrorMSg.style.color = 'red';
    }
  })

  address.addEventListener('change', (e) => {
    value = e.target.value;
    if (value.match(/^[a-zA-ZÀ-ÿ0-9\s,.'-]{3,}$/)) {
      addressErrorMsg.textContent = ("valid");
      address.style.border = 'yellowgreen solid 2px';
      addressErrorMsg.style.color = 'yellowgreen'
    } else if (!value.match(/^[a-zA-ZÀ-ÿ0-9\s,.'-]{3,}$/)) {
      addressErrorMsg.textContent = ('Autorise les lettres les chiffres et les tiret "-" uniquement')
      address.style.border = 'red solid 2px';
      addressErrorMsg.style.color = 'red';
    }
  })

  city.addEventListener('change', (e) => {
    value = e.target.value;
    if (value.match(/^[a-zA-Z-À-ÿ]*$/)) {
      cityErrorMsg.textContent = ("valid");
      city.style.border = 'yellowgreen solid 2px';
      cityErrorMsg.style.color = 'yellowgreen'
    } else if (!value.match(/^[a-zA-Z-À-ÿ]*$/)) {
      cityErrorMsg.textContent = ('Autorise les lettres et les tiret "-" uniquement')
      city.style.border = 'red solid 2px';
      cityErrorMsg.style.color = 'red';
    }
  })

  email.addEventListener('change', (e) => {
    value = e.target.value;
    if (value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
      emailErrorMsg.textContent = ("valid");
      email.style.border = 'yellowgreen solid 2px';
      emailErrorMsg.style.color = 'yellowgreen'
    } else if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
      emailErrorMsg.textContent = ('veuillez saisir une adresse email valide')
      email.style.border = 'red solid 2px';
      emailErrorMsg.style.color = 'red';
    }
  });

  //traitement de la soumission du formulaire 
  order.addEventListener('click', (e) => {
    e.preventDefault();
    let order = document.getElementById('order');

    //condition pour pouvoir validé le formulaire 
    if (finalProducts == null) {
      e.preventDefault();
      alert("vôtre pannier est vide,veuilez sélectionner des articles pour passer commande.");
      return false;

    } else if (firstName.value === '' || lastName.value === '' || address.value === '' || city.value === '' || email.value === '') {
      e.preventDefault();
      alert("Veuillez remplir tout les champs du formulaire pour passer commande");
      return false;

    } else if (firstName.value.match(/^[a-zA-Z-]*$/) && lastName.value.match(/^[a-zA-Z-]*$/) && address.value.match(/^[a-zA-ZÀ-ÿ0-9\s,.'-]{3,}$/) && city.value.match(/^[a-zA-Z-À-ÿ]*$/) && email.value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
      alert('commande validée');

    } else {
      alert('veuillez remplir tout les champs du formulaire avec des données valide');
      e.preventDefault();
      return false;
    }

    //envoie des données vers l'api et récupération du numéro de commande
    //recuperation des ID du localstorage dans un tableau
    let idProducts = [];
    for (let i = 0; i < productsInLocalStorage.length; i++) {
      idProducts.push(productsInLocalStorage[i].id)
    }
    //création de l'objet contact
    order = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
      products: idProducts

    }
    //préparation a l'appel POST API
    const options = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    };

    //appel api ,on vide le localstorage et recupere le numero de commande
    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        localStorage.clear();
        document.location.href = 'confirmation.html?orderId='+data.orderId;
      }).catch((err) => {
        alert("problème avec fetch : " + err.message)
      });
  })
}

if (productsInLocalStorage === null || productsInLocalStorage == 0) {
  let emptyBasket = document.querySelector("#cartAndFormContainer h1")
  emptyBasket.textContent = 'vôtre Panier est vide.';
} else {
  //fonction productTable retourne un tableau des données du backend(API) 
  productTable();
}
formValidation(productsInLocalStorage);







