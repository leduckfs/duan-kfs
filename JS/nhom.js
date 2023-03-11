
function themnhom() {
    var id_phongban = document.getElementById('id_phongban_open').innerHTML;
    var tennhom = document.getElementById('input_tennhom').value.toUpperCase();
    if (tennhom.length < 1) {
        document.getElementById('thongbao_themnhom').value = "Thông báo | Thêm nhóm thất bại - Lỗi tên nhóm";
    } else {
        database.ref("PHONGBAN").child(id_phongban).child(randomString(10)).set(tennhom);
        document.getElementById('thongbao_themnhom').value = "Thông báo | Đã thêm thành công " + tennhom;
        hienthi_nhom();
    }
}
function hienthi_nhom() {
    document.getElementById('kg_congviec').style.display = "none";
    var id_phongban = document.getElementById('id_phongban_open').innerHTML;
    database.ref("PHONGBAN").child(id_phongban).on('value', async function (snap) {
        var ketqualangnghe = await snap.val();
        document.getElementById('ds_nhom').innerHTML = ""
        for (var id_nhom in ketqualangnghe) {
            if (id_nhom !== "TENPHONGBAN") {
                var tennhom = ketqualangnghe[id_nhom]
                document.getElementById('ds_nhom').innerHTML += `<div class="button-nhom" style="position:relative">${tennhom}&emsp;
                                                                    <i class="fal fa-sign-in-alt icon-center" onclick="vao_nhom('${tennhom}', '${id_phongban}', '${id_nhom}')">
                                                                    <p style="padding:5px;font-weight: 700;">OPEN</p></i>
                                                                    <i class="far fa-times" style="position:absolute;top:2px; left:2px" onclick="xoa_nhom('${id_phongban}', '${id_nhom}', '${tennhom}')"></i>
                                                                 </div>`
            }

        }
    })
    document.getElementById('kg_nhom').innerHTML = "";
}
function xoa_nhom(id_phongban, id_nhom, tennhom) {
    Swal.fire({
        title: "Bạn chắc chắn muốn xóa nhóm hiện tại?",
        text: "Bạn sẽ không thể hổi phục lại dữ liệu, vui lòng nhập đúng tên nhóm để xóa!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Đồng ý, xóa!',
        input: 'text',
        cancelButtonText: "Không, hủy yêu cầu!",
    }).then((result) => {
        if (result.isConfirmed && result.value == tennhom) {
            Swal.fire(
                'Thành công!',
                'Dữ liệu đã được xóa!',
                'success'
            )
            database.ref("PHONGBAN").child(id_phongban).child(id_nhom).remove();
            document.getElementById('thongbao_themnhom').value = "Thông báo | Đã xóa thành công " + tennhom;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Hủy!',
                'Dữ liệu được bảo toàn!',
                'error'
            )
        } else {
            document.getElementById('thongbao_themnhom').value = "Thông báo | Xóa thất bại " + tennhom + " - Nhập tên nhóm sai";
            Swal.fire(
                'Xóa thất bại!',
                'Nhập tên nhóm sai!',
                'error'
            )
        }
    })
}
function vao_nhom(tennhom, id_phongban, id_nhom) {
    hienthi_congviec(id_phongban, id_nhom);
    document.getElementById('ds_nhom').innerHTML = `<div class="button-nhom">${tennhom}
                                                        <i class="fas fa-chevron-left icon-center" onclick="hienthi_nhom()">
                                                        <p style="padding:5px">BACK</p></i>   
                                                    </div>`
    document.getElementById('kg_nhom').style.display = "";
    document.getElementById('kg_nhom').innerHTML = `<div class="row no-gutters">
                                                        <div class="l-3">
                                                            <input class="input_congviec" placeholder="Công việc..." value="" id="ten_congviec">
                                                            <div class="btn-danhgia" style="height:25px;" onclick="them_congviec('${id_phongban}', '${id_nhom}')">Thêm công việc</div>
                                                        </div>
                                                        <div class="l-9">
                                                            <div class="button-nhom-menu">Chia sẻ</div>
                                                            <div class="button-nhom-menu">Hướng dẫn</div>
                                                            <div class="button-nhom-menu">Thông tin nhóm</div>
                                                            <div class="button-nhom-menu">Lọc</div>
                                                        </div>
                                                    </div>`
}
function them_congviec(id_phongban, id_nhom){
    var congviec =document.getElementById("ten_congviec").value;
    database.ref("CONGVIECPHONGBAN").child(id_phongban).child(id_nhom).child(randomString(20)).set(congviec);
    document.getElementById('kg_congviec').style.display = "";
    hienthi_congviec(id_phongban, id_nhom);
   

}
function hienthi_congviec(id_phongban, id_nhom){
    document.getElementById('kg_congviec').style.display = "";
    database.ref("CONGVIECPHONGBAN").child(id_phongban).child(id_nhom).on('value', async function (snap) {
        var ketqualangnghe = await snap.val();
        document.getElementById('kg_congviec').innerHTML = ""
        for (var id_congviec in ketqualangnghe) {
            if (id_nhom !== "TENPHONGBAN") {
                var congviec = ketqualangnghe[id_congviec]
                document.getElementById('kg_congviec').innerHTML += `
                <div class="l-3 mau_congviec"><p style="padding:5px;">${congviec}</p>
                    <div class="row no-gutters">
                        <div class="l-12">
                            <div class="row no-gutters">
                                <div class="l-8">
                                    <div style="width:96%;margin:2px">
                                        <input class="input_congviec" placeholder="Tác vụ..." value="" id="ten_congviec" style="height:100%;">
                                    </div>
                                </div>
                                <div class="l-4">
                                    <div style="width:96%;margin:2px">
                                        <div class="btn-danhgia" style="height:100%;">Thêm</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            }

        }
    })
}