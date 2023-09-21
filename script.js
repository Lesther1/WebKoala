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
  
  fetch('productos.json')
  .then(response => response.json())
  .then(jsonData => {
      const container = document.getElementById('CardGridcontainer');

      // Recorrer el JSON y crear la estructura HTML
      jsonData.forEach(item => {
          const carContainer = document.createElement('div');
          carContainer.classList.add('CarContainer');

          const imgElement = document.createElement('img');
          imgElement.classList.add('ProductImage'); 
          imgElement.src = item.img;
      
          const p1Element = document.createElement('p');
          p1Element.classList.add('ProductName'); 
          p1Element.textContent = item.nombre;
      
          const p2Element = document.createElement('p');
          p2Element.classList.add('ProductPrice'); 
          p2Element.textContent = "Hoy: $"+item.Precio;
      
          const aElement = document.createElement('a');
          aElement.classList.add('BuyLink'); 
          aElement.textContent = 'Comprar';

          carContainer.appendChild(imgElement);
          carContainer.appendChild(p1Element);
          carContainer.appendChild(p2Element);
          carContainer.appendChild(aElement);

          container.appendChild(carContainer);
      });
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));

  // Obtén el elemento Navbar-Container
const navbarContainer = document.querySelector('.Navbar-Container');

// Escucha el evento de scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbarContainer.classList.add('scrolled');
    } else {
        navbarContainer.classList.remove('scrolled');
    }
});
