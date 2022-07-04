//on récupére l'id de l'élément cliqué//

let str =window.location.href;
let url = new URL (str);
let id = url.searchParams.get("id");
console.log(id);

let itemsData=[];

//fonction de récupération des informations par produits/id et intégration dans le DOM //
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
//si la quantité est inferieur ou égale à 100 et supérieur à 0 ou que l'input est vide on authorise la saisie(mais pas l'envoi) //
if (quantity.value <= maxQantity && quantity.value > minQuantity || quantity.value==""){
  

}
//sinon on émet une alerte et on reset le champ à 1//
else{
  alert("Veuillez saisir une valeur comprise entre 1 et 100");
  quantity.value="1";
}


 }) ;

//on crée un évenement au click sur le bouton de commande//
let addToCart=document.getElementById('addToCart');
  addToCart.addEventListener('click',(e)=>{
   let productTable=JSON.parse(localStorage.getItem('produits'));
   let optionColor=document.getElementById("colors");
   let quantity=document.getElementById('quantity');

   //on ajoute des valeurs aux tableau sous forme d'objet selon les champs présent 'couleur' 'quantitée'//
/*const selectItem=Object.assign({},itemsData,{
  colors:`${optionColor.value}`,
  quantity:`${quantity.value}`,
  
})*/

const selectItem={
 colors:`${optionColor.value}`,
  quantity:`${quantity.value}`,
  id:`${itemsData._id}`,
}



//on crée une condition pour la validation de l'input//
//si la quantité et la couleurs ne sont pas choisie on previent l'utilisateur de l'erreur et on interdit l'envoie des données//
//sinon on autorise l'envoi au localstorage et à la page panier//
if( selectItem.colors != '' && selectItem.quantity != 0){
  alert("ajouter au panier avec succès") ;
} else{
  alert("veuillez remplir tout les champs de sélection");
  e.preventDefault();
  return [];
}


 

//si productTable est vide on le passe sous forme de tableau,on push les données de selectItem dans ce tableau
//et on envoie le tout vers le localStorage//
   if(productTable==null){
    productTable=[];
    productTable.push(selectItem);
    console.log(productTable)
    localStorage.setItem("produits",JSON.stringify(productTable));
    console.log('produits crée');
    console.log(selectItem)
   
    //sinon si productTable existe déjà on incrémente la nouvelle valeur //
   }else if( productTable != null){
    
    for(i=0;i<productTable.length;i++){
     

      //si l'id de l'élément du localStorage est = à l'id de l'élément sélectionné et qu'ils sont de même couleurs alors on ajoute les quantitées//
        if(productTable[i].id == selectItem.id && productTable[i].colors==optionColor.value){
          console.log("produit exist")

        //on transforme les chiffre qui sont des strings en Numbers pour pouvoir les additionner//
          let storageQuantity=Number(productTable[i].quantity);
          console.log(storageQuantity)
          let selectedItemQuantity=Number(selectItem.quantity);
          console.log(selectedItemQuantity)
        
          let total=storageQuantity+selectedItemQuantity;
          console.log(total);
      //on inject le total dans le localStorage//
          return( productTable[i].quantity=total),       
        //on renvoie la nouvelle valeur sous forme de string dans le localStorage//
          localStorage.setItem("produits",JSON.stringify(productTable)),
          //on récupére la nouvelle valeur dans sa forme originelle//
          productTable=JSON.parse(localStorage.getItem("produits"));
        }}};
        //on boucle le tableau et si un id du tableau est égale a l'id du produit selectionné mais pas la même couleur on l'ajoute au localstorage
        //ou si l'id est différent on l' ajoute au localstorage également
        for(i=0;i<productTable.length;i++){
          if(productTable[i].id == selectItem.id && productTable[i].colors != optionColor.value || productTable[i].id != selectItem.id){
            return(
              productTable.push(selectItem),
              localStorage.setItem('produits',JSON.stringify(productTable)),
              productTable=JSON.parse(localStorage.getItem('produits')),
              console.log(productTable)
            )
          }
        } 

  
   return productTable=JSON.parse(localStorage.getItem("produits"))
   
   
  });





