Création du Javascript d'un site E-commerce.

Projet 5 du parcour développeur Web Openclassrooms,
Le Backend et le FrontEnd html css nous sont fournis, il nous est demandé dans se projet de réalisé la partie 
Javascript (intégration dynamique d'élements ,utilsation du localStorage,calcul de quantitées total et de prix total etc...)
afin de rendre l'éxperience utilisateur agréable et fluide.

Pré-requis:

L’application web sera composée de 4 pages :
● Une page d’accueil montrant (de manière dynamique) tous les articles disponibles à
la vente.
● Une page “produit” qui affiche (de manière dynamique) les détails du produit sur
lequel l'utilisateur a cliqué depuis la page d’accueil. Depuis cette page, l’utilisateur
peut sélectionner une quantité, une couleur, et ajouter le produit à son panier.
● Une page “panier”. Celle-ci contient plusieurs parties :
○ Un résumé des produits dans le panier, le prix total et la possibilité de
modifier la quantité d’un produit sélectionné ou bien de supprimer celui-ci.
○ Un formulaire permettant de passer une commande. Les données du
formulaire doivent être correctes et bien formatées avant d'être renvoyées au
back-end. Par exemple, pas de chiffre dans un champ prénom.
● Une page “confirmation” :
○ Un message de confirmation de commande, remerciant l'utilisateur pour sa
commande, et indiquant l'identifiant de commande envoyé par l’API.

Retour du Backend:

Pour les routes POST, l’objet contact envoyé au serveur doit contenir les champs firstName,
lastName, address, city et email. Le tableau des produits envoyé au back-end doit être un
array de strings product-ID. Les types de ces champs et leur présence doivent être validés
avant l’envoi des données au serveur.