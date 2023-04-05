function them_kho() {
    var ten_kho = document.getElementById('ten_kho').value.trim();
    var id_kho = randomString(20);
    database.ref("KHO").child(id_kho).child("TENKHO").set(ten_kho);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Thành công!',
      showConfirmButton: false,
      timer: 1200
    });
  }
function more_kho() {
    database.ref("KHO").on('value', async function (snap) {
        var ketqualangnghe = await snap.val();
        document.getElementById("display_more").innerHTML =`<p class="title-more">Danh sách kho</p>
                                                            <div class="cover l-2 button-block" id="button-khotong" 
                                                                style="display:inline-block;background-image:url('https://unsplash.it/400/200/?random')">
                                                                <p id="khotong">Tất cả sản phẩm</p>
                                                            </div>`
        for (var id_kho in ketqualangnghe) {
            kho = ketqualangnghe[id_kho]
            for (var DANHMUCTEN in kho) {
                if (DANHMUCTEN == "TENKHO") {
                    var ten_kho = kho[DANHMUCTEN]
                    document.getElementById("display_more").innerHTML +=`<div class="cover l-2 button-block" id="button-kho" 
                                                                            style="display:inline-block;background-image:url('https://unsplash.it/400/200/?random')"
                                                                            onclick="open_kho('${id_kho}','${ten_kho}')">
                                                                            <p id="${id_kho}">${ten_kho}</p>
                                                                        </div>`
            }
            }
        }
    })
}
function open_kho(id_kho, ten_kho){
    //  console.log(id_phongban)
    //   var chucvu = document.getElementById("chucvu").innerHTML
    //   var chucvu_nv = chucvu.slice(3, chucvu.length)
    // console.log(id_kho+":"+ten_kho)
      document.getElementById("kg_mau").innerHTML = `<div id="${id_kho}">
      <phongban-label style="background-color: rgb(224, 117, 45);" id="lable_mau">${ten_kho}<label id="id_kho_open" style="display:none">${id_kho}</label></phongban-label>
        <hr size="5px" color="#000" />
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
        <div class="overlay-content">
          <div class="sidebar">
            <a href="#" onclick="closeNav()"><i class="fa fa-fw fa-home"></i>&ensp;Trở về</a>
            <a href="#" onclick="add_product()"><i class="fad fa-layer-plus"></i>&ensp;Thêm sản phẩm</a>
          </div>
          <div class="content-sidebar" id="content">
              <div class="grid">
                  <p class="title-trangchu" style="margin-left:-5px">Danh sách sản phẩm</p>
                  <div id="ds_nhom${id_kho}"></div>
                  <div id="kg_nhom" style="display: none;"></div>
                </div>
                <hr class="line">
          
                <div class="grid">
                  <div class="row no-gutters" id="kg_congviec"></div>
                </div>
              </div>
          </div>
        </div>
      </div>`
  document.getElementById("kg_mau").style.height = "100%";
  hienthi_nhom(id_kho);
  }