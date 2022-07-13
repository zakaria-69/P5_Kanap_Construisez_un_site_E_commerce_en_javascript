function displayCommandeNum(){
    const CommandeNum=document.getElementById('orderId');
    CommandeNum.append(localStorage.getItem("orderId"));
    localStorage.clear();
}
displayCommandeNum();

