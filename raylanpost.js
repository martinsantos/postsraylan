$(document).ready(function() {
  let currentPage = 0;
  const itemsPerPage = 10;
  let etiquetas = [];

  function createEtiqueta(item) {
    if (item.data && item.data.length > 0 && item.data[0].post) {
      const post = item.data[0].post;
      const timestamp = new Date(item.timestamp * 1000);
      return {
        post: post,
        timestamp: timestamp
      };
    }
  }

  function getPosts() {
    axios.get('./your_posts_2.json', { responseType: 'json' })
      .then(response => {
        etiquetas = response.data.map(createEtiqueta).filter(Boolean).sort((a, b) => a.timestamp - b.timestamp);
        console.log(etiquetas); // Mostrar los datos en la consola
      })
      .catch(error => {
        console.error(error);
      });
  }

  function getPostsByNumber() {
    const numeroPost = parseInt(document.getElementById('numeroPost').value);
    if (!isNaN(numeroPost)) {
      etiquetas = etiquetas.slice(0, numeroPost);
      currentPage = 0;
      showResults();
    }
  }

  function getPostsByText() {
    const textoRelacionado = document.getElementById('textoRelacionado').value.toLowerCase();
    if (textoRelacionado.trim() !== '') {
      etiquetas = etiquetas.filter(item => item.post.toLowerCase().includes(textoRelacionado));
      currentPage = 0;
      showResults();
    }
  }

  function getPostsByDate() {
    const fechaInicioInput = document.getElementById('fechaInicio');
    const fechaFinInput = document.getElementById('fechaFin');

    let fechaInicio;
    let fechaFin;

    if (fechaInicioInput.value) {
      fechaInicio = new Date(fechaInicioInput.value);
    }

    if (fechaFinInput.value) {
      fechaFin = new Date(fechaFinInput.value);
      fechaFin.setHours(23, 59, 59); // Establecer la hora final al final del día
    }

    if (fechaInicio && fechaFin) {
      etiquetas = etiquetas.filter(item => fechaInicio <= item.timestamp && item.timestamp <= fechaFin);
      currentPage = 0;
      showResults();
    }
  }

  function showResults() {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPosts = etiquetas.slice(startIndex, endIndex);

    const postList = document.getElementById('postList');
    postList.innerHTML = '';

    currentPosts.forEach(item => {
      const postItem = document.createElement('div');
      postItem.classList.add('card', 'mb-3');
      postItem.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${item.timestamp}</h5>
          <p class="card-text">${item.post}</p>
        </div>
      `;
      postList.appendChild(postItem);
    });

    updatePagination();
  }

  function updatePagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const numPages = Math.ceil(etiquetas.length / itemsPerPage);

    for (let i = 0; i < numPages; i++) {
      const pageItem = document.createElement('li');
      pageItem.classList.add('page-item');
      pageItem.innerHTML = `
        <a class="page-link" href="#" onclick="goToPage(${i})">${i + 1}</a>
      `;
      pagination.appendChild(pageItem);
    }

    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    if (currentPage === 0) {
      prevButton.classList.add('disabled');
    } else {
      prevButton.classList.remove('disabled');
    }

    if (currentPage === numPages - 1) {
      nextButton.classList.add('disabled');
    } else {
      nextButton.classList.remove('disabled');
    }
  }

  function goToPage(page) {
    currentPage = page;
    showResults();
  }

  function resetFields() {
    document.getElementById('numeroPost').value = '';
    document.getElementById('textoRelacionado').value = '';
    document.getElementById('fechaInicio').value = '';
    document.getElementById('fechaFin').value = '';
  }

  // Ocultar el listado de posts y la paginación al cargar la página
  $('#postList').hide();
  $('#pagination').hide();

  // Reiniciar campos de búsqueda y resultados al hacer clic en los botones de búsqueda
  $('#numeroPostButton').click(function() {
    resetFields();
    showResults();
  });

  $('#textoRelacionadoButton').click(function() {
    resetFields();
    showResults();
  });

  $('#fechaButton').click(function() {
    resetFields();
    showResults();
  });

  // Habilitar navegación entre páginas
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');

  prevButton.addEventListener('click', function() {
    if (currentPage > 0) {
      currentPage--;
      showResults();
    }
  });

  nextButton.addEventListener('click', function() {
    const numPages = Math.ceil(etiquetas.length / itemsPerPage);
    if (currentPage < numPages - 1) {
      currentPage++;
      showResults();
    }
  });

  // Obtener los posts al cargar la página
  getPosts();

  // Mostrar los resultados después de obtener los posts
  showResults();
});
