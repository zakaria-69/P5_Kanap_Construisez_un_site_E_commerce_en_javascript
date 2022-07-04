let selectItem=JSON.parse(localStorage.getItem("produits"));
console.log(selectItem)
 let cartItems=document.getElementById('cart__items');


let finalProducts=[];


 //fonction orderTable modification du tableau itemsData(données de promise du fetch API)
function OrderTable(itemsData){
  for (let identifiants in itemsData){
        //on parcour le tableau et attribut les éléments couleurs et quantitée quand l'id du tableau de l'API est identique a l'élément sélectionner dans le ls//
        for(let i=0;i<selectItem.length;i++){
          if(itemsData[identifiants]._id==selectItem[i].id){
            console.log("kanapé " + selectItem[i].id);
            itemsData[identifiants].colors=selectItem[i].colors;
            itemsData[identifiants]["quantity"]=selectItem[i].quantity;
           // console.log("pareil",itemsData[identifiants],selectItem[i])
           finalProducts.push(itemsData[identifiants]);
           break;
          }
              };//fermeture for let i ligne 17
                  }//fermeture for let products in itemsData ligne 15

                  console.log("finalProducts" + finalProducts)
                   //on appel la fonction displayBasket  
displayBasket(finalProducts);
}//fermeture de la fonction orderTable

//fonction displayBasket création et intégration des éléments au DOM
function displayBasket(itemsData){
        for(let i=0;i<itemsData.length;i++){
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
           article.setAttribute('data-id',itemsData[i]._id);
           article.setAttribute('data-color',itemsData[i].colors);
          
           //traitement balise div
           div.classList.add('cart__item__img');
         
          //traitement balise img
           img.src=`${itemsData[i].imageUrl}`;
           img.alt=`${itemsData[i].altTxt}`;
           
          //traitement balise div class content
          content.classList.add("cart__item__content");
       
          //traitement balise div class description
           description.classList.add("cart__item__content__description");
          
          //traitement balise h2
           titre.append(`${itemsData[i].name}`);
       
          //traitement balise p couleur
           color.append(`${itemsData[i].colors}`);
          
   
          //traitement balise p prix
           prix.append(`${itemsData[i].price}€`);
   
          //traitement balise div settings
          settings.classList.add('cart__item__content__settings');
   
          //traitement balise div settings quantity
          settingsQuantity.classList.add("cart__item__content__settings__quantity");
   
          //traitement balise p quantity
          quantity.append(`Qté : ${itemsData[i].quantity}`);
  
          //traitement input
          input=document.createElement('input');
          input.classList.add('itemQuantity');
           input.setAttribute("type","number");
           input.setAttribute("name","itemQuantity");
           input.setAttribute('min',1);
           input.setAttribute('max',100);
           input.setAttribute('value', itemsData[i].quantity);
   
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
       
 //fonction productTable retourne un tableau des données du backend(API)
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

//appel de la fonction la plus globale//
productTable();

//traitement du formulaire

const firstName=document.getElementById('firstName');
console.log(firstName)
const firstNameErrorMsg=document.getElementById('firstNameErrorMsg')
console.log(firstNameErrorMsg)

const lastName=document.getElementById('lastName')
console.log(lastName)
const lastNameErrorMSg=document.getElementById('lastNameErrorMsg')
console.log(lastNameErrorMSg)

const address=document.getElementById('address')
console.log(address)
const addressErrorMsg=document.getElementById('addressErrorMsg')
console.log(addressErrorMsg)

const city=document.getElementById('city')
console.log(city)
const cityErrorMsg=document.getElementById('cityErrorMsg')
console.log(cityErrorMsg)

const email=document.getElementById('email')
console.log(email)
const emailErrorMsg=document.getElementById('emailErrorMsg')
console.log(emailErrorMsg)

const order=document.getElementById('order');
console.log(order);
    

firstName.addEventListener('change',(e)=>{
  console.log(e.target.value)
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
  console.log(e.target.value)
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
  console.log(e.target.value)
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
  console.log(e.target.value)
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
  console.log(e.target.value)
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
console.log('click')
e.preventDefault();
const firstName=document.getElementById('firstName');
console.log(firstName)


const lastName=document.getElementById('lastName')
console.log(lastName)


const address=document.getElementById('address')
console.log(address)


const city=document.getElementById('city')
console.log(city)


const email=document.getElementById('email')
console.log(email)


const order=document.getElementById('order');
console.log(order);
    

if (selectItem==null){
  alert("vôtre pannier est vide,veuilez sélectionner des articles pour passer commande.");
  e.preventDefault();
}else if(firstName.value===''|| lastName.value===''|| address.value===''|| city.value==='' || email.value===''){
  alert("Veuillez remplir le formulaire avec des données valides pour passer commande");
  e.preventDefault();
}else if(firstName.value != false && lastName.value != false && address.value !=false && city.value !=false &&email.value !=false){
  alert('veuillez remplir tout les champs de formulaire avec des données valide')
  e.preventDefault();
}else{
  alert('commande validée');
}


})

