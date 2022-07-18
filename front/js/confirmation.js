function displayCommandeNum(){
    const CommandeNum=document.getElementById('orderId');
    let str =window.location.href;
    let url = new URL (str);
    CommandeNum.append(url.searchParams.get("orderId"));
}
displayCommandeNum();

