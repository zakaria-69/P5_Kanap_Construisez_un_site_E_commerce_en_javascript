//création d'un tableau vide pour y insérer les éléments//
let DatasFromApi = [];
let items=document.getElementById("items");

///////////////////////////////////////////////////////////Appel API via la méthode fetch (get)////////////////////////////////////////////////
async function fetchDatasFromApi () {
    await fetch("http://localhost:3000/api/products")
    .then ((res) => res.json())
    .then ((promise)=>  {
//on passe les données transformée dans le tableau vide//
        DatasFromApi=promise;
    //création d'une boucle for pour crée les élements et y intégrer les données de l'API//
    for(i=0;i<DatasFromApi.length;i++){
    //création élement a
      let itemsLink =document.createElement('a');
      itemsLink.href = `./product.html?id=${DatasFromApi[i]._id}`;
    //création élement img
      let itemsImages=document.createElement('img');
      itemsImages.src=`${DatasFromApi[i].imageUrl}`; 
      itemsImages.alt=`${DatasFromApi[i].altTxt}`;
    //création élement H3
      let itemsTitle=document.createElement('h3');
      itemsTitle.append(`${DatasFromApi[i].name}`);
    //création élement p
      let itemsDescription=document.createElement('p');
      itemsDescription.append(`${DatasFromApi[i].description}`);
  //on inclus dans Article les balises img h3 et p pour respecter la hiérarchie HTML"//
      let itemsArticle=document.createElement('article');
      itemsArticle.append(itemsImages,itemsTitle,itemsDescription);
//on inclus dans a(itemsLink) articles et les balises le composant pour réspecter la même hiérarchie HTML"//

      itemsLink.append(itemsArticle);

      //on injecte le tout dans le DOM"//
      items.append(itemsLink);
    }})   
}
//on appel la fonction réalisée plus haut//
fetchDatasFromApi();






















