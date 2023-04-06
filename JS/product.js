function add_product(){
    document.getElementById('form_product').style.display = 'block'
    const sanpham = {
        "MA_ID": document.getElementById('ma_sanpham').value,
        "MA_PHIEU": document.getElementById('ma_phieu').value,
        "LOAI_PHIEU": value_phieu,
  
    }
    console.log(sanpham)
   }
function close_addproduct(){
    document.getElementById('form_product').style.display = 'none'
}
var value_phieu;
function chon_phieu(sel){
    value_phieu = sel.options[sel.selectedIndex].text;
    console.log(sel.options[sel.selectedIndex].text)
    return add_product();
}
function submit_product(){
    
}