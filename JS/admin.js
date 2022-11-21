id_admin =  localStorage.getItem("in_id_admin")
if(id_admin == undefined || id_admin == ""){
  window.location.href = '../HTML/login.html';
}
const timeout = setTimeout(hienthi_nv_realtime, 1000);
const audio = new Audio('../SOUND/notify.mp3');
function clr_addnv(){
  document.getElementById("tk_addnv").value = ""
  document.getElementById("mk_addnv").value = ""
  document.getElementById("mt_addnv").value = ""
  document.getElementById("file_avt").value = ""
}
function open_addnv (){
  clr_addnv();
  ranID = randomString(10);
  document.getElementById("id_addnv").innerHTML = ranID;
  document.getElementById('form_addnv').style.display = 'block'
 }
 function close_addnv(){
   document.getElementById('bg_body').style.backgroundColor = '#fff'
   document.getElementById('form_addnv').style.display = 'none'
 }
 function xoa_nv(){
  var id_nv = document.getElementById("id_nv").value
  swal({
		title: "Bạn chắc chắn muốn xóa?",
		text: "Bạn sẽ không thể hổi phục lại dữ liệu!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Đồng ý, xóa!',
		cancelButtonText: "Không, hủy yêu cầu!",
		closeOnConfirm: false,
		closeOnCancel: false
	},
	function(isConfirm){
    if (isConfirm){
      swal("Thành công!", "Dữ liệu đã được xóa!", "success");
      database.ref("NHANSU").child(id_nv).remove();
      database.ref("THONGTINCANHAN").child(id_nv).remove();
      database.ref("GIAOVIEC").child(id_nv).remove();
      database.ref("LICHSU_GIAOVIEC").child(id_nv).remove();
      back_home();
    } else {
      swal("Hủy", "Dữ liệu được bảo toàn!", "error");
    }
	});
    
 }
 function submit_addnv(){
  var tk_nv = document.getElementById("tk_addnv").value
  var mk_nv = document.getElementById("mk_addnv").value
  var mt_nv = document.getElementById("mt_addnv").value
   if((tk_nv.length && mk_nv.length)>4 && mt_nv.length> 29 
      && document.getElementById("file_avt").value!=""){
        database.ref("NHANSU").child(ranID).child("AVATAR").set(document.getElementById("v_avt").value);
         database.ref("NHANSU").child(ranID).child("TEN").set(tk_nv);
         database.ref("NHANSU").child(ranID).child("MATKHAU").set(mk_nv);
         database.ref("NHANSU").child(ranID).child("MOTA").set(mt_nv);
         database.ref("NHANSU").child(ranID).child("CHUCVU").set(document.getElementById("chucvu").value);
         database.ref("NHANSU").child(ranID).child("ID").set(ranID);
         database.ref("THONGTINCANHAN").child(ranID).child("CCCD").set("Chưa cập nhật");
         database.ref("THONGTINCANHAN").child(ranID).child("NGAYCAP").set("Chưa cập nhật");
         database.ref("THONGTINCANHAN").child(ranID).child("NOICAP").set("Chưa cập nhật");
         database.ref("THONGTINCANHAN").child(ranID).child("DCTHUONGTRU").set("Chưa cập nhật");
         database.ref("THONGTINCANHAN").child(ranID).child("DCHIENTAI").set("Chưa cập nhật");
         database.ref("THONGTINCANHAN").child(ranID).child("HONNHAN").set("Chưa cập nhật");
         database.ref("THONGTINCANHAN").child(ranID).child("DANTOC").set("Chưa cập nhật");
         database.ref("THONGTINCANHAN").child(ranID).child("TONGIAO").set("Chưa cập nhật");
         database.ref("THONGTINCANHAN").child(ranID).child("SOTK").set("Chưa cập nhật");
         database.ref("THONGTINCANHAN").child(ranID).child("TENTK").set("Chưa cập nhật");
         database.ref("THONGTINCANHAN").child(ranID).child("LOAINH").set("Chưa cập nhật");
         ranID = randomString(10);
         document.getElementById("id_addnv").innerHTML = ranID;
         swal("Tốt lắm!", "Đã thêm thành công một nhân viên!", "success");
         hienthi_nv_realtime();
         clr_addnv();
   }
 }
////////////////////////////// xem thông tin nhân viên
function open_tt_nv(id_nv,avt_nv, ten_nv, mota_cv, chucvu_nv){
 document.getElementById("form_tt_nv").style.display = "block";
 document.getElementById("avt_opennv").src = avt_nv;
 document.getElementById("id_nv").innerHTML = id_nv;
 document.getElementById("id_nv").value = id_nv;
 document.getElementById("ten_nv").innerHTML = ten_nv;
 document.getElementById("mota_cv").innerHTML = mota_cv;
 document.getElementById("chucvu_nv").innerHTML = chucvu_nv;
 database.ref("THONGTINCANHAN").child(id_nv).child("ID").set(id_nv);
 database.ref("THONGTINCANHAN").once('value', async function(snap) {
       var ketqualangnghe = await snap.val();
       for (var search_nhansu in ketqualangnghe) {
          id_nhanvien = ketqualangnghe[search_nhansu]
          var get_id_nv = id_nhanvien.ID
          var cccd  = id_nhanvien.CCCD
          var ngc_cccd  = id_nhanvien.NGAYCAP
          var nc_cccd  = id_nhanvien.NOICAP
          var diachi_tt  = id_nhanvien.DCTHUONGTRU
          var diachi_ht  = id_nhanvien.DCHIENTAI
          var tinhtrang_hn  = id_nhanvien.HONNHAN
          var dantoc  = id_nhanvien.DANTOC
          var tongiao  = id_nhanvien.TONGIAO
          var sotk_nganhang  = id_nhanvien.SOTK
          var chutk_nganhang  = id_nhanvien.TENTK
          var loai_nganhang  = id_nhanvien.LOAINH
          
          if(get_id_nv==id_nv){
          document.getElementById("thongtin_canhan").innerHTML = `
          <div class="row no-gutter">
            <div class="col l-2"><textmargin><label>CCCD</label></textmargin></div>
            <div class="col l-3"><textmargin><thongtin id="cccd">${cccd}</thongtin></textmargin></div>
            <div class="col l-1"><textmargin><label>Ngày cấp</label></textmargin></div>
            <div class="col l-3"><textmargin><thongtin id="ngc_cccd">${ngc_cccd}</thongtin></textmargin></div>
            <div class="col l-1"><textmargin><label>Nơi cấp</label></textmargin></div>
            <div class="col l-2"><textmargin><thongtin id="nc_cccd">${nc_cccd}</thongtin></textmargin></div>
          </div>
          <div class="row no-gutter">
          <div class="col l-2"><textmargin><label>Địa chỉ thường trú</label></textmargin></div>
          <div class="col l-10"><textmargin><thongtin id="diachi_tt">${diachi_tt}</thongtin></textmargin></div>
          </div>
          <div class="row no-gutter">
          <div class="col l-2"><textmargin><label>Địa chỉ hiện tại</label></textmargin></div>
          <div class="col l-10"><textmargin><thongtin id="diachi_ht">${diachi_ht}</thongtin></textmargin></div>
          </div>
          <div class="row no-gutter">
          <div class="col l-2"><textmargin><label>Tình trạng hôn nhân</label></textmargin></div>
          <div class="col l-3"><textmargin><thongtin id="tinhtrang_hn">${tinhtrang_hn}</thongtin></textmargin></div>
          <div class="col l-1"><textmargin><label>Dân tộc</label></textmargin></div>
          <div class="col l-3"><textmargin><thongtin id="dantoc">${dantoc}</thongtin></textmargin></div>
          <div class="col l-1"><textmargin><label>Tôn giáo</label></textmargin></div>
          <div class="col l-2"><textmargin><thongtin id="tongiao">${tongiao}</thongtin></textmargin></div>
          </div>
          <div class="row no-gutter">
          <div class="col l-2"><textmargin><label>Số tài khoản</label></textmargin></div>
          <div class="col l-3"><textmargin><thongtin id="sotk_nganhang">${sotk_nganhang}</thongtin></textmargin></div>
          <div class="col l-1"><textmargin><label>Chủ TK</label></textmargin></div>
          <div class="col l-3"><textmargin><thongtin id="chutk_nganhang">${chutk_nganhang}</thongtin></textmargin></div>
          <div class="col l-1"><textmargin><label>Ngân hàng</label></textmargin></div>
          <div class="col l-2"><textmargin><thongtin id="loai_nganhang">${loai_nganhang}</thongtin></textmargin></div>
          <div class="col l-o-10"><thongtin><button id="btn_luu_ttcn" onclick="luu_ttcn()" style="display: none;">Lưu thông tin cá nhân&ensp;<i class="fa-solid fa-check"></i></button></thongtin></div>
          </div>`
          }
        }
      });
      langnghe_cvg(id_nv);
    }

function back_home(){
  document.getElementById("form_tt_nv").style.display = "none";
  close_tiendo()
}
function sua_ttcn(){
  var id_nv = document.getElementById("id_nv").value
  database.ref("THONGTINCANHAN").child(id_nv).child("ID").set(id_nv);
  database.ref("THONGTINCANHAN").once('value', async function(snap) {
       var ketqualangnghe = await snap.val();
       for (var search_nhansu in ketqualangnghe) {
          id_nhanvien = ketqualangnghe[search_nhansu]
          var v_id_nv = id_nhanvien.ID
          var cccd  = id_nhanvien.CCCD
          var ngc_cccd  = id_nhanvien.NGAYCAP
          var nc_cccd  = id_nhanvien.NOICAP
          var diachi_tt  = id_nhanvien.DCTHUONGTRU
          var diachi_ht  = id_nhanvien.DCHIENTAI
          var tinhtrang_hn  = id_nhanvien.HONNHAN
          var dantoc  = id_nhanvien.DANTOC
          var tongiao  = id_nhanvien.TONGIAO
          var sotk_nganhang  = id_nhanvien.SOTK
          var chutk_nganhang  = id_nhanvien.TENTK
          var loai_nganhang  = id_nhanvien.LOAINH
          if(v_id_nv == id_nv){
            document.getElementById("cccd").innerHTML = `<input type="number" id="cccd${id_nv}"value="${cccd}">`
            document.getElementById("ngc_cccd").innerHTML = `<input id="ngc_cccd${id_nv}" type="date" value="${ngc_cccd}">`
            document.getElementById("nc_cccd").innerHTML = `<input id="nc_cccd${id_nv}" value="${nc_cccd}">`
            document.getElementById("diachi_tt").innerHTML = `<input id="diachi_tt${id_nv}" value="${diachi_tt}">`
            document.getElementById("diachi_ht").innerHTML = `<input id="diachi_ht${id_nv}" value="${diachi_ht}">`
            document.getElementById("tinhtrang_hn").innerHTML = `<input id="tinhtrang_hn${id_nv}" value="${tinhtrang_hn}">`
            document.getElementById("dantoc").innerHTML = `<input id="dantoc${id_nv}" value="${dantoc}">`
            document.getElementById("tongiao").innerHTML = `<input id="tongiao${id_nv}" value="${tongiao}">`
            document.getElementById("sotk_nganhang").innerHTML = `<input id="sotk_nganhang${id_nv}" value="${sotk_nganhang}">`
            document.getElementById("chutk_nganhang").innerHTML = `<thongtin><input id="chutk_nganhang${id_nv}" value="${chutk_nganhang}"></thongtin>`
            document.getElementById("loai_nganhang").innerHTML = `<thongtin><input id="loai_nganhang${id_nv}" value="${loai_nganhang}"></thongtin>`
            document.getElementById("btn_luu_ttcn").style.display = "block"
          }
          
      }
    });
 
}
function luu_ttcn(){
  var id_nv = document.getElementById("id_nv").value
  var cccd = "cccd"+id_nv
  var ngc_cccd = "ngc_cccd"+id_nv
  var nc_cccd = "nc_cccd"+id_nv
  var diachi_tt = "diachi_tt"+id_nv
  var diachi_ht = "diachi_ht"+id_nv
  var tinhtrang_hn = "tinhtrang_hn"+id_nv
  var dantoc = "dantoc"+id_nv
  var tongiao = "tongiao"+id_nv
  var sotk_nganhang = "sotk_nganhang"+id_nv
  var chutk_nganhang = "chutk_nganhang"+id_nv
  var loai_nganhang = "loai_nganhang"+id_nv

  var v_cccd = document.getElementById(cccd).value
  var v_ngc_cccd = document.getElementById(ngc_cccd).value
  var v_nc_cccd = document.getElementById(nc_cccd).value
  var v_diachi_tt = document.getElementById(diachi_tt).value
  var v_diachi_ht = document.getElementById(diachi_ht).value
  var v_tinhtrang_hn = document.getElementById(tinhtrang_hn).value
  var v_dantoc = document.getElementById(dantoc).value
  var v_tongiao = document.getElementById(tongiao).value
  var v_sotk_nganhang = document.getElementById(sotk_nganhang).value
  var v_chutk_nganhang = document.getElementById(chutk_nganhang).value
  var v_loai_nganhang = document.getElementById(loai_nganhang).value

  database.ref("THONGTINCANHAN").child(id_nv).child("CCCD").set(v_cccd);
  database.ref("THONGTINCANHAN").child(id_nv).child("NGAYCAP").set(v_ngc_cccd);
  database.ref("THONGTINCANHAN").child(id_nv).child("NOICAP").set(v_nc_cccd);
  database.ref("THONGTINCANHAN").child(id_nv).child("DCTHUONGTRU").set(v_diachi_tt);
  database.ref("THONGTINCANHAN").child(id_nv).child("DCHIENTAI").set(v_diachi_ht);
  database.ref("THONGTINCANHAN").child(id_nv).child("HONNHAN").set(v_tinhtrang_hn);
  database.ref("THONGTINCANHAN").child(id_nv).child("DANTOC").set(v_dantoc);
  database.ref("THONGTINCANHAN").child(id_nv).child("TONGIAO").set(v_tongiao);
  database.ref("THONGTINCANHAN").child(id_nv).child("SOTK").set(v_sotk_nganhang);
  database.ref("THONGTINCANHAN").child(id_nv).child("TENTK").set(v_chutk_nganhang);
  database.ref("THONGTINCANHAN").child(id_nv).child("LOAINH").set(v_loai_nganhang);
  document.getElementById("btn_luu_ttcn").style.display = "none"

  document.getElementById("cccd").innerHTML = `<thongtin id="cccd">${v_cccd}</thongtin>`
  document.getElementById("ngc_cccd").innerHTML = `<thongtin id="cccd">${v_ngc_cccd}</thongtin>`
  document.getElementById("nc_cccd").innerHTML = `<thongtin id="cccd">${v_nc_cccd}</thongtin>`
  document.getElementById("diachi_tt").innerHTML = `<thongtin id="cccd">${v_diachi_tt}</thongtin>`
  document.getElementById("diachi_ht").innerHTML = `<thongtin id="cccd">${v_diachi_ht}</thongtin>`
  document.getElementById("tinhtrang_hn").innerHTML = `<thongtin id="cccd">${v_tinhtrang_hn}</thongtin>`
  document.getElementById("dantoc").innerHTML = `<thongtin id="cccd">${v_dantoc}</thongtin>`
  document.getElementById("tongiao").innerHTML = `<thongtin id="cccd">${v_tongiao}</thongtin>`
  document.getElementById("sotk_nganhang").innerHTML = `<thongtin id="cccd">${v_sotk_nganhang}</thongtin>`
  document.getElementById("chutk_nganhang").innerHTML = `<thongtin id="cccd">${v_chutk_nganhang}</thongtin>`
  document.getElementById("loai_nganhang").innerHTML = `<thongtin id="cccd">${v_loai_nganhang}</thongtin>`

}

function hienthi_nv_realtime() {
  document.getElementById("danhsach_nv").innerHTML = ""
  const reader_avt = new FileReader();   // Khởi tạo đối tượng FileReader
  // Lắng nghe trạng thái đăng tải tệp
  document.getElementById("file_avt").addEventListener("change", (event) => {
    const files  = event.target.files;    // Đọc thông tin tập tin đã được đăng tải
    const getSizeImage = files[0].size; // kiểm tra kích thước file 
    reader_avt.readAsDataURL(files[0]) // Lắng nghe quá trình đọc tập tin hoàn thành

    // kiểm tra kích thước hình ảnh (500KB)
   // console.log(getSizeImage)
    if (getSizeImage > (500*500)) {
        swal("Kích thước tối đa là 500KB!", "Bạn đang tải lên tệp quá dung lượng", "error");
        document.getElementById("file_avt").value = "";
    } else {
      swal("Thành công!", "Tệp đã được tải lên", "success");
      reader_avt.addEventListener("load", (event) => {
        // Lấy chuỗi Binary thông tin hình ảnh
        const img = event.target.result;
        document.getElementById("v_avt").value = img
       // database.ref("NHANSU").child(ranID).child("AVATAR").set(img);
      })
    }
  })
  /////////////////// lăng nghe kết quả trả về data nhân sự
  database.ref("NHANSU").on('value', async function(snap) {
       var ketqualangnghe = await snap.val();
       document.getElementById("danhsach_nv").innerHTML = ""
       for (var search_nhansu in ketqualangnghe) {
          id_nhanvien = ketqualangnghe[search_nhansu]
          var ten_nv = id_nhanvien.TEN
          var mk_nv = id_nhanvien.MATKHAU
          var mota_cv = id_nhanvien.MOTA
          var chucvu_nv = id_nhanvien.CHUCVU
          var id_nv = id_nhanvien.ID
          var avt_nv = id_nhanvien.AVATAR
          if((ten_nv && mk_nv && mota_cv) != undefined){
            document.getElementById("danhsach_nv").innerHTML +=
            `<div class="nhanvien col l-2" onclick="open_tt_nv('${id_nv}', '${avt_nv}','${ten_nv}','${mota_cv}', '${chucvu_nv}')">
                <img src="${avt_nv}"class="avt" style="display:block">
                <h1 style="color: #1a2319">ID: ${id_nv}</h1> 
                <p>${ten_nv}</p>
                <p>${chucvu_nv}</p>
            </div>`
          }
         
       }
   });
}
function langnghe_cvg(id_nv){
  document.getElementById("ten_cvg").innerHTML=`<option value="">Lựa chọn công việc</option>`

  ////////////////////////////// lấy thông tin giao việc từ CSDL về web admin
  database.ref("GIAOVIEC").on('value', async function(snap) {
    var ketqualangnghe = await snap.val();
    document.getElementById("dscv_update").innerHTML = ""
    /////////////// tìm kiếm id nhân viên
    for (var search_nhanvien in ketqualangnghe) {
      var search_nvid = ketqualangnghe[search_nhanvien]
      if(search_nhanvien==id_nv){
     //   console.log(search_nhanvien) // id nhân viên 102J7B8y6T
        //////////////// tìm kiếm id công việc;
          for (var search_macv in search_nvid) {
            var id_cvg = search_nvid[search_macv]
         //   console.log(search_macv) // id công việc
           // console.log(id_giaoviec)
            var ten_cvg = id_cvg.TENCV
            var gs_cvg = id_cvg.GIAMSAT
            var ht_cvg = id_cvg.HOTRO
            var db_cvg = id_cvg.TIMEBATDAU
            var de_cvg = id_cvg.DEADLINE
            var mt_cvg = id_cvg.CV_GIAOMT
            var du_cvg = id_cvg.TIMECAPNHAT
            var tiendo = id_cvg.TIENDO
            var yeucau_ht = id_cvg.YEUCAUHOTRO
            var nguoinhan_bc = id_cvg.NGUOINHANBAOCAO
            var tinhtrangcv = id_cvg.TINHTRANG
            var thoigianbaocao = id_cvg.THOIGIANBAOCAO
            //console.log(search_macv) // id công việc
            document.getElementById("ten_cvg").innerHTML+=`<option value="gv${search_macv}">${ten_cvg}</option>`
            ////////////////////// lắng nghe kết quả trả về data công việc
            document.getElementById("dscv_update").innerHTML +=  `<label style="background-color:#424242;padding: 6px;"><button onclick="xembaocao('${tiendo}','${mt_cvg}','${yeucau_ht}', '${nguoinhan_bc}',  '${tinhtrangcv}', '${thoigianbaocao}','${search_macv}')">Xem báo cáo</button>&emsp;${ten_cvg}</label>
                                                                  <div class="row no-gutter header_phanmuc">
                                                                    <div class="col l-2"><textmargin><thongtin>Giám sát</thongtin></textmargin></div>
                                                                    <div class="col l-2"><textmargin><thongtin>Hỗ trợ</thongtin></textmargin></div>    
                                                                    <div class="col l-2"><textmargin><thongtin>Thời gian cập nhật</thongtin></textmargin></div>
                                                                    <div class="col l-2"><textmargin><thongtin>Bắt đầu</thongtin></textmargin></div>
                                                                    <div class="col l-2"><textmargin><thongtin>Kết thúc</thongtin></textmargin></div>
                                                                    <div class="col l-2"><textmargin><thongtin>Yêu cầu</thongtin></textmargin></div>
                                                                  </div>
                                                                  <div class="row no-gutter">
                                                                    <div class="col l-2"><textmargin><label>${gs_cvg}</label></textmargin></div>
                                                                    <div class="col l-2"><textmargin><label>${ht_cvg}</label></textmargin></div>            
                                                                    <div class="col l-2"><textmargin><label>${du_cvg}</label></textmargin></div>
                                                                    <div class="col l-2"><textmargin><label>${db_cvg}</label></textmargin></div>   
                                                                    <div class="col l-2"><textmargin><label>${de_cvg}</label></textmargin></div>
                                                                    <div class="col l-2" style=" max-height: 10em;overflow: auto; text-align:justify"><textmargin><label>${mt_cvg}</label></textmargin></div>
                                                                  </div>`
          }  
      }
    }
  });
  langnghe_his_cv(id_nv)
}

function langnghe_his_cv(id_nv){
  document.getElementById("his_update").innerHTML = ""
  database.ref("LICHSU_GIAOVIEC").child(id_nv).once('value', async function(snap) {
    var ketqualangnghe = await snap.val();
    for (var search_macv in ketqualangnghe) {
      var id_macv = ketqualangnghe[search_macv]
      var ten_cv_his = id_macv.TENCV
    //  console.log(ten_cv_his)
   //   console.log(search_macv) // mã công việc
      document.getElementById("his_update").innerHTML += `<label style="background-color:#40910a;padding: 6px;width:100%">${ten_cv_his}</label>
      <div class="row no-gutter header_phanmuc">
        <div class="col l-2"><textmargin><thongtin>Giám sát</thongtin></textmargin></div>
        <div class="col l-2"><textmargin><thongtin>Hỗ trợ</thongtin></textmargin></div>    
        <div class="col l-2"><textmargin><thongtin>Thời gian cập nhật</thongtin></textmargin></div>
        <div class="col l-2"><textmargin><thongtin>Bắt đầu</thongtin></textmargin></div>
        <div class="col l-2"><textmargin><thongtin>Kết thúc</thongtin></textmargin></div>
        <div class="col l-2"><textmargin><thongtin>Mô tả</thongtin></textmargin></div>
      </div>
      <div class="row no-gutter" id="ds${search_macv}"></div>`

       // console.log(ketquagiaoviec) 
        for (var search_malichsu in id_macv) {
          if(search_malichsu != "TENCV"){
              //  console.log(search_malichsu) // mã lịch sử công việc
              var id_giaoviec = id_macv[search_malichsu]
              var ten_cv_his = id_giaoviec.TENCV
              var gs_cvg_his = id_giaoviec.GIAMSAT
              var ht_cvg_his = id_giaoviec.HOTRO
              var db_cvg_his = id_giaoviec.TIMEBATDAU
              var de_cvg_his = id_giaoviec.DEADLINE
              var du_cvg_his = id_giaoviec.TIMECAPNHAT
              var mt_cvg_his = id_giaoviec.CV_GIAOMT
              const id_timkiem = "ds"+search_macv
              document.getElementById(id_timkiem).innerHTML += `  <div class="col l-2"><textmargin><label>${gs_cvg_his}</label></textmargin></div>
                                                                  <div class="col l-2"><textmargin><label>${ht_cvg_his}</label></textmargin></div>            
                                                                  <div class="col l-2"><textmargin><label>${du_cvg_his}</label></textmargin></div>
                                                                  <div class="col l-2"><textmargin><label>${db_cvg_his}</label></textmargin></div>   
                                                                  <div class="col l-2"><textmargin><label>${de_cvg_his}</label></textmargin></div>
                                                                  <div class="col l-2" style=" max-height: 10em;overflow: auto; text-align:justify"><textmargin><label>${mt_cvg_his}</label></textmargin>` 
            
          } 
        }
    }
  });
}



function giaoviec(){
  var id_nv = document.getElementById("id_nv").value
  var ten_cv = document.getElementById("ten_cv").value
  var cv_giaomt = document.getElementById("cv_giaomt").value
  // var cv_giaomtk = document.getElementById("cv_giaomtk").value
  var date_begin = document.getElementById("date_begin").value
  var date_end = document.getElementById("date_end").value
  var dc_lam = document.getElementById("dc_lam").value
  var hotro_cv = document.getElementById("hotro_cv").value
  var giamsat_cv = document.getElementById("giamsat_cv").value
  var file_cv = document.getElementById("file_cv").value
  var date_update = (new Date()).toString().slice(4, 24);

  if(date_begin<date_end){
    if((ten_cv && cv_giaomt /*&& cv_giaomtk*/ && date_begin && date_end && dc_lam && hotro_cv && giamsat_cv)!=""){
      var tmp_dem = randomString(10);
      document.getElementById('form_giaoviec').addEventListener('submit', function(){
        database.ref("GIAOVIEC").child(id_nv).child(tmp_dem).child("TENCV").set(ten_cv);
        database.ref("GIAOVIEC").child(id_nv).child(tmp_dem).child("CV_GIAOMT").set(cv_giaomt);
        // database.ref("GIAOVIEC").child(id_nv).child(tmp_dem).child("CV_MOTAKHAC").set(cv_giaomtk);
        database.ref("GIAOVIEC").child(id_nv).child(tmp_dem).child("TIMEBATDAU").set(date_begin);
        database.ref("GIAOVIEC").child(id_nv).child(tmp_dem).child("DEADLINE").set(date_end);
        database.ref("GIAOVIEC").child(id_nv).child(tmp_dem).child("DIACHILAM").set(dc_lam);
        database.ref("GIAOVIEC").child(id_nv).child(tmp_dem).child("HOTRO").set(hotro_cv);
        database.ref("GIAOVIEC").child(id_nv).child(tmp_dem).child("GIAMSAT").set(giamsat_cv);
        database.ref("GIAOVIEC").child(id_nv).child(tmp_dem).child("FILE").set(file_cv);
        database.ref("GIAOVIEC").child(id_nv).child(tmp_dem).child("TIMECAPNHAT").set(date_update);
        database.ref("GIAOVIEC").child(id_nv).child(tmp_dem).child("TIENDO").set("Chưa cập nhật");
        database.ref("GIAOVIEC").child(id_nv).child(tmp_dem).child("YEUCAUHOTRO").set("Chưa cập nhật");
        database.ref("GIAOVIEC").child(id_nv).child(tmp_dem).child("NGUOINHANBAOCAO").set("Chưa cập nhật");
        database.ref("GIAOVIEC").child(id_nv).child(tmp_dem).child("TINHTRANG").set("Chưa cập nhật");
        database.ref("GIAOVIEC").child(id_nv).child(tmp_dem).child("THOIGIANBAOCAO").set("Chưa cập nhật");
        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        database.ref("GIAOVIEC").child(id_nv).child(tmp_dem).child("TRANGTHAIGIAOVIEC").set("1");
        swal("Đã giao việc!", "Công việc đã được cập nhật", "success");
        /////////// clr 
        document.getElementById("ten_cv").value = ""
        document.getElementById("cv_giaomt").value = ""
        // document.getElementById("cv_giaomtk").value = ""
        document.getElementById("date_begin").value = ""
        document.getElementById("date_end").value = ""
        document.getElementById("dc_lam").value = ""
        document.getElementById("hotro_cv").value = ""
        document.getElementById("giamsat_cv").value = ""
        document.getElementById("file_cv").value = ""
        //////////////////// hiển thị công việc
    });
    }  
  }  if(date_begin>=date_end)  swal("Sai thông tin!", "Vui lòng cập nhật lại thông tin", "error");
}
function select_mota(obj){
  var mota = document.getElementById('cvg_motac');
  var date_begin_update = document.getElementById('date_begin_update'); 
  var date_end_update = document.getElementById('date_end_update'); 
  var dc_lam_update = document.getElementById('dc_lam_update'); 
  var hotro_cv_update = document.getElementById('hotro_cv_update'); 
  var giamsat_cv_update = document.getElementById('giamsat_cv_update'); 
 // var file_cv_update = document.getElementById('file_cv_update'); 
  var v_select_cv = obj.value;
  var id_nv = document.getElementById("id_nv").value
  var id_cvg_select = v_select_cv.slice(2,12)

  document.getElementById('id_cvg').value = id_cvg_select

  database.ref("GIAOVIEC").child(id_nv).child(id_cvg_select).once('value', async function(snap) {
    var ketqualangnghe = await snap.val();
    var ten_cv = ketqualangnghe.TENCV
    var cv_giaomt = ketqualangnghe.CV_GIAOMT
    var date_begin = ketqualangnghe.TIMEBATDAU
    var date_end = ketqualangnghe.DEADLINE
    var dc_lam = ketqualangnghe.DIACHILAM
    var hotro_cv = ketqualangnghe.HOTRO
    var giamsat_cv = ketqualangnghe.GIAMSAT
    var time_update = ketqualangnghe.TIMECAPNHAT
  //  var file_cv_upd = ketqualangnghe.FILE
    document.getElementById('tmp_data_sgv').innerHTML = `<div id="ten${id_cvg_select}">${ten_cv}</div>
                                                         <div id="db${id_cvg_select}">${date_begin}</div>
                                                         <div id="de${id_cvg_select}">${date_end}</div>
                                                         <div id="dc${id_cvg_select}">${dc_lam}</div>
                                                         <div id="ht${id_cvg_select}">${hotro_cv}</div>
                                                         <div id="gs${id_cvg_select}">${giamsat_cv}</div>
                                                         <div id="tu${id_cvg_select}">${time_update}</div>`
                                      
    mota.innerHTML = cv_giaomt;
    date_begin_update.value = date_begin;
    date_end_update.value = date_end
    dc_lam_update.value = dc_lam
    hotro_cv_update.value = hotro_cv
    giamsat_cv_update.value = giamsat_cv
 //   file_cv_update.value = file_cv_upd
  });
}
function xacnhan_sua_giaoviec(){
  var avt_nv = document.getElementById("avt_opennv").src;
  var ten_nv = document.getElementById("ten_nv").innerText;
  var mota_cv_cn = document.getElementById("mota_cv").innerText;
  var chucvu_nv = document.getElementById("chucvu_nv").innerText;
  var ma_update = randomString(10);
  var id_nv = document.getElementById("id_nv").value
  var id_cvg_select = document.getElementById('id_cvg').value
  ////////////////// data cũ để cập nhật lịch sử
  var id_db = "db"+id_cvg_select /////id
  var id_ten = "ten"+id_cvg_select
  var id_de = "de"+id_cvg_select
  var id_dc = "dc"+id_cvg_select
  var id_ht = "ht"+id_cvg_select
  var id_gs = "gs"+id_cvg_select
  var id_tu = "tu"+id_cvg_select

  var mt_cv_his =   document.getElementById('cvg_motac').value;  /// value
  var date_begin_his =  document.getElementById(id_db).innerText
  var date_end_his =  document.getElementById(id_de).innerText
  var dc_his =  document.getElementById(id_dc).innerText
  var hotro_his =  document.getElementById(id_ht).innerText
  var giamsat_his =  document.getElementById(id_gs).innerText
  var timeupdate_his = document.getElementById(id_tu).innerText
  var ten_cv = document.getElementById(id_ten).innerText
  
    //// data mới
    var cv_giaomt = document.getElementById("cvg_mota_update").value
    var date_begin = document.getElementById("date_begin_update").value
    var date_end = document.getElementById("date_end_update").value
    var dc_lam = document.getElementById("dc_lam_update").value
    var hotro_cv = document.getElementById("hotro_cv_update").value
    var giamsat_cv = document.getElementById("giamsat_cv_update").value
    var date_update = (new Date()).toString().slice(4, 24);

    //////////////////////////////  
  if(date_begin<date_end){
    if((cv_giaomt && date_begin && date_end && dc_lam && hotro_cv && giamsat_cv)!=""){

      document.getElementById('form_sua_giaoviec').addEventListener('submit', function(){
        database.ref("GIAOVIEC").child(id_nv).child(id_cvg_select).child("CV_GIAOMT").set(cv_giaomt);
        database.ref("GIAOVIEC").child(id_nv).child(id_cvg_select).child("TIMEBATDAU").set(date_begin);
        database.ref("GIAOVIEC").child(id_nv).child(id_cvg_select).child("DEADLINE").set(date_end);
        database.ref("GIAOVIEC").child(id_nv).child(id_cvg_select).child("DIACHILAM").set(dc_lam);
        database.ref("GIAOVIEC").child(id_nv).child(id_cvg_select).child("HOTRO").set(hotro_cv);
        database.ref("GIAOVIEC").child(id_nv).child(id_cvg_select).child("GIAMSAT").set(giamsat_cv);
        database.ref("GIAOVIEC").child(id_nv).child(id_cvg_select).child("FILE").set(file_cv);
        database.ref("GIAOVIEC").child(id_nv).child(id_cvg_select).child("TIMECAPNHAT").set(date_update);
        /////// lịch sử cập nhật
        database.ref("LICHSU_GIAOVIEC").child(id_nv).child(id_cvg_select).child(ma_update).child("CV_GIAOMT").set(mt_cv_his); //oke
        database.ref("LICHSU_GIAOVIEC").child(id_nv).child(id_cvg_select).child(ma_update).child("TIMEBATDAU").set(date_begin_his);
        database.ref("LICHSU_GIAOVIEC").child(id_nv).child(id_cvg_select).child(ma_update).child("DEADLINE").set(date_end_his);
        database.ref("LICHSU_GIAOVIEC").child(id_nv).child(id_cvg_select).child(ma_update).child("DIACHILAM").set(dc_his);
        database.ref("LICHSU_GIAOVIEC").child(id_nv).child(id_cvg_select).child(ma_update).child("HOTRO").set(hotro_his);
        database.ref("LICHSU_GIAOVIEC").child(id_nv).child(id_cvg_select).child(ma_update).child("GIAMSAT").set(giamsat_his);
        database.ref("LICHSU_GIAOVIEC").child(id_nv).child(id_cvg_select).child(ma_update).child("TIMECAPNHAT").set(timeupdate_his);
        database.ref("LICHSU_GIAOVIEC").child(id_nv).child(id_cvg_select).child(ma_update).child("TENCV").set(ten_cv);
        database.ref("LICHSU_GIAOVIEC").child(id_nv).child(id_cvg_select).child("TENCV").set(ten_cv);
        swal("Đã giao việc!", "Công việc đã được cập nhật", "success");
        /////////// clr 
        document.getElementById("cvg_motac").innerHTML = ""
        document.getElementById("date_begin_update").value = ""
        document.getElementById("date_end_update").value = ""
        document.getElementById("dc_lam_update").value = ""
        document.getElementById("hotro_cv_update").value = ""
        document.getElementById("giamsat_cv_update").value = ""
    //    document.getElementById("file_cv_update").value = ""
        open_tt_nv(id_nv, avt_nv, ten_nv, mota_cv_cn, chucvu_nv)
    });
    }  
  }  if(date_begin>=date_end)  swal("Sai thông tin!", "Vui lòng cập nhật lại thông tin", "error");

}
////////////////////////////////////////////////////////////////////////////
function xembaocao(tiendo, yeucau, yeucau_ht, nguoinhan_bc, tinhtrangcv, thoigianbaocao, macv){
  document.getElementById('form_tt_nv').scrollTo({left: 0,
                                                  top: 0,
                                                  behavior: 'smooth'
                                                });
  
  let id_nguoiht = yeucau_ht.split("*") /////////////////////tách chuỗi
  let id_nguoinhanbc = nguoinhan_bc.split("*")
  var yeucau_nht =""
  var nguoinhanbc =""
 
      
    database.ref("NHANSU").on('value', async function(snap) {
      var ketqualangnghe = await snap.val();

      for (var search_nhansu in ketqualangnghe) {
         id_nhanvien = ketqualangnghe[search_nhansu]
         var ten_nv = id_nhanvien.TEN
         var id_nv = id_nhanvien.ID
         for (var i=0; i<id_nguoiht.length; i++){
            if (id_nguoiht[i]==id_nv){
              yeucau_nht += `<i class="fa-solid fa-user"></i>&ensp;` + ten_nv  + "&emsp;"
            }
          }
          for (var i=0; i<id_nguoinhanbc.length; i++){
            if (id_nguoinhanbc[i]==id_nv){
              nguoinhanbc += `<i class="fa-solid fa-user"></i>&ensp;` + ten_nv  + "&emsp;"
            }   
          }
    }
       
    document.getElementById('display_bc').style.display = "block"
    document.getElementById('display_bc').innerHTML = `<div class="grid wide">
                                                <i class="fa-solid fa-x close-fa-x" onclick="close_tiendo()"></i>
                                                <div class="row no-gutter">  
                                                  <div class="col l-12"><text_header1>&emsp;|&emsp;Tiến độ công việc hiện tại</text_header1></div>
                                                  <div class="col l-6"><textmargin><thongtin ><i class="fa-solid fa-clipboard-list">&emsp;</i>Nội dung báo cáo</thongtin></textmargin></div> 
                                                  <div class="col l-6"><textmargin><thongtin >Yêu cầu công việc</thongtin></textmargin></div>          
                                                  <div class="col l-6"><textmargin><textarea disabled>${tiendo}</textarea></textmargin></div>
                                                  <div class="col l-6"><textmargin><textarea disabled>${yeucau}</textarea></textmargin></div>
                                                  <div class="col l-12"><textmargin><thongtin ><i class="fa-solid fa-code-pull-request"></i>&emsp;Yêu cầu người hỗ trợ</thongtin></textmargin></div>
                                                  <div class="col l-12"><button class="btn-manhotro">${yeucau_nht}</button></div>
                                                  <div class="col l-12"><textmargin><thongtin ><i class="fa-solid fa-share"></i>&emsp;Báo cáo đã gửi đến</thongtin></textmargin></div>
                                                  <div class="col l-12"><button class="btn-manhotro">${nguoinhanbc}</button></div>
                                                  <div class="col l-3"><textmargin><thongtin ><i class="fa-solid fa-battery-half"></i>&emsp;Tình trạng công việc</thongtin></textmargin></div>
                                                  <div class="col l-9"><textmargin><thongtin ><i class="fa-regular fa-clock"></i>&emsp;Thời gian báo cáo</thongtin></textmargin></div>
                                                  <div class="col l-3"><button class="btn-manhotro">${tinhtrangcv}</button></div>
                                                  <div class="col l-9"><button class="btn-manhotro">${thoigianbaocao}</button></div>
                                                  <div class="col l-12"><textmargin><text_header1 >&emsp;|&emsp;Lịch sử cập nhật tiến độ</text_header1></textmargin></div>
                                                </div>
                                            
                                                <div class="row no-gutter">
                                                  <div class="col l-12"> 
                                           
                                                    <table id="table_bc" width="100%">
                                                      <input  type="search" onkeyup="search()" id="inputsearch" class="search-input" style="background:#fff;border: 1px solid #333; color:#000"placeholder="Tìm kiếm...">
                                                      <tr class="header">
                                                        <th colspan="3" aria-sort="ascending" onclick="sortTable(0, '${macv}')">Thời gian cập nhật</th>
                                                        <th colspan="2" aria-sort="ascending" onclick="sortTable(1, '${macv}')">Tình trạng</th>
                                                        <th colspan="3" aria-sort="ascending" onclick="sortTable(2, '${macv}')">Yêu cầu hỗ trợ</th>
                                                        <th colspan="3" aria-sort="ascending" onclick="sortTable(3, '${macv}')">Người nhận báo cáo</th>
                                                        <th colspan="4" aria-sort="ascending" onclick="sortTable(4, '${macv}')">Nội dung báo cáo</th>
                                                        <th colspan="1" aria-sort="ascending" onclick="sortTable(5, '${macv}')">Viết đánh giá</th>
                                                      </tr>
                                                    </table>
                                                  </div>
                                                </div>
                                              </div>`
                                         
          
     ///////////////////////////////////////// tìm lịch sử 
     var id_nv = document.getElementById("id_nv").value

  
     database.ref("LICHSU_TIENDO").child(id_nv).once('value', async function(snap) {
       var ketqualangnghe = await snap.val();
       for (var search_macv in ketqualangnghe) {
          var id_macv = ketqualangnghe[search_macv]
          if (macv == search_macv){
           for (var search_bchis in id_macv) {
             var id_mabc = id_macv[search_bchis]
             let nguoinhan_his = id_mabc.NGUOINHANBAOCAO
             let yeucauht_his = id_mabc.YEUCAUHOTRO
             let tiendo_his = id_mabc.TIENDO
             let tinhtrang_his = id_mabc.TINHTRANG
             let thoigiaobc_his = id_mabc.THOIGIANBAOCAO
             let nhanxet = id_mabc.DANHGIA
             let id_nguoiht_h = yeucauht_his.split("*") /////////////////////tách chuỗi
             let id_nguoinhanbc_h = nguoinhan_his.split("*")
             let yeucau_nht_h =""
             let nguoinhanbc_h =""
             let ma_bc_his = search_bchis
             if(nhanxet == undefined){
              database.ref("LICHSU_TIENDO").child(id_nv).child(macv).child(ma_bc_his).child("DANHGIA").set("Chưa có đánh giá");
             }  
             database.ref("NHANSU").once('value', async function(snap) {
              var ketqualangnghe = await snap.val();
        
              for (var search_nhansu in ketqualangnghe) {
                 id_nhanvien = ketqualangnghe[search_nhansu]
                 var ten_nv = id_nhanvien.TEN
                 let id_nv = id_nhanvien.ID

                  for (var i=0; i<id_nguoiht_h.length; i++){
                  if (id_nguoiht_h[i]==id_nv){
                    yeucau_nht_h += `<textmargin><p><i class="fa-solid fa-user"></i>&emsp;${ten_nv}</p></textmargin>`

                   
                  }
                }
               
                for (var i=0; i<id_nguoinhanbc_h.length; i++){
                  if (id_nguoinhanbc_h[i]==id_nv){
                    nguoinhanbc_h += `<textmargin><p><i class="fa-solid fa-user"></i>&emsp;${ten_nv}</p></textmargin>`
                  }   
                }
              }
              if(thoigiaobc_his!= "Chưa cập nhật"){
                document.getElementById("table_bc").innerHTML += `<tr><td colspan="3">${thoigiaobc_his}</td>
                <td colspan="2">${tinhtrang_his}</td>
                <td colspan="3">${yeucau_nht_h}</td>
                <td colspan="3">${nguoinhanbc_h}<br></td>
                <td colspan="4" style="text-align:justify;max-width:31.25em">${tiendo_his}</td>
                <td colspan="1">
                  <textarea id="nx${ma_bc_his}" placeholder="Nhận xét" style="height: auto;" onkeyup="get_nhanxet(this.value,'${id_nv}', '${macv}', '${ma_bc_his}')">${nhanxet}</textarea>
                </td>
              </tr>`      
              } 
                                           
            })                                
           }
         }
       }
      })
    })
                                            
}
function close_tiendo(){
  document.getElementById('display_bc').style.display = "none"
}
function get_nhanxet(giatri_nhap, id_nv, macv, ma_bc_his){
 database.ref("LICHSU_TIENDO").child(id_nv).child(macv).child(ma_bc_his).child("DANHGIA").set(giatri_nhap);
}
function dangxuat(){
  swal({
        title: "Xác nhận đăng xuất",
        showCancelButton: true,
        confirmButtonColor: '#DD3435',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: "Không, hủy yêu cầu!",
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function(isConfirm){
    if (isConfirm){
        localStorage.clear();
        window.location.href = '../HTML/login.html';
    }
    });
}