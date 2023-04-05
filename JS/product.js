function add_product (){
    document.getElementById('form_product').style.display = 'block'
    document.getElementById('ma_sanpham').value = randomString(10, "N");
   }
function close_addproduct(){
    document.getElementById('form_product').style.display = 'none'
}