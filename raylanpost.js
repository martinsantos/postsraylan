$(document).ready(function() {
  let currentPage = 0;
  const itemsPerPage = 10;
  let etiquetas = [];

  function createEtiqueta(item) {
    if (item.data && item.data.length > 0 && item.data[0].post) {
      const post = decodeURIComponent(escape(item.data[0].post));
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
        showResults();
      })
      .catch(error => {
        console.error(error);
      });
  }

  function getPostsByNumber(event) {
    event.preventDefault();
    const numeroPost = parseInt(document.getElementById('numeroPost').value);
    etiquetas = etiquetas.slice(0, numeroPost);
    currentPage = 0;
    showResults();
  }

  function getPostsByText(event) {
    event.preventDefault();
    const textoRelacionado = document.getElementById('textoRelacionado').value.toLowerCase();
    etiquetas = etiquetas.filter(item => item.post.toLowerCase().includes(textoRelacionado));
    currentPage = 0;
    showResults();
  }

  function getPostsByDate(event) {
    event.preventDefault();
    const fechaInicioInput = document.getElementById('fechaInicio');
    const fechaFinInput = document.getElementById('fechaFin');

    let fechaInicio;
    let fechaFin;

    if (fechaInicioInput.value) {
      fechaInicio = new Date(fechaInicioInput.value);
    }

    if (fechaFinInput.value) {
      fechaFin = new Date(fechaFinInput.value);
    }

    if (fechaInicio && fechaFin) {
      etiquetas = etiquetas.filter(item => fechaInicio <= item.timestamp && item.timestamp <= fechaFin);
    }

    currentPage = 0;
    showResults();
  }

  function showResults() {
    const resultadoDiv = document.getElementById('resultado');
    const searchStatus = document.getElementById('searchStatus');
    let html = '';

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageItems = etiquetas.slice(startIndex, endIndex);

    if (currentPageItems.length > 0) {
      currentPageItems.forEach(etiqueta => {
        const fecha = etiqueta.timestamp.toLocaleDateString();
        const postHTML = `<div class="post">${etiqueta.post} - ${fecha}</div>`;
        html += postHTML;
      });
    } else {
      html = '<div>No se encontraron resultados.</div>';
    }

    resultadoDiv.innerHTML = html;

    const totalPages = Math.ceil(etiquetas.length / itemsPerPage);
    const currentPageNumber = currentPage + 1;
    searchStatus.innerHTML = `Página ${currentPageNumber} de ${totalPages}`;

    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    if (currentPage === 0) {
      prevButton.disabled = true;
    } else {
      prevButton.disabled = false;
    }

    if (currentPage === totalPages - 1) {
      nextButton.disabled = true;
    } else {
      nextButton.disabled = false;
    }
  }
  function goToPrevPage(event) {
    event.preventDefault();
      if (currentPage > 0) {
        currentPage--;
        showResults();
        }
      }
    
      function goToNextPage(event) {
        event.preventDefault();
        const totalPages = Math.ceil(etiquetas.length / itemsPerPage);
        if (currentPage < totalPages - 1) {
          currentPage++;
          showResults();
        }
      }
    
      document.getElementById('buscarNumero').addEventListener('submit', getPostsByNumber);
      document.getElementById('buscarTexto').addEventListener('submit', getPostsByText);
      document.getElementById('textoRelacionadoButton').addEventListener('click', getPostsByText);
      document.getElementById('fechaButton').addEventListener('click', getPostsByDate);
      document.getElementById('prevButton').addEventListener('click', goToPrevPage);
      document.getElementById('nextButton').addEventListener('click', goToNextPage);
    
      // Get posts when the page loads
      getPosts();
    });
    