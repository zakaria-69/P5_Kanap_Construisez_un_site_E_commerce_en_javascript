function displayCommandeNum(){
    const CommandeNum=document.getElementById('orderId');
    CommandeNum.append(localStorage.getItem("orderId"));
    console.log(localStorage.getItem("orderId"))
}

displayCommandeNum();

