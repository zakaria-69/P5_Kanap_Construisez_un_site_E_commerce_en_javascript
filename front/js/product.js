//on récupére l'id de l'élément cliquer//

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
//si la quantité est inférieur a 0 et supérieur a 100 ou que l'input est vide on authorise la saisie //
if (quantity.value <= maxQantity && quantity.value > minQuantity || quantity.value==""){
  

}
//sinon on emet une alerte et on reset le champ a 1//
else{
  alert("Veuillez saisir une valeur entre 1 et 100");
  quantity.value="1";
}


 }) ;
