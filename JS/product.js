var value_phieu = "Phiếu thu";
var trangthai_sanpham = "Mới";
var loai_sanpham = "Điện thoại";
var donvi = "Cái - chiếc";
var ma_sanpham = document.getElementById('ma_sanpham').value;
var ten_sanpham = document.getElementById('ten_sanpham').value;
var noi_cungcap = document.getElementById('noi_cungcap').value;
var soluong = document.getElementById('soluong').value;
var dongia_nhap = document.getElementById('dongia_nhap').value;
var dongia_ban = document.getElementById('dongia_ban').value;
var phuphi = document.getElementById('phuphi').value;
var loai_phuphi = document.getElementById('loai_phuphi').value;
var value_avt_sanpham = "";
var table = document.getElementById("table_dactinh_sanpham");
function add_product(id_kho){
    document.getElementById('table_dssp').value = id_kho
    document.getElementById('form_product').style.display = 'block'
   }
function close_addproduct(){
    document.getElementById('form_product').style.display = 'none'
}
function chon_phieu(sel){
    value_phieu = sel.options[sel.selectedIndex].text;
}
function chon_trangthai(sel){
    trangthai_sanpham = sel.options[sel.selectedIndex].text;
}
function chon_loai_sanpham(sel){
    loai_sanpham = sel.options[sel.selectedIndex].text;
}
function chon_donvi(sel){
  donvi = sel.options[sel.selectedIndex].text;
}
const reader_avt = new FileReader();   // Khởi tạo đối tượng FileReader
    document.getElementById("avt_sanpham").addEventListener("change", (event) => {
      const files  = event.target.files;    // Đọc thông tin tập tin đã được đăng tải
      const getSizeImage = files[0].size; // kiểm tra kích thước file 
      reader_avt.readAsDataURL(files[0]) // Lắng nghe quá trình đọc tập tin hoàn thành
      if (getSizeImage > (500*500)) {
          Swal.fire({
            title: 'Kích thước tối đa là 500KB!',
            text: 'Bạn đang tải lên tệp quá dung lượng',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          })
          document.getElementById("avt_sanpham").value = "";
      } else {
        reader_avt.addEventListener("load", (event) => {
          const img = event.target.result;
          document.getElementById('value_avt_sanpham').value = img;
        })
      }
    })
function add_row() {
      var row = table.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      cell1.innerHTML = table.rows.length-1;
      cell2.innerHTML = `<input class="input-table" type="text">`;
      cell3.innerHTML = `<input class="input-table" type="text">`;
    }
    
function delete_row() {
  var rowCount = table.rows.length-1;
  if (rowCount>1){
    document.getElementById("table_dactinh_sanpham").deleteRow(rowCount);
  } else 
    Swal.fire({
      title: 'Bạn không thể xóa hết hàng!',
      icon: 'error',
      showConfirmButton: false,
      timer: 1500
    })
}
function formatCash(str) {
  return str.split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + '.')) + prev
  })
}
function reformatCash(str) {
  return str.split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + '')) + prev
  })
}
function tongket_sanpham(){
  var phuphi = document.getElementById('phuphi').value;
  var soluong = document.getElementById('soluong').value;
  var dongia_nhap = document.getElementById('dongia_nhap').value;
  if(phuphi!=""){
    document.getElementById("tinh_phuphi").innerText = formatCash(phuphi) + " VNĐ"
  } else  document.getElementById("tinh_phuphi").innerText = "0 VNĐ"

  if(soluong!="" && dongia_nhap !=""){
    document.getElementById("tinh_congno").innerText = formatCash((parseInt(soluong)*parseInt(dongia_nhap)).toString()) + " VNĐ"
  } else  document.getElementById("tinh_congno").innerText = "0 VNĐ"

  if(phuphi!="" && soluong!="" && dongia_nhap !=""){
    document.getElementById("tong_congno").innerText = formatCash((parseInt(soluong)*parseInt(dongia_nhap)+parseInt(phuphi)).toString()) + " VNĐ"
  } else  document.getElementById("tong_congno").innerText = "0 VNĐ"
}
function submit_product(){
  var id_kho = document.getElementById('table_dssp').value
  var ma_sanpham = document.getElementById('ma_sanpham').value;
  var ten_sanpham = document.getElementById('ten_sanpham').value;
  var noi_cungcap = document.getElementById('noi_cungcap').value;
  var soluong = document.getElementById('soluong').value;
  var dongia_nhap = document.getElementById('dongia_nhap').value;
  var dongia_ban = document.getElementById('dongia_ban').value;
  var phuphi = document.getElementById('phuphi').value;
  var loai_phuphi = document.getElementById('loai_phuphi').value;
    const sanpham = {
        "MA_ID": ma_sanpham,
        "MA_PHIEU": document.getElementById('ma_phieu').value,
        "LOAI_PHIEU": value_phieu,
        "TEN_SANPHAM": ten_sanpham,
        "TRANGTHAI": trangthai_sanpham,
        "LOAISANPHAM": loai_sanpham,
        "NOICUNGCAP": noi_cungcap,
        "SOLUONG": soluong,
        "DONGIA_NHAP": dongia_nhap,
        "DONGIA_BAN": dongia_ban,
        "DONVI_TINH": donvi,
        "PHUPHI": phuphi,
        "LOAI_PHUPHI": loai_phuphi,
        "AVT_SANPHAM": document.getElementById('value_avt_sanpham').value,
        "ID_KHO": id_kho
    }
    database.ref("SANPHAM").child(id_kho).set(sanpham);
}