let selectItem=JSON.parse(localStorage.getItem("produits"));




 function productTable () {
     fetch("http://localhost:3000/api/products/")
    .then((res)=> res.json())
    .then((promise)=>{
     itemsData=promise;
     console.log(itemsData);

     let cartItems=document.getElementById('cart__items');
  function OrderTable(){
    for (let produits in itemsData){
          //on parcour le tableau et attribut les éléments si identique a l'élément sélectionner//
          for(let i=0;i<itemsData.length;i++){
            let changeColor=document.getElementById('colors');
               changeColor=itemsData[i].colors;
              let quantity=document.getElementById('quantity');
              quantity=selectItem[produits].quantity;
              console.log(quantity)
             //si l'id de l'élément présents dans le localStorage == à l'id de l'élément sélectionner on introduit les valeurs //
            if (selectItem[produits].id == itemsData[i]._id ){
                console.log("identique")
               return( itemsData,
                //on remplace le tableau de couleurs par les couleurs séléctionner par l'utilisateur pour chaque élément//
                replaceColor="colors",
                itemsData[i][replaceColor]=selectItem[produits].colors,
               changeColor.splice(1,1,selectItem.colors),

               //on ajoute la valeur quantity à chaque index du tableau si l"id de l'élément = id du produit dans le localStorage
               itemsData[i]["quantity"]=quantity)
            }}        
    }
  }
    OrderTable();
     
    function displayBasket(){

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
    
    
             for (let produits in itemsData){
                for(let i=0;i<itemsData.length;i++){
                    if (selectItem[produits].id == itemsData[i]._id ){
                return(
                    console.log(selectItem[produits].id),
                    console.log(itemsData[i]._id),

                 //création des éléments et ajouts de leurs attributs comparément à l'exemple présent dans le DOM//
                
                //traitement balise article
                 article.classList.add("cart__item"),
                 article.setAttribute('data-id',itemsData[i]._id),
                 article.setAttribute('data-color',itemsData[i].colors),
                
                 //traitement balise div
                 div.classList.add('cart__item__img'),
               
                //traitement balise img
                 img.src=`${itemsData[i].imageUrl}`,
                 img.alt=`${itemsData[i].altTxt}`,
                 
                //traitement balise div class content
                content.classList.add("cart__item__content"),
             
                //traitement balise div class description
                 description.classList.add("cart__item__content__description"),
                
                //traitement balise h2
                 titre.append(`${itemsData[i].name}`),
             
                //traitement balise p couleur
                 color.append(`${itemsData[i].colors}`),
                
         
                //traitement balise p prix
                 prix.append(`${itemsData[i].price}€`),
         
                //traitement balise div settings
                settings.classList.add('cart__item__content__settings'),
         
                //traitement balise div settings quantity
                settingsQuantity.classList.add("cart__item__content__settings__quantity"),
         
                //traitement balise p quantity
                quantity.append(`Qté : ${itemsData[i].quantity}`),
         
                //traitement input
                input=document.createElement('input'),
                input.classList.add('itemQuantity'),
                 input.setAttribute("type","number"),
                 input.setAttribute("name","itemQuantity"),
                 input.setAttribute('min',1),
                 input.setAttribute('max',100),
                 input.setAttribute('value', itemsData[i].quantity),
         
                //traitement div settingsDelete
                divDelete.classList.add('cart__item__content__settings__delete'),
         
            //traitement p deleteItem
             deleteItem.classList.add('deletItem'),
             deleteItem.append("supprimer"),
             
         //implémentation des élement crée dans le DOM selon la hiérarchie présente dans l'exemple commenté du DOM//
         
                 cartItems.append(article,div,img,content,description,titre,color,prix,settings,settingsQuantity,quantity,input,divDelete,deleteItem),
                 article.append(div,img,content,description,titre,color,prix,settings,settingsQuantity,quantity,input,divDelete,deleteItem),
                 div.append(img),
                 content.append(description,titre,color,prix,settings,settingsQuantity,quantity,input,divDelete,deleteItem),
                 description.append(titre,color,prix),
                 settings.append(settingsQuantity,quantity,input,divDelete,deleteItem),
                 settingsQuantity.append(quantity,input),
                 divDelete.append(deleteItem) )
                
         }}
            }
                }
         //on appel la fonction displayBasket       
     displayBasket();
    })}
//appel de la fonction la plus globale//
productTable();




    


    
   
    