//recuperation du contenu des "produits" du localstorage 

let selectItem=JSON.parse(localStorage.getItem("produits"));
console.log(selectItem)
 let cartItems=document.getElementById('cart__items');


let finalProducts=[];

//récupération des données du tableau de l'API via la method fetch
function productTable () {
  fetch("http://localhost:3000/api/products/")
 .then((res)=> res.json())
 .then((promise)=>{
  itemsData=promise;
  console.log(itemsData);

OrderTable(itemsData);

   }
 )
 }

 
  if(selectItem===null || selectItem ==0){
    let emptyBasket=document.querySelector("#cartAndFormContainer h1")
    emptyBasket.textContent='vôtre Panier est vide.';
  }else{
 //fonction productTable retourne un tableau des données du backend(API)
    productTable();
  }



 //fonction orderTable modification du tableau itemsData(données de promise du fetch API)
function OrderTable(itemsData){
  
    for (let identifiants in selectItem){
        //on parcour le tableau et attribut les éléments couleurs et quantitée à l'élément sélectionner dans le ls//
        for(let i=0;i<itemsData.length;i++){
          if(selectItem[identifiants].id==itemsData[i]._id /*&& itemsData[identifiants].colors==selectItem[i].colors*/){
            let finalProduct = [];
            finalProduct["price"] = itemsData[i].price;
            finalProduct["name"] = itemsData[i].name;
            finalProduct["altTxt"] = itemsData[i].altTxt;
            finalProduct["imageUrl"] = itemsData[i].imageUrl;
            finalProduct["_id"] = itemsData[i]._id;
            finalProduct["selectedColor"]=selectItem[identifiants].colors;
            finalProduct["quantity"]=selectItem[identifiants].quantity;
          finalProducts.push(finalProduct);

           break;
          }
              }
                  };

//on appel la fonction displayBasket  
displayBasket(finalProducts);


}


//fonction displayBasket création et intégration des éléments au DOM
function displayBasket(finalProducts){
        for(let i=0;i<finalProducts.length;i++){
 //on déclare les variables pour tout les éléments du DOM comme présenté en commentée dans le HTML

  let article=document.createElement('article');
  let div=document.createElement('div');
  let img=document.createElement('img');
  let content=document.createElement('div');
  let description=document.createElement('div');
  let titre=document.createElement('h2');
  let color=document.createElement('p');
  let prix=document.createElement('p');
  let settings=document.createElement('div');
  let settingsQuantity=document.createElement('div');
  let quantity=document.createElement('p');
  let input=document.getElementsByClassName('itemQantity');
  let divDelete=document.createElement('div');
  let deleteItem=document.createElement('p');
        
          //création des éléments et ajouts de leurs attributs comparément à l'exemple présent dans le DOM//
          
          //traitement balise article
           article.classList.add("cart__item");
           article.setAttribute('data-id',finalProducts[i]._id);
           article.setAttribute('data-color',finalProducts[i].selectedColor);
          
           //traitement balise div
           div.classList.add('cart__item__img');
         
          //traitement balise img
           img.src=`${finalProducts[i].imageUrl}`;
           img.alt=`${finalProducts[i].altTxt}`;
           
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
          input=document.createElement('input');
          input.classList.add('itemQuantity');
           input.setAttribute("type","number");
           input.setAttribute("name","itemQuantity");
           input.setAttribute('min',1);
           input.setAttribute('max',100);
           input.setAttribute('value', finalProducts[i].quantity);
   
          //traitement div settingsDelete
          divDelete.classList.add('cart__item__content__settings__delete');
   
      //traitement p deleteItem
       deleteItem.classList.add('deletItem');
       deleteItem.append("supprimer");
       
   //implémentation des élements crée dans le DOM selon la hiérarchie présente dans l'exemple commenté du DOM//
   
           cartItems.append(article,div,img,content,description,titre,color,prix,settings,settingsQuantity,quantity,input,divDelete,deleteItem);
           article.append(div,img,content,description,titre,color,prix,settings,settingsQuantity,quantity,input,divDelete,deleteItem);
           div.append(img);
           content.append(description,titre,color,prix,settings,settingsQuantity,quantity,input,divDelete,deleteItem);
           description.append(titre,color,prix);
           settings.append(settingsQuantity,quantity,input,divDelete,deleteItem);
           settingsQuantity.append(quantity,input);
           divDelete.append(deleteItem); 
  }
   }
       

//traitement du formulaire

function formValidation(selectItem){
  
//récuperation des éléments du formulaire page panier



const firstName=document.getElementById('firstName');
//console.log(firstName)
const firstNameErrorMsg=document.getElementById('firstNameErrorMsg')
//console.log(firstNameErrorMsg)

const lastName=document.getElementById('lastName')
//console.log(lastName)
const lastNameErrorMSg=document.getElementById('lastNameErrorMsg')
//console.log(lastNameErrorMSg)

const address=document.getElementById('address')
//console.log(address)
const addressErrorMsg=document.getElementById('addressErrorMsg')
//console.log(addressErrorMsg)

const city=document.getElementById('city')
//console.log(city)
const cityErrorMsg=document.getElementById('cityErrorMsg')
//console.log(cityErrorMsg)

const email=document.getElementById('email')
//console.log(email)
const emailErrorMsg=document.getElementById('emailErrorMsg')
//console.log(emailErrorMsg)

const order=document.getElementById('order');
//console.log(order);
    

//traitements des inputs et du bouton d'envoie du formulaire

firstName.addEventListener('change',(e)=>{
  //console.log(e.target.value)
 value=e.target.value;
 if (value.match(/^[a-zA-Z-]*$/)){
  firstNameErrorMsg.textContent=("valid");
  firstName.style.border='yellowgreen solid 2px';
  firstNameErrorMsg.style.color='yellowgreen'
 }else if(!value.match(/^[a-zA-Z-]*$/)){
  firstNameErrorMsg.textContent=('Autorise les lettres et les "-" uniquement')
  firstName.style.border='red solid 2px';
  firstNameErrorMsg.style.color='red';

 }

})

lastName.addEventListener('change',(e)=>{
  //console.log(e.target.value)
 value=e.target.value;
 if (value.match(/^[a-zA-Z-]*$/)){
  lastNameErrorMSg.textContent=("valid");
  lastName.style.border='yellowgreen solid 2px';
  lastNameErrorMSg.style.color='yellowgreen';
 }else if(!value.match(/^[a-zA-Z-]*$/)){
  lastNameErrorMSg.textContent=('Autorise les lettres et les tirets "-" uniquement')
  lastName.style.border='red solid 2px';
  lastNameErrorMSg.style.color='red';
 }

})

address.addEventListener('change',(e)=>{
  //console.log(e.target.value)
 value=e.target.value;
 if (value.match(/^[a-zA-ZÀ-ÿ0-9\s,.'-]{3,}$/)){
  addressErrorMsg.textContent=("valid");
  address.style.border='yellowgreen solid 2px';
  addressErrorMsg.style.color='yellowgreen'
 }else if(!value.match(/^[a-zA-ZÀ-ÿ0-9\s,.'-]{3,}$/)){
  addressErrorMsg.textContent=('Autorise les lettres les chiffres et les tiret "-" uniquement')
  address.style.border='red solid 2px';
  addressErrorMsg.style.color='red';
 }

})

city.addEventListener('change',(e)=>{
  //console.log(e.target.value)
 value=e.target.value;
 if (value.match(/^[a-zA-Z-À-ÿ]*$/)){
  cityErrorMsg.textContent=("valid");
  city.style.border='yellowgreen solid 2px';
  cityErrorMsg.style.color='yellowgreen'
 }else if(!value.match(/^[a-zA-Z-À-ÿ]*$/)){
  cityErrorMsg.textContent=('Autorise les lettres et les tiret "-" uniquement')
  city.style.border='red solid 2px';
  cityErrorMsg.style.color='red';
 }

})

email.addEventListener('change',(e)=>{
  //console.log(e.target.value)
 value=e.target.value;
 if (value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)){
  emailErrorMsg.textContent=("valid");
  email.style.border='yellowgreen solid 2px';
  emailErrorMsg.style.color='yellowgreen'
 }else if(!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)){
  emailErrorMsg.textContent=('veuillez saisir une adresse email valide')
  email.style.border='red solid 2px';
  emailErrorMsg.style.color='red';
 }

});

//traitement de la soumission du formulaire 

order.addEventListener('click',(e)=>{
e.preventDefault();
const firstName=document.getElementById('firstName');
//console.log(firstName)
//console.log('click')


const lastName=document.getElementById('lastName')
//console.log(lastName)


const address=document.getElementById('address')
//console.log(address)


const city=document.getElementById('city')
//console.log(city)


const email=document.getElementById('email')
//console.log(email)


let order=document.getElementById('order');
//console.log(order);
    
//condition pour pouvoir validé le formulaire 

/*if (finalProducts==null){
  e.preventDefault();
  alert("vôtre pannier est vide,veuilez sélectionner des articles pour passer commande.");
  return false;
  
}else if(firstName.value===''|| lastName.value===''|| address.value===''|| city.value==='' || email.value===''){
  e.preventDefault();
  alert("Veuillez remplir tout les champs du formulaire pour passer commande");
  return false;
  
}else if(firstName.value !==false && lastName.value !==false && address.value !==false  && city.value !== false && email.value !==false){
  e.preventDefault();
  alert('veuillez remplir tout les champs du formulaire avec des données valide');
return false;
 
}else{
  alert('commande validée');
  
 
}*/



//envoie des données vers l'api et récupération du numéro de commande
//recuperation des ID du localstorage dans un tableau
let idProducts=[];
for (let i=0;i<selectItem.length;i++){
  idProducts.push(selectItem[i].id)
}
//création de l'objet contact
order ={
  contact : {
    firstName : firstName.value,
    lastName : lastName.value,
    address : address.value,
    city : city.value,
    email : email.value,
  },
  products : idProducts
  
}
//préparation a l'appel POST API
const options ={
  method :'POST',
  body : JSON.stringify(order),
  headers: {
    'Accept' :'application/json',
    'Content-Type': 'application/json'
  },

};

//appel api ,on vide le localstorage et recupere le numero de commande

fetch("http://localhost:3000/api/products/order", options)
.then ((response)=> response.json())
.then((data) =>{
  console.log(data);
  localStorage.clear();
  localStorage.setItem('orderId',data.orderId);
  document.location.href='confirmation.html';
}).catch((err)=>{
  alert("problème avec fetch : " + err.message)
});

})


}

formValidation(selectItem);


//traitement des boutons de séléction de quantitées sur la page panier

function quantityBasketFromInput(selectItem){


  window.addEventListener('load',(e)=> {
let itemQuantity=document.getElementsByClassName('itemQuantity');
for (let i=0;i<itemQuantity.length;i++){
  console.log("ok")
  let maxQuantity=100;
  let minQuantity=1;

itemQuantity[i].addEventListener('change',(e)=>{
  if( itemQuantity[i].value > maxQuantity || itemQuantity[i].value <minQuantity){
    selectItem[i].quantity=itemQuantity[i].value;
    alert("veuillez saisir une quantité comprise entre 1 et 100 articles");
    itemQuantity[i].value="1";
    
  }else{
    //sinon tableau du ls quantity=valeur de l'input 
    selectItem[i].quantity=itemQuantity[i].value;
    //selectItem.push(itemQuantity[i].value);
    finalProducts=selectItem;
   //finalProducts.push(selectItem)
    //console.log(finalProducts)
    console.log(selectItem[i].quantity)
   localStorage.setItem("produits",JSON.stringify(selectItem));
   location.reload();
   
  }

})
  }
  })
   
  }

//on appel la fonction quantityBasketFromInput avec son callback
quantityBasketFromInput(selectItem);




//calcul la quantité total des éléments du panier
function totalQuantityBasket(selectItem){
  let totalQuantityItems=document.getElementById("totalQuantity");
  //selectItem=JSON.parse(localStorage.getItem("produits"));

//creation d'un tableau vide pour y mettre les quantitées
  let quantityTotalCalcul=[];
  
//boucle pour recupérer toutes les quantitées du panier
  for (let i=0;i<selectItem.length;i++){
    
    //on passe la quantité en Number dans une nouvelle variable
    let quantityItem=Number(selectItem[i].quantity);
    console.log(selectItem[i].quantity)
   
    //on insére les quantitées récupérer dans le tableau
    quantityTotalCalcul.push(quantityItem);

  }
   //calcul des quantitées
     let sommeQuantity= quantityTotalCalcul.reduce((accumulator,currentValue) =>{
      return accumulator + currentValue;
    })
    console.log(sommeQuantity)
//integration du résultat au DOM
    totalQuantityItems.append(sommeQuantity);
    


}
//appel de la fonction totalQuantityBasket
totalQuantityBasket(selectItem);

//supprimer un élément sur la page panier

function deletProducts(selectItem){
 
  window.addEventListener("load", (e)=>{
     let deletItem=document.getElementsByClassName('deletItem');
    console.log(deletItem.length)

    //boucle a travers l'html collection
  for (let i=0;i<deletItem.length;i++){
    console.log(deletItem.length)
    deletCard=deletItem[i];
    //on ecoute le click sur chaque bouton delete 
    deletCard.addEventListener("click", (e)=>{
      console.log("ok")
      //on initie des variables qui prenne pour id et couleurs les id et couleur de l'élément cliquer du LS
      let deletId=selectItem[i].id;
      let deletItemColor=selectItem[i].colors;

      //dans le LS on filtre les elements si l'élément cliqué a un id different ou une couleur differente de l'élement que l'on veut delet dans le ls on les garde sinon on le retire
      selectItem=selectItem.filter(el=> el.id!==deletId || el.colors !==deletItemColor);

      //on push le nouveau tableau dans le LS avec l'elements retirer 
      localStorage.setItem('produits',JSON.stringify(selectItem));

    //si le LS se retrouve vide on le vide pour ne pas garder de tableau vide
      if (selectItem==0 || selectItem==null){
        localStorage.clear();
      }
    //pour chaque item suprimer on averti l'utilisateur et on recharge la page pour afficher la suppression instantannément 

      alert("produit supprimer");
      location.reload();

      console.log(deletId,deletItemColor) 
     


    })
    
  }
  })



    }

  
//on appel la variable deletProducts et son callback
deletProducts(selectItem);


//calcul le prix total des éléments du panier

function totalPriceItems(finalProducts){
 
let totalPrice=document.getElementById("totalPrice");
console.log(totalPrice)
  let prixTotalCalcul=[];

  
 
  console.log(finalProducts)
//enevement au chargement de la page pour afficher les élements du tableau
  window.addEventListener("load", (e)=>{
    //boucle sur le tableau finalProducts correspondant au localstorage + infos a ne pas afficher dans le ls(prix ,description etc...)
  for (let i = 0 ;i<finalProducts.length;i++){
console.log('test');
console.log(finalProducts)
//initation de variable pour recuperer la quantité pour chaque article et le prix unitaire pour chaque article,on passe les quantitées du tableau de string a Number
 let quantityItem=Number(finalProducts[i].quantity);
 let PriceByItems=finalProducts[i].price;

//calcul du prix pour une seul référence d'item
let priceUnit=quantityItem * PriceByItems;
//on push dans un tableau le total prix de chaque item
prixTotalCalcul.push(priceUnit)
  }
  //on calcul via la method reduce le prix total qu'on stock dans l'accumulator
  let sommePrice= prixTotalCalcul.reduce((accumulator,currentValue) =>{
    return accumulator + currentValue;
  })
  //on sort de la boucle pour recupérer seulement le dernier total et on l'integre au DOM
  totalPrice.append(sommePrice);
})}

totalPriceItems(finalProducts);
