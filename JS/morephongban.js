// cập nhật số phòng ban ở trang chủ
window.onload = function() {
    database.ref("PHONGBAN").on('value', async function (snap) {
    var ketqualangnghe = await snap.val();
    var sophongban = 0;
    for (var id_phongban in ketqualangnghe) {
        phongban = ketqualangnghe[id_phongban]
        for (var DANHMUCTEN in phongban) {
            if (DANHMUCTEN == "TENPHONGBAN") {
                sophongban++;
            }
        }
    }
    document.getElementById("sophongban").innerHTML = sophongban;
    })
}
function more_phongban() {
    database.ref("PHONGBAN").on('value', async function (snap) {
        var ketqualangnghe = await snap.val();
        document.getElementById("display_more").innerHTML = `<p class="title-more">Danh sách phòng ban</p>`
        for (var id_phongban in ketqualangnghe) {
            phongban = ketqualangnghe[id_phongban]
            for (var DANHMUCTEN in phongban) {
                if (DANHMUCTEN == "TENPHONGBAN") {
                    var ten_phongban = phongban[DANHMUCTEN]
                    document.getElementById("display_more").innerHTML +=`<div class="cover l-2 button-block" id="button-phongban" 
                                                                            style="display:inline-block;background-image:url('https://unsplash.it/400/200/?random')"
                                                                            onclick="open_phongbanmoi('${id_phongban}','${ten_phongban}')">
                                                                            <p id="${id_phongban}">${ten_phongban}</p>
                                                                        </div>`
            }
            }
        }
    })
}