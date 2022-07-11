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

  //fonction productTable retourne un tableau des données du backend(API)
  if(selectItem===null || selectItem ==0){
    let emptyBasket=document.querySelector("#cartAndFormContainer h1")
    emptyBasket.textContent='vôtre Panier est vide.';
  }else{

    productTable();
  }



 //fonction orderTable modification du tableau itemsData(données de promise du fetch API)
function OrderTable(itemsData){
  
    for (let identifiants in selectItem){
        //on parcour le tableau et attribut les éléments couleurs et quantitée quand l'id du tableau de l'API est identique a l'élément sélectionner dans le ls//
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
       
   //implémentation des élement crée dans le DOM selon la hiérarchie présente dans l'exemple commenté du DOM//
   
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
    

/*if (finalProducts==null){
  alert("vôtre pannier est vide,veuilez sélectionner des articles pour passer commande.");
  e.preventDefault();
}else if(firstName.value===''|| lastName.value===''|| address.value===''|| city.value==='' || email.value===''){
  alert("Veuillez remplir tout les champs du formulaire pour passer commande");
  e.preventDefault();
}else if(firstName.value !=false && lastName.value != false && address.value !=false && city.value !=false &&email.value !=false){
  alert('veuillez remplir tout les champs du formulaire avec des données valide')
  e.preventDefault();
}else{
  alert('commande validée');
 
}*/



//envoie des données vers l'api et récupération du numéro de commande
let idProducts=[];
for (let i=0;i<selectItem.length;i++){
  idProducts.push(selectItem[i].id)
}
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
const options ={
  method :'POST',
  body : JSON.stringify(order),
  headers: {
    'Accept' :'application/json',
    'Content-Type': 'application/json'
  },

};

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
console.log(itemQuantity.length)
for (let i=0;i<itemQuantity.length;i++){
  console.log("ok")
  let maxQuantity=100;
  let minQuantity=1;
  console.log(itemQuantity[i].value)

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
    console.log(finalProducts)
   console.log(selectItem)
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


quantityBasketFromInput(selectItem);




//calcul la quantité total des éléments du panier


function totalQuantityByasket(selectItem){
  let totalQuantityItems=document.getElementById("totalQuantity");
  //selectItem=JSON.parse(localStorage.getItem("produits"));

//creation d'un tableau vide pour y mettre les quantitées
  let quantityTotalCalcul=[];
  
//boucle pour recupérer toutes les quantitées du panier
  for (let i=0;i<selectItem.length;i++){
    
    let quantityItem=Number(selectItem[i].quantity);
    console.log(selectItem[i].quantity)
   
    //on insére les quantitées récupérer dans le tableau
    quantityTotalCalcul.push(quantityItem);

  }
   //calcul des quantitées
     let sommeQuantity= quantityTotalCalcul.reduce((accumulator,currentValue) =>{
      return accumulator + currentValue;
    })
    totalQuantityItems.append(sommeQuantity);
    


}

totalQuantityByasket(selectItem);

//supprimer un élément sur la page panier

function deletProducts(selectItem){
  let deletProduct=document.getElementsByClassName('deletItem');
  console.log(deletProduct);

  window.addEventListener("load", (e)=>{
    let deletItem=document.getElementsByClassName('deletItem');
    console.log(deletItem.length)

  for (let i=0;i<deletProduct.length;i++){
    console.log(deletItem.length)
    deletCard=deletItem[i];
    deletCard.addEventListener("click", (e)=>{
      console.log("ok")
      let deletId=e.target.closest('article').getAttribute('data-id');
      let deletItemColor=e.target.closest('article').getAttribute('data-color');

      

      alert("produit supprimer");
      location.reload;

      console.log(deletId,deletItemColor) 
     


    })
    
  }
  })



    }

  

deletProducts(selectItem);


/*function test(finalProducts){
  for(let i =0;i<10;i++){
    console.log(i)
console.log(finalProducts)
  }
}
test(finalProducts);*/

//calcul le prix total des éléments du panier

/*function totalPriceItems(finalProducts){
 
let totalPrice=document.getElementById("totalPrice");
console.log(totalPrice)
  let prixTotalCalcul=[];
  
  //console.log(finalProducts)


  for (let i = 0 ;i<finalProducts;i++){
console.log('test');
 let quantityItem=finalProducts[i].quantity;
 let PriceByItems=finalProducts[i].price;
 //console.log(PriceByItems,quantityItem)

 prixTotalCalcul.push(quantityItem,PriceByItems)

totalPrice.append(`${eval(prixTotalCalcul.join("*"))}`);
//console.log(totalPrice)

  }
}*/

//totalPriceItems(finalProducts);
