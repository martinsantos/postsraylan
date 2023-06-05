window.jQuery || document.write('<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"><\/script>');
$(document).ready(function() {
  let currentPage = 0;
  const itemsPerPage = 10;
  let etiquetas = [];
  let searchResults = []; 

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
        searchResults = etiquetas; 
        showResults();
      })
      .catch(error => {
        console.error(error);
      });
  }

  function getPostsByNumber() {
    const numeroPost = parseInt(document.getElementById('numeroPost').value);
    if (!isNaN(numeroPost)) {
      searchResults = etiquetas.slice(0, numeroPost);
      currentPage = 0;
      showResults();
    }
  }

  function getPostsByText() {
    const textoRelacionado = document.getElementById('textoRelacionado').value.toLowerCase();
    if (textoRelacionado.trim() !== '') {
      searchResults = etiquetas.filter(item => item.post.toLowerCase().includes(textoRelacionado));
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
      fechaFin.setHours(23, 59, 59); 
    }

    if (fechaInicio && fechaFin) {
      searchResults = etiquetas.filter(item => fechaInicio <= item.timestamp && item.timestamp <= fechaFin);
      currentPage = 0;
      showResults();
    }
  }

  function showResults() {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPosts = searchResults.slice(startIndex, endIndex); 

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

    const numPages = Math.ceil(searchResults.length / itemsPerPage);

    for (let i = 0; i < numPages; i++) {
      const pageItem = document.createElement('li');
      pageItem.classList.add('page-item');
      pageItem.innerHTML = `
        <a class="page-link" href="#">${i + 1}</a>
      `;

      if (i === currentPage) {
        pageItem.classList.add('active');
      }

      pageItem.addEventListener('click', function(event) {
        event.preventDefault();
        currentPage = i;
        showResults();
      });

      pagination.appendChild(pageItem);
    }
  }

  document.getElementById('numeroPost').addEventListener('change', getPostsByNumber);
  document.getElementById('textoRelacionado').addEventListener('change', getPostsByText);
  document.getElementById('fechaInicio').addEventListener('change', getPostsByDate);
  document.getElementById('fechaFin').addEventListener('change', getPostsByDate);

  getPosts();
});
