function enviarMensajeAPI(email) {
    var templateParams = {
      // Ajusta estos parámetros según tu plantilla de correo electrónico
      to_name: email,
      from_name: 'Tu nombre',
      message: 'Sin nada aun',
      email: email
    };
  
    return emailjs.send('service_oxnpjjg', 'template_1af7p3c', templateParams, 'f9_Ky5GtUYtw15h-Y')
      .then(function(response) {
        return 'Mensaje enviado correctamente a ' + email;
      }, function(error) {
        return 'Error al enviar el mensaje: ' + JSON.stringify(error);
      });
  }
  
  
  function openModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
  
  function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  
  var shopCarIcon = document.getElementById("ShopCar");
  var btnComprar = document.getElementById("btnComprar");
  
  shopCarIcon.addEventListener("click", openModal);
  
  btnComprar.addEventListener("click", function() {
    Swal.fire({
      title: 'Ingresa el correo para enviar la factura',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',  // Texto personalizado para el botón Cancelar
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return enviarMensajeAPI(email);
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Correcto',
          text: result.value,
          icon: 'success'
        });
      }
    }).catch((error) => {
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido el siguiente error al enviar el mensaje: ' + JSON.stringify(error),
        icon: 'error'
      });
    });
  });
  
  