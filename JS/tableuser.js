window.onload = demsonhanvien();
function open_tableuser() {
  document.getElementById('table_nv').style.display = 'block'
  document.getElementById('danhsach_nv').style.display = 'none'
  database.ref("TESTNHANSU").on('value', async function (snap) {
    var stt = 0;
    var ketqualangnghe = await snap.val();
    document.getElementById('table_nv').innerHTML = `<tr>
                                                    <th>STT</th>
                                                    <th>ID</th>
                                                    <th>Họ và tên</th>
                                                    <th>Chức vụ</th>
                                                    <th>Số điện thoại</th>
                                                    <th>Email</th>
                                                    <th>Phòng ban</th>
                                                    <th>Giờ làm việc</th>
                                                    <th>Địa điểm làm việc</th>
                                                  </tr>`
    for (var tim_nhanvien in ketqualangnghe) {
      nhanvien = ketqualangnghe[tim_nhanvien]
      stt++;
      document.getElementById('table_nv').innerHTML += ` <tr>
                                                          <td>${stt}</td>
                                                          <td>${nhanvien.ID}</td>  
                                                          <td>${nhanvien.TEN}</td>
                                                          <td>${nhanvien.CHUCVU}</td>
                                                          <td>${nhanvien.SODIENTHOAI}</td>
                                                          <td>${nhanvien.EMAIL}</td>
                                                          <td>${nhanvien.PHONGBAN}</td>
                                                          <td>${nhanvien.GIOLAMVIEC}</td>
                                                          <td>${nhanvien.DIADIEMLAMVIEC}</td>
                                                      </tr>`
    }
    document.getElementById('sonhanvien').innerHTML = stt;
  })

}
function demsonhanvien() {
  database.ref("TESTNHANSU").on('value', async function (snap) {
    var stt = 0;
    var ketqualangnghe = await snap.val();
    for (var tim_nhanvien in ketqualangnghe) {
      nhanvien = ketqualangnghe[tim_nhanvien]
      stt++;
    }
    document.getElementById('sonhanvien').innerHTML = stt;
  })

}
function open_ds() {
  document.getElementById('table_nv').style.display = 'none'
  document.getElementById('danhsach_nv').style.display = ''
  document.getElementById("danhsach_nv").innerHTML = ""
  database.ref("TESTNHANSU").on('value', async function (snap) {
    var ketqualangnghe = await snap.val();
    for (var tim_nhanvien in ketqualangnghe) {
      nhanvien = ketqualangnghe[tim_nhanvien];
      document.getElementById("danhsach_nv").innerHTML +=
        `<div class="nhanvien l-2 m-4 c-6" onclick="open_tt_nv('${nhanvien.ID}', '${nhanvien.AVATAR}','${nhanvien.TEN}','${nhanvien.MOTA}', '${nhanvien.CHUCVU}')">
                    <img src="${nhanvien.AVATAR}"class="avt_list">
                    <div style="width:100%; text-align:center;">
                        <p>${nhanvien.ID} - ${nhanvien.TEN} - ${nhanvien.CHUCVU}</p>
                    <div>
                </div>`
    }
  })
}
function show_select_ns() {
  document.getElementById("dropdown_ns").classList.toggle("show");
  document.getElementById("dropdown_pb").classList.remove('show');
}
// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-table-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
function show_select_pb() {
  document.getElementById("dropdown_ns").classList.remove('show');
  document.getElementById("dropdown_pb").innerHTML = ``
  document.getElementById("dropdown_pb").classList.toggle("show");
  database.ref("PHONGBAN").once('value', async function (snap) {
    var ketqualangnghe = await snap.val();
    for (var id_phongban in ketqualangnghe) {
      phongban = ketqualangnghe[id_phongban]
      for (var DANHMUCTEN in phongban) {
        if (DANHMUCTEN == "TENPHONGBAN") {
          var ten_phongban = phongban[DANHMUCTEN]
          document.getElementById("dropdown_pb").innerHTML += `<a href="#" id="${id_phongban}" onclick="open_phongbanmoi('${id_phongban}','${ten_phongban}')"><i class="fa-solid fa-seedling"></i>&emsp;${ten_phongban}</a>`

        }
      }
    }
  })
}
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-table-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
function closeNav() {
  document.getElementById("kg_mau").style.height = "0%";
}
function them_phongban() {
  var ten_phongban = document.getElementById("ten_phongban").value.trim();
  var id_phongban = randomString(20);
  database.ref("PHONGBAN").child(id_phongban).child("TENPHONGBAN").set(ten_phongban);
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Thành công!',
    showConfirmButton: false,
    timer: 1200
  });
}
function open_phongbanmoi(id_phongban, ten_phongban) {
  document.getElementById('table_nv').style.display = "none"
  document.getElementById("kg_mau").innerHTML = `<div id="${id_phongban}">
                                                      <phongban-label style="background-color: rgb(224, 117, 45);" id="lable_mau">${ten_phongban}<label id="lid${id_phongban}" style="display:none"></label></phongban-label>
                                                        <hr size="5px" color="#000" />
                                                        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                                                        <div class="overlay-content">
                                                          <div class="sidebar">
                                                            <a href="#" id="themnv${id_phongban}" onclick="open_addnv_phongban('${id_phongban}', '${ten_phongban}')"><i class="fa-solid fa-user-plus"></i>&ensp;Thêm nhân viên</a>
                                                            <a href="#" onclick="xoa_pb('${id_phongban}')"><i class="fa fa-fw fa-home"></i>&ensp;Xóa không gian</a>
                                                          </div>
                                                          <div class="content-sidebar" id="content">
                                                              <hr class="line">
                                                              <div class="grid">
                                                                <div class="row no-gutters">
                                                                  <div class="l-5">
                                                                    <thongtin><input placeholder="Nhập tên nhóm..." id="input_tennhom" style="width:100%;border-left: 0.5px solid rgba(87, 87, 87, 0.404);" value=""></thongtin>
                                                                  </div>
                                                                  <div class="l-5">
                                                                  <thongtin><input id="thongbao_themnhom" style="width:100%;border-left: 0.5px solid rgba(87, 87, 87, 0.404);color: #0d8ee1" value="Thông báo | " disabled></thongtin>
                                                                </div>
                                                                  <div class="l-2">
                                                                    <button class="btn-danhgia" onclick="themnhom('${id_phongban}')" style="width:100%"><p>Thêm nhóm mới</p></button>
                                                                  </div>
                                                                  <p class="title-trangchu" style="margin-left:-5px">Nhóm làm việc</p>
                                                                  <div id="ds_nhom${id_phongban}"></div>
                                                                  <div id="kg_nhom" style="display: none;"></div>
                                                                </div>
                                                                <hr class="line">
                                                                <p class="title-trangchu" style="margin-left:-5px">Danh sách công việc</p>
                                                                <div class="grid">
                                                                  <div class="row no-gutters" id="kg_congviec"></div>
                                                                </div>
                                                              </div>
                                                          </div>
                                                        </div>
                                                      </div>`
  document.getElementById("kg_mau").style.height = "100%";
  hienthi_nhom(id_phongban);
  var nhaptennhom = document.getElementById("input_tennhom");
  nhaptennhom.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      themnhom(id_phongban);
    }
});
}
//####
function open_addnv_phongban(id_phongban, ten_phongban) {
  document.getElementById("content").innerHTML = `<input class="input_congviec" type="search" onkeyup="search_nvpb()" 
                                                                  placeholder="Nhập thông tin nhân viên..." id="input_content">
                                                                <ul id="list_nvpb"></ul>`
  database.ref("TESTNHANSU").on('value', async function (snap) {
      var ketqualangnghe = await snap.val();
      document.getElementById("list_nvpb").innerHTML = ""
      for (var id_nhanvien in ketqualangnghe) {
        var nhanvien = ketqualangnghe[id_nhanvien];
        var check = nhanvien[id_phongban+ten_phongban]
           document.getElementById("list_nvpb").innerHTML +=
          `<li style="padding:15px;position:relative"><input id="cb_add${id_nhanvien}" ${check} type="checkbox" onclick="check_nvpb('${id_phongban}','${id_nhanvien}', '${ten_phongban}')">&emsp;
              <thongtin id="p${id_phongban}">${id_nhanvien} - ${nhanvien.TEN} - ${nhanvien.CHUCVU}&emsp;</thongtin>
              <hr class="line">
              <button class="btn-danhgia" id="set${id_nhanvien}" onclick="caidat_nvpb('${id_phongban}', '${id_nhanvien}')" style="position:absolute;right:0;">Cài đặt quyền</button>
            </li>`
      }
    })
    
}
function search_nvpb() {
  var input, filter, ul, li, thongtin, i, txtValue;
  input = document.getElementById("input_content");
  filter = input.value.toUpperCase();
  ul = document.getElementById("list_nvpb");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    thongtin = li[i].getElementsByTagName("thongtin")[0];
    txtValue = thongtin.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
const ds_nhansu = {}

function check_nvpb(id_phongban, id_nhanvien, ten_phongban) {
  if(document.getElementById("cb_add"+id_nhanvien).checked === true){
    database.ref("TESTNHANSU").child(id_nhanvien).child(id_phongban+ten_phongban).set("checked");
  }
  if (document.getElementById("cb_add"+id_nhanvien).checked == false){
    database.ref("TESTNHANSU").child(id_nhanvien).child(id_phongban+ten_phongban).set("");
   // database.ref("TESTNHANSU").child(id_nhanvien).child(id_phongban).remove();
  }
  open_addnv_phongban(id_phongban, ten_phongban)
}
function xoa_pb(id_phongban) {
  Swal.fire({
    title: "Bạn chắc chắn muốn xóa không gian hiện tại?",
    text: "Bạn sẽ không thể hổi phục lại dữ liệu!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Đồng ý, xóa!',
    cancelButtonText: "Không, hủy yêu cầu!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Thành công!',
        'Dữ liệu đã được xóa!',
        'success'
      )
      database.ref("PHONGBAN").child(id_phongban).remove();
      closeNav();
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      Swal.fire(
        'Hủy!',
        'Dữ liệu được bảo toàn!',
        'error'
      )
    }
  })
}
function caidat_nvpb(id_phongban, idnhanvienphongban) {
  const { value: phanquyen } = Swal.fire({
    title: 'Phân quyền',
    input: 'select',
    inputOptions: {
      'Xem': 'Xem',
      'Nhận xét': 'Nhận xét',
      'Chỉnh sửa': 'Chỉnh sửa'
    },
    inputPlaceholder: 'Lựa chọn',
    showCancelButton: true,
    inputValidator: (value) => {
      if (value === '' || undefined) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Chưa lựa chọn' + value,
          timer: 1200
        })
        return database.ref("PHONGBAN").child(id_phongban).child("NHANVIEN: " + idnhanvienphongban).child("PHANQUYEN").remove();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Đã lựa chọn: ' + value,
          timer: 1200
        })
        return database.ref("PHONGBAN").child(id_phongban).child("NHANVIEN: " + idnhanvienphongban).child("PHANQUYEN").set(value);
      }
    }
  })
}