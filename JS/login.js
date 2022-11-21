function login(){
    var in_id = document.getElementById("id_dangnhap").value;
    var in_mk = document.getElementById("mk_dangnhap").value;   
    var chon_checkbox = document.getElementsByName("luachon");
        for (var i = 0; i < chon_checkbox.length; i++){
            if (chon_checkbox[i].checked === true){
                if(chon_checkbox[i].value === "NV"){ 
                    database.ref("NHANSU").once('value', async function(snap) {
                        var ketqualangnghe = await snap.val();
                        for (var seach_nhansu in ketqualangnghe) {
                            id_nhanvien = ketqualangnghe[seach_nhansu]
                            var mk_nv = id_nhanvien.MATKHAU
                            var id_nv = id_nhanvien.ID
                            if(id_nv == in_id && mk_nv == in_mk){
                                localStorage.setItem("in_id", in_id);
                                window.location.href = '../HTML/user.html';
                            } else {
                                swal("Thất bại","Tài khoản hoặc mật khẩu không chính xác","error")
                            }
                        }          
                    });
                
                } else if(chon_checkbox[i].value === "QL"){
                    database.ref("ADMIN").once('value', async function(snap) {
                        var ketqualangnghe = await snap.val();
                            var mk_nv = ketqualangnghe.MATKHAU
                            var id_nv = ketqualangnghe.ID
                            if(id_nv == in_id && mk_nv == in_mk){
                                localStorage.setItem("in_id_admin", in_id);
                                window.location.href = '../HTML/admin.html';
                            } else {
                                swal("Thất bại","Tài khoản hoặc mật khẩu không chính xác","error")
                            }     
                    });
                }
            }
        }
    
}

tt_icon = 1
tt_ht = 1
document.getElementById('iconshow').click()
function showpass(){
      mk_dangnhap = document.getElementById('mk_dangnhap')
      iconshow = document.getElementById('iconshow')
      if(tt_icon*tt_ht==1){
        iconshow.onclick = (()=>{
            mk_dangnhap.type = "text";
            iconshow.classList.add("hide-btn");
            tt_ht = 0
        })
     } else if(tt_icon*tt_ht==0){
        iconshow.onclick = (()=>{
            mk_dangnhap.type = "password";
            iconshow.classList.remove("hide-btn");
            tt_ht = 1
        })
    }
       
}

