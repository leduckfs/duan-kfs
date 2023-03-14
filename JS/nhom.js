
function themnhom() {
    var id_phongban = document.getElementById('id_phongban_open').innerHTML;
    var tennhom = document.getElementById('input_tennhom').value.toUpperCase().trim();
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
    document.getElementById('kg_congviec').innerHTML = "";
    hienthi_congviec(id_phongban, id_nhom);
    document.getElementById('ds_nhom').innerHTML = `<div class="button-nhom">${tennhom}
                                                        <i class="fas fa-chevron-left icon-center" onclick="hienthi_nhom()">
                                                        <p style="padding:5px">BACK</p></i>   
                                                    </div>`
    document.getElementById('kg_nhom').style.display = "";
    document.getElementById('kg_nhom').innerHTML = `<div class="row no-gutters">
                                                        <div class="l-4">
                                                            <input class="input_congviec" placeholder="Công việc..." value="" id="ten_congviec">
                                                            <div class="btn-danhgia" style="height:25px;" onclick="them_congviec('${id_phongban}', '${id_nhom}')">Thêm công việc</div>
                                                        </div>
                                                        <div class="l-8">
                                                            <div class="button-nhom-menu">Chia sẻ</div>
                                                            <div class="button-nhom-menu">Hướng dẫn</div>
                                                            <div class="button-nhom-menu">Thông tin nhóm</div>
                                                            <div class="button-nhom-menu">Lọc</div>
                                                        </div>
                                                    </div>`
    database.ref("CONGVIECPHONGBAN").child(id_phongban).child(id_nhom).on('value', async function (snap) {
        var ketqualangnghe = await snap.val();
        for (var id_congviec in ketqualangnghe) {
            hienthi_tacvu(id_phongban, id_nhom, id_congviec);
        }
    })
}
function them_congviec(id_phongban, id_nhom){
    var congviec = document.getElementById("ten_congviec").value.trim();
    if(congviec!==""){
        database.ref("CONGVIECPHONGBAN").child(id_phongban).child(id_nhom).child(randomString(20)).child("TENCONGVIEC").set(congviec);
    }
 
}
function hienthi_congviec(id_phongban, id_nhom){
    document.getElementById('kg_congviec').style.display = "";
    database.ref("CONGVIECPHONGBAN").child(id_phongban).child(id_nhom).on('value', async function (snap) {
        var ketqualangnghe = await snap.val();
        document.getElementById('kg_congviec').innerHTML = ""
        for (var id_congviec in ketqualangnghe) {
                var congviec = ketqualangnghe[id_congviec]
                var ten_congviec = congviec.TENCONGVIEC
                document.getElementById('kg_congviec').innerHTML += `
                <div class="l-3 mau_congviec" style="position:relative;padding:3px;"><p style="padding:5px;"><b>${ten_congviec}</b></p>
                    <i class="far fa-times icon-center" style="position:absolute;top:2px; right:2px" onclick="xoa_congviec('${id_phongban}', '${id_nhom}', '${id_congviec}', '${ten_congviec}')" id="xoa${id_congviec}"></i>
                    <div class="row no-gutters">
                        <div class="l-12">
                            <div class="row no-gutters">
                                <div class="l-10">
                                    <div style="width:96%;margin:2px">
                                        <input class="input_congviec" placeholder="Tác vụ..." style="height:100%;" id="tacvu${id_congviec}">
                                    </div>
                                </div>
                                <div class="l-2">
                                    <div style="width:96%;margin:2px;text-align:center">
                                        <div class="btn-danhgia" style="height:100%;" onclick="them_tacvu('${id_phongban}','${id_nhom}','${id_congviec}')">Thêm</div>
                                    </div> 
                                </div>
                                <div class="l-12" style="height:210px;overflow:scroll">
                                    <progress class="tiendo-css" id="tiendo${id_congviec}" value="" max="100"></progress>
                                    <b id="phantram${id_congviec}"></b>
                                    <p id="mucdo${id_congviec}" class="mucdo-css"></p>
                                    <div id="themtacvu${id_congviec}"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
                for (var id_tacvu in congviec){
                    document.getElementById('themtacvu'+id_congviec).innerHTML += `<div id="tacvucongviec${id_tacvu}"></div>` 
                }
        }
    })
}
function them_tacvu(id_phongban, id_nhom, id_congviec){
    var tacvu = document.getElementById("tacvu"+id_congviec).value;
    var id_tacvu = randomString(10);
    var obj_tacvu = {
        "TENTACVU":tacvu,
        "TRANGTHAI":""  
    }
    if(tacvu!==""){
        database.ref("CONGVIECPHONGBAN").child(id_phongban).child(id_nhom).child(id_congviec).child(id_tacvu).set(obj_tacvu);
    }
    hienthi_tacvu(id_phongban, id_nhom, id_congviec);
}
function hienthi_tacvu(id_phongban, id_nhom, id_congviec){ 
    database.ref("CONGVIECPHONGBAN").child(id_phongban).child(id_nhom).child(id_congviec).on('value', async function (snap) {
        var ketqualangnghe = await snap.val();
        var i = 0, j=0;
            for(var id_tacvu in ketqualangnghe){
                if(id_tacvu!=="TENCONGVIEC" && id_tacvu!==""){
                var obj_tacvu = ketqualangnghe[id_tacvu]
                var ten_tacvu = obj_tacvu.TENTACVU
                var cb_tacvu = obj_tacvu.TRANGTHAI
                i++;
                if(cb_tacvu=="checked"){
                    j++;  
                }
                document.getElementById("tacvucongviec"+id_tacvu).innerHTML =`
                                                                                <span class="span_congviec" style="margin-left:25px">
                                                                                    <input ${cb_tacvu} type="checkbox" class="checkbox-tacvu" id="cb${id_tacvu}" onclick="checkbox_tacvu('${id_phongban}','${id_nhom}','${id_congviec}','${id_tacvu}')">${ten_tacvu}
                                                                                </span>
                                                                                <button class="todo-delete" onclick="xoa_tacvu('${id_phongban}','${id_nhom}','${id_congviec}','${id_tacvu}','${ten_tacvu}')">Xóa</button>
                                                                                <hr class="line">`
                }
        } if(i!=0) {
            document.getElementById("tiendo"+id_congviec).value = j/i*100;
            var phantram = (j/i*100).toFixed(2);
            document.getElementById("phantram"+id_congviec).innerHTML = (j/i*100).toFixed(2)+"%";
            if(phantram==0) {
                document.getElementById("mucdo"+id_congviec).innerHTML = "Chưa hoàn thành";
                document.getElementById("mucdo"+id_congviec).style.backgroundColor = "red"
            }
            if (phantram>0 && phantram<100) {
                document.getElementById("mucdo"+id_congviec).innerHTML = "Đang hoàn thành";
                document.getElementById("mucdo"+id_congviec).style.backgroundColor = "orange"
            }
            if (phantram==100) {
                document.getElementById("mucdo"+id_congviec).innerHTML = "Đã hoàn thành";
                document.getElementById("mucdo"+id_congviec).style.backgroundColor = "green"
            }
        }
        
    })
}
function xoa_tacvu(id_phongban,id_nhom,id_congviec,id_tacvu,ten_tacvu){
    Swal.fire({
        title: "Bạn chắc chắn muốn xóa tác vụ hiện tại?",
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
            database.ref("CONGVIECPHONGBAN").child(id_phongban).child(id_nhom).child(id_congviec).child(id_tacvu).remove();
            document.getElementById('thongbao_themnhom').value = "Thông báo | Đã xóa thành công " + ten_tacvu;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Hủy!',
                'Dữ liệu được bảo toàn!',
                'error'
            )
        }
    })
}
function xoa_congviec(id_phongban, id_nhom, id_congviec, ten_congviec){
    Swal.fire({
        title: "Bạn chắc chắn muốn xóa công việc hiện tại?",
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
            database.ref("CONGVIECPHONGBAN").child(id_phongban).child(id_nhom).child(id_congviec).remove();
            document.getElementById('thongbao_themnhom').value = "Thông báo | Đã xóa thành công " + ten_congviec;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Hủy!',
                'Dữ liệu được bảo toàn!',
                'error'
            )
        }
    })
}
function checkbox_tacvu(id_phongban,id_nhom,id_congviec,id_tacvu){
    if(document.getElementById("cb"+id_tacvu).checked == true){
        database.ref("CONGVIECPHONGBAN").child(id_phongban).child(id_nhom).child(id_congviec).child(id_tacvu).child("TRANGTHAI").set("checked");   
    } else  database.ref("CONGVIECPHONGBAN").child(id_phongban).child(id_nhom).child(id_congviec).child(id_tacvu).child("TRANGTHAI").set("");   
}
