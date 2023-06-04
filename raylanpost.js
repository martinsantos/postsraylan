$(document).ready(function() {
  let currentPage = 0;
  const itemsPerPage = 10;
  let etiquetas = [];

  function getPostsByNumber() {
    const numeroPost = parseInt(document.getElementById('numeroPost').value);
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

    axios.get('./your_posts_2.json', { responseType: 'json' })
      .then(response => {
        let data = response.data;

        if (fechaInicio && fechaFin) {
          data = data.filter(item => {
            if (item.timestamp) {
              const timestamp = new Date(item.timestamp * 1000);
              return fechaInicio <= timestamp && timestamp <= fechaFin;
            } else {
              return false;
            }
          });
        }

        etiquetas = data.map(item => {
          if (item.data && item.data.length > 0 && item.data[0].post) {
            const post = decodeURIComponent(escape(item.data[0].post));
            const timestamp = new Date(item.timestamp * 1000);
            return {
              post: post,
              timestamp: timestamp
            };
          }
        }).filter(Boolean).sort((a, b) => a.timestamp - b.timestamp);

        currentPage = 0;
        showResults();
      })
      .catch(error => {
        console.error(error);
      });
  }

  function getPostsByText() {
    const textoRelacionado = document.getElementById('textoRelacionado').value.toLowerCase();

    axios.get('./your_posts_2.json', { responseType: 'json' })
      .then(response => {
        const data = response.data;

        etiquetas = data.filter(item => {
          if (item.data && item.data.length > 0 && item.data[0].post) {
            const post = decodeURIComponent(escape(item.data[0].post));
            return post.toLowerCase().includes(textoRelacionado);
          }
        }).map(item => {
          const post = decodeURIComponent(escape(item.data[0].post));
          const timestamp = new Date(item.timestamp * 1000);
          return {
            post: post,
            timestamp: timestamp
          };
        }).filter(Boolean).sort((a, b) => a.timestamp - b.timestamp);

        currentPage = 0;
        showResults();
      })
      .catch(error => {
        console.error(error);
      });
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

  function goToPrevPage() {
    if (currentPage > 0) {
      currentPage--;
      showResults();
    }
  }

  function goToNextPage() {
    const totalPages = Math.ceil(etiquetas.length / itemsPerPage);
    if (currentPage < totalPages - 1) {
      currentPage++;
      showResults();
    }
  }

  document.getElementById('buscarNumero').addEventListener('submit', function(event) {
    event.preventDefault();
    getPostsByNumber();
  });

  document.getElementById('buscarTexto').addEventListener('submit', function(event) {
    event.preventDefault();
    getPostsByText();
  });

  document.getElementById('prevButton').addEventListener('click', function(event) {
    event.preventDefault();
    goToPrevPage();
  });

  document.getElementById('nextButton').addEventListener('click', function(event) {
    event.preventDefault();
    goToNextPage();
  });
});
