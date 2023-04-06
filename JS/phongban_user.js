iduser = localStorage.getItem("in_id")
function hienthi_phongban() {
    document.getElementById("display_more").innerHTML = `<p class="title-more">Danh sách phòng ban</p>`
    database.ref("TESTNHANSU").child(iduser).on('value', async function (snap) {
        document.getElementById("display_more").innerHTML = ""
        var ketqualangnghe = await snap.val();
        for (var thongtin in ketqualangnghe) {
            var phongban_check = ketqualangnghe[thongtin]
            var id_phongban = thongtin.toString().slice(0, 20);
            //console.log(id_phongban)
            if (phongban_check == "checked") {
                  var ten_phongban = thongtin.toString().slice(20, thongtin.toString().length);
                  //console.log(phongban_check) // trangthai phong ban co duoc them vao nhanvien hay khong
                  //console.log(thongtin) // là id các phongban duoc them vao nhan vien
                  document.getElementById("display_more").innerHTML += `<div class="cover l-3 button-block" id="btn${id_phongban}" 
                                      style="display:inline-block;background-image:url('https://unsplash.it/400/200/?random')"
                                      onclick="open_phongban_user('${id_phongban}','${ten_phongban}')">
                                      <p id="${thongtin}">${ten_phongban}</p>
                                    </div>`

            }
        }
    })
}
function open_phongban_user(id_phongban, ten_phongban){
  //  console.log(id_phongban)
    var chucvu = document.getElementById("chucvu").innerHTML
    var chucvu_nv = chucvu.slice(3, chucvu.length)
    document.getElementById("kg_user").innerHTML = `<div id="${id_phongban}">
    <phongban-label style="background-color: rgb(224, 117, 45);" id="lable_mau">${ten_phongban}<label id="id_phongban_open" style="display:none">${id_phongban}</label></phongban-label>
      <hr size="5px" color="#000" />
      <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
      <div class="overlay-content">
        <div class="sidebar">
          <a href="#" onclick="closeNav()"><i class="fa fa-fw fa-home"></i>&ensp;Trở về</a>
        </div>
        <div class="content-sidebar" id="content">
            <div class="grid">
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
document.getElementById("kg_user").style.height = "100%";
hienthi_nhom(id_phongban);
}