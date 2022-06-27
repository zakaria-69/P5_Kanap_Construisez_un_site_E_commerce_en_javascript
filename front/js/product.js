//on récupére l'id de l'élément cliqué//

let str =window.location.href;
let url = new URL (str);
let id = url.searchParams.get("id");
console.log(id);

let itemsData=[];

//fonction de récupération des informations par produit/id et intégration dans le DOM //
 async function productsDisplay () {
 await fetch("http://localhost:3000/api/products/" + id)
 .then((res)=> res.json())
 .then((promise)=>{
  itemsData=promise;
 
  let item__img=document.querySelector('.item__img');
  img=document.createElement('img');
  item__img.append(img);
  img.src=`${itemsData.imageUrl}`;
  img.alt=`${itemsData.altTxt}`;
 
  let itemTitle=document.getElementById('title');
  document.createElement('h1');
  itemTitle.append(`${itemsData.name}`);

  let price=document.getElementById('price');
  document.createElement('span');
  price.append(`${itemsData.price}`);

  let description=document.getElementById('description');
  document.createElement('p');
  description.append(`${itemsData.description}`)

  //on récupere les tableau de couleurs//
    colors=[itemsData.colors];
   //on appel l'élément du DOM ayant pour id'colors';
     let select=document.getElementById('colors');
//on crée une boucle forEach//
     itemsData.colors.forEach(items => {
//on crée pour chaque boucle un élément options comportant un attribut value et une value//
      let optionColor=document.createElement('option');
      optionColor.append(`${items}`);
      optionColor.value=`${items}`;
      select.append(optionColor);
     });


 })};

 //on appel la fonction crée plus haut//
 
 productsDisplay();

 //récupération de l'élément id 'quantity'//
 quantity=document.getElementById('quantity');

 //on écoute l'évenement sur l'input de saisie de valeur//
 quantity.addEventListener('input',(e)=>{

//création de constante de type numbers//
const maxQantity=100;
const minQuantity=0;

//création des conditions à réspecté dans le champ de saisie//
//si la quantité est inferieur ou égale a 100 et supérieur à 0 ou que l'input est vide on authorise la saisie //
if (quantity.value <= maxQantity && quantity.value > minQuantity || quantity.value==""){
  

}
//sinon on émet une alerte et on reset le champ à 1//
else{
  alert("Veuillez saisir une valeur comprise entre 1 et 100");
  quantity.value="1";
}


 }) ;

/*

//création d'un fonction permettant de sauvegarder le panier//

function saveBasket(basket){
  localStorage.setItem("basket",JSON.stringify(basket));
}

//création d'une fonction permettant d'obtenir le panier//
function getBasket(){
  let basket= localStorage.getItem("basket");
  if(basket == null){
return [];
  } else {
return JSON.parse(basket);
  }
}

//création d'une fonction permettant d'ajouter des produits au panier//
function addBasket(product){
let basket = getBasket();
let foundProduct = basket.find(p=> p.id==product.id);
if(foundProduct != undefined){
  foundProduct.quantity++;
}else{
  product.quantity=1;
  basket.push(product);
}

saveBasket(basket);
}

//création d'une fonction permettant de supprimer des produit du panier//
function removeFromBasket(product){
  let basket =getBasket();
  basket = basket.filter(p=> p.id != product.id);
  saveBasket();
}

//création d'une fonction permettant de changer la quantité de produit du panier//
function changeQuantity(product,quantity){
  let basket =getBasket();
  let foundProduct = basket.find(p=> p.id==product._id);
  if(foundProduct != undefined){
    foundProduct.quantity+=quantity;
    if(foundProduct.quantity <=0){
      removeFromBasket(Product); 
    }else{
      saveBasket(basket);
    } 
  } 
}

//création d'une fonction permettant de définir le nombre total de produit du panier //
function getNumberProduct(){
  let basket=getBasket();
  let number=0;
  for(let product of basket){
    number+=product.quantity;
  }
  return number;
}

//création d'une fonction permettant de récupérer le prix total du panier//
function getTotalPrice(){
  let basket=getBasket();
  let total=0;
  for (let product of basket){
    total+=product.quantity * product.price;
  }
  return total;
}*/


//on crée un évenement au click sur le bouton de commande//
let addToCart=document.getElementById('addToCart');
  addToCart.addEventListener('click',(e)=>{
   let productTable=JSON.parse(localStorage.getItem('product'));
   let optionColor=document.getElementById("colors");
   let quantity=document.getElementById('quantity');

   //on ajoute des valeurs aux tableau sous forme d'objet selon les champs présent 'couleur' 'quantitée'//
const selectItem=Object.assign({},itemsData,{
  colors:`${optionColor.value}`,
  quantity:`${quantity.value}`,
  
})

//on crée une condition pour la validation de l'input//
//si la quantité et la couleurs ne sont pas choisie on previent l'utilisateur de l'erreur et on interdit l'envoie des données//

if( selectItem.colors != '' && selectItem.quantity != 0){
  alert("ajouter au panier avec succès") ;
} else{
  alert("veuillez remplir tout les champs de sélection");
  e.preventDefault();
  return [];
}

console.log(selectItem);
console.log(quantity);

   if(productTable==null){
    productTable=[];
    productTable.push(selectItem);
    localStorage.setItem("produit",JSON.stringify(productTable));
   }
   console.log(productTable)
   console.log(optionColor);
  })



