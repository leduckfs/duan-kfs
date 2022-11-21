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