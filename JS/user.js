iduser =  localStorage.getItem("in_id")
console.log(iduser)
if(iduser == undefined || iduser == ""){
  window.location.href = '../HTML/login.html';
}
hienthi_user()
function hienthi_user() {
    langnghe_nhansu()
    document.getElementById("ht_user").innerHTML = ""
    database.ref("NHANSU").once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        for (var seach_nhansu in ketqualangnghe) {
            id_nhanvien = ketqualangnghe[seach_nhansu]
            var tk_nv = id_nhanvien.TEN
       //     var mk_nv = id_nhanvien.MATKHAU
            var avt_opennv = id_nhanvien.AVATAR
            var chucvu_nv = id_nhanvien.CHUCVU
            var id_nv = id_nhanvien.ID
            var mota_nv = id_nhanvien.MOTA
            if(id_nv == iduser){
                document.getElementById("avt_opennv").src = avt_opennv;
                document.getElementById("ten_nv").innerHTML = tk_nv
                document.getElementById("id_nv").innerHTML = id_nv
                document.getElementById("chucvu_nv").innerHTML = chucvu_nv
                document.getElementById("mota_cv").innerHTML = mota_nv
            }
            
        }
    });
    langnghe_cvg(iduser)
 }
function langnghe_cvg(iduser){
  //  document.getElementById("ten_cvg").innerHTML=`<option value="">Lựa chọn công việc</option>`
    ////////////////////////////// lấy thông tin giao việc từ CSDL về web
    database.ref("GIAOVIEC").on('value', async function(snap) {
      var ketqualangnghe = await snap.val();
      document.getElementById("dscv_update").innerHTML = ""
      document.getElementById("ten_cvg").innerHTML = `<option value="">Lựa chọn công việc</option>`
      /////////////// tìm kiếm id nhân viên
      for (var search_nhanvien in ketqualangnghe) {
        var search_nvid = ketqualangnghe[search_nhanvien]
        if(search_nhanvien==iduser){
          //////////////// tìm kiếm id công việc;
            for (var search_macv in search_nvid) {
              var id_cvg = search_nvid[search_macv]
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
              var trangthaigvm = id_cvg.TRANGTHAIGIAOVIEC
            
              //console.log(search_macv) // id công việc
              document.getElementById("ten_cvg").innerHTML+=`<option value="gv${search_macv}">${ten_cvg}</option>`
              ////////////////////// lắng nghe kết quả trả về data công việc
              document.getElementById("dscv_update").innerHTML +=  `<label style="background-color:#424242;padding: 6px;"><button style="padding: 2px;" onclick="xembaocao('${tiendo}','${mt_cvg}','${yeucau_ht}', '${nguoinhan_bc}',  '${tinhtrangcv}', '${thoigianbaocao}','${search_macv}')">Xem nhận xét</button>&emsp;${ten_cvg}</label>
                                                                    <div class="row no-gutter header_phanmuc">
                                                                      <div class="col l-2"><textmargin><thongtin>Giám sát</thongtin></textmargin></div>
                                                                      <div class="col l-2"><textmargin><thongtin>Hỗ trợ</thongtin></textmargin></div>    
                                                                      <div class="col l-2"><textmargin><thongtin>Thời gian cập nhật</thongtin></textmargin></div>
                                                                      <div class="col l-2"><textmargin><thongtin>Bắt đầu</thongtin></textmargin></div>
                                                                      <div class="col l-2"><textmargin><thongtin>Kết thúc</thongtin></textmargin></div>
                                                                      <div class="col l-2"><textmargin><thongtin>Mô tả</thongtin></textmargin></div>
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
    //   if(trangthaigvm=="1"){
    //     const audio = new Audio('/SOUND/notify.mp3');
    //     audio.play();
    //  //   document.getElementById("trangthai_cvm").innerHTML = "THÔNG BÁO CÓ CÔNG VIỆC MỚI"
    //   //  database.ref("GIAOVIEC").child(id_nv).child(tmp_dem).child("TRANGTHAIGIAOVIEC").set("0");
    //   }
   
    });
 
    langnghe_his_cv(iduser)
    document.getElementById('btn_submit_bc').innerHTML = `<thongtin><button onclick="capnhat_tiendo()" type="submit">Gửi báo cáo</button></thongtin>`
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
                id_giaoviec = id_macv[search_malichsu]
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
function select_congviec_bc(obj){
var tiendo_cv = document.getElementById('tiendo_cv');
var v_select_cv = obj.value;
var id_cvg_select = v_select_cv.slice(2,12)
document.getElementById('id_cvg').value = id_cvg_select
database.ref("GIAOVIEC").child(iduser).child(id_cvg_select).on('value', async function(snap) {
    var ketqualangnghe = await snap.val();
    var tiendo = ketqualangnghe.TIENDO
    document.getElementById('tmp_data_sgv').innerHTML = `<div id="tu${id_cvg_select}">${tiendo}</div>`                            
    tiendo_cv.innerHTML = tiendo;
});
}
function langnghe_nhansu(){
    database.ref("NHANSU").on('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        document.getElementById("ds_nguoinhan").innerHTML =""
        for (var search_nhansu in ketqualangnghe) {
           id_nhanvien = ketqualangnghe[search_nhansu]
           var ten_nv = id_nhanvien.TEN
           var id_nv = id_nhanvien.ID
           if(id_nv!=iduser){
            document.getElementById("ds_nguoinhan").innerHTML +=`<label class="btn-mannhan"><input class="btn-mannhan" id="btnnhan${id_nv}" type="checkbox">&ensp;${ten_nv}</label>`
            document.getElementById("ds_nguoihotro").innerHTML +=`<label class="btn-manhotrou"><input class="btn-manhotrou" id="btnhotro${id_nv}" type="checkbox">&ensp;${ten_nv}</label>`
           }
        document.getElementById('btn_submit_bc').innerHTML=`<thongtin><button onclick="capnhat_tiendo()" type="submit">Gửi báo cáo</button></thongtin>`
        }
    });

}
function capnhat_tiendo(){
    swal({
      title: "Xác nhận gửi báo cáo",
      showCancelButton: true,
      confirmButtonColor: '#DD3435',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: "Không, hủy yêu cầu!",
      closeOnConfirm: true,
      closeOnCancel: true
  },
  async function(isConfirm){
  var tiendo_ud = document.getElementById('tiendo_update').value
  var id_cv = document.getElementById('id_cvg').value
  var cb_nn = document.getElementsByClassName('btn-mannhan');
  var cb_ht = document.getElementsByClassName('btn-manhotrou');
  var sel_nn = ""
  var sel_ht= ""
  if (isConfirm){
    if (document.getElementById('sel_tt').innerHTML!=""){
  
      for(var i=0; i<cb_nn.length; i++){
        var cb = cb_nn[i] 
        if (cb.type =="checkbox" && cb.checked==true) { //nếu là checkbox và có lựa chọn
          var id_cbn = cb.id.slice(7,17)
          sel_nn += id_cbn + "*"
         
        }
      }
     // console.log(sel_nn)
    //console.log(a.split("-").toString()) // cắt chuỗi sau dấu -  
      for(var i=0; i<cb_ht.length; i++){
        var cb = cb_ht[i]
        if (cb.type =="checkbox" && cb.checked==true) { //nếu là checkbox và có lựa chọn
          var id_cbn = cb.id.slice(8,18)
          sel_ht += id_cbn + "*"
        }
      }
//console.log(sel_ht)

      thongbao = setTimeout(thongbaos, 500);
      function thongbaos(){ 
        swal("Thành công!", "Báo cáo đã được gửi!", "success");
        database.ref("GIAOVIEC").once('value', async function(snap) {
          var ketqualangnghe = await snap.val();
          for (var search_nhanvien in ketqualangnghe) {
            var search_nvid = ketqualangnghe[search_nhanvien]
            if(search_nhanvien==iduser){
              for (var search_macv in search_nvid) {
                var id_cvg = search_nvid[search_macv]
                // console.log(id_giaoviec)
                var tiendo = id_cvg.TIENDO
                var yeucau_ht = id_cvg.YEUCAUHOTRO
                var nguoinhan_bc = id_cvg.NGUOINHANBAOCAO
                var tinhtrangcv = id_cvg.TINHTRANG
                var time_bchis = id_cvg.THOIGIANBAOCAO
             if(search_macv==id_cv){
                var ranID = randomString(10);
                database.ref("LICHSU_TIENDO").child(iduser).child(id_cv).child(ranID).child("TIENDO").set(tiendo);
                database.ref("LICHSU_TIENDO").child(iduser).child(id_cv).child(ranID).child("NGUOINHANBAOCAO").set(nguoinhan_bc);
                database.ref("LICHSU_TIENDO").child(iduser).child(id_cv).child(ranID).child("YEUCAUHOTRO").set(yeucau_ht);
                database.ref("LICHSU_TIENDO").child(iduser).child(id_cv).child(ranID).child("TINHTRANG").set(tinhtrangcv);
                database.ref("LICHSU_TIENDO").child(iduser).child(id_cv).child(ranID).child("THOIGIANBAOCAO").set(time_bchis);
               }
              }
            }
          
          }
        
        })
        ////////////////////////////////////////////////////////////////////////////
        var date_baocao = (new Date()).toString().slice(4, 24);
        database.ref("GIAOVIEC").child(iduser).child(id_cv).child("TIENDO").set(tiendo_ud);
        database.ref("GIAOVIEC").child(iduser).child(id_cv).child("NGUOINHANBAOCAO").set(sel_nn);
        database.ref("GIAOVIEC").child(iduser).child(id_cv).child("YEUCAUHOTRO").set(sel_ht);
        database.ref("GIAOVIEC").child(iduser).child(id_cv).child("TINHTRANG").set(document.getElementById('sel_tt').innerHTML);
        database.ref("GIAOVIEC").child(iduser).child(id_cv).child("THOIGIANBAOCAO").set(date_baocao);
      }
    } else  {
      thongbao = setTimeout(thongbaos, 500);
      function thongbaos(){ 
        swal("Thiếu thông tin!", "Vui lòng lựa chọn trạng thái công việc!", "error");
      }
 ///     console.log("Chưa lựa chọn")
    }
  }
  }); 
}
function sel_ttcv(obj){
  var sel_vcv = obj.value;
  document.getElementById('sel_tt').innerHTML = sel_vcv
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
          window.location.href = '/HTML/login.html';
      }
      });
  }
function xembaocao(tiendo, yeucau, yeucau_ht, nguoinhan_bc, tinhtrangcv, thoigianbaocao, macv){
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
                                                  <div class="col l-12"><button class="btn-manhotrou">${yeucau_nht}</button></div>
                                                  <div class="col l-12"><textmargin><thongtin ><i class="fa-solid fa-share"></i>&emsp;Báo cáo đã gửi đến</thongtin></textmargin></div>
                                                  <div class="col l-12"><button class="btn-manhotrou">${nguoinhanbc}</button></div>
                                                  <div class="col l-3"><textmargin><thongtin ><i class="fa-solid fa-battery-half"></i>&emsp;Tình trạng công việc</thongtin></textmargin></div>
                                                  <div class="col l-9"><textmargin><thongtin ><i class="fa-regular fa-clock"></i>&emsp;Thời gian báo cáo</thongtin></textmargin></div>
                                                  <div class="col l-3"><button class="btn-manhotrou">${tinhtrangcv}</button></div>
                                                  <div class="col l-9"><button class="btn-manhotrou">${thoigianbaocao}</button></div>
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
                                                        <th colspan="1" aria-sort="ascending" onclick="sortTable(5, '${macv}')">Đánh giá</th>
                                                      </tr>
                                                    </table>
                                                  </div>
                                                </div>
                                              </div>`
                                          
          
      ///////////////////////////////////////// tìm lịch sử 

  
      database.ref("LICHSU_TIENDO").child(iduser).once('value', async function(snap) {
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
              database.ref("LICHSU_TIENDO").child(iduser).child(macv).child(ma_bc_his).child("DANHGIA").set("Chưa có đánh giá");
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
                                                                    <td colspan="4" style="text-align:justify;max-width:31.25em;">${tiendo_his}</td>
                                                                    <td colspan="1">
                                                                      <textarea id="nx${ma_bc_his}" placeholder="Nhận xét" style="height: auto;" disabled>${nhanxet}</textarea>
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