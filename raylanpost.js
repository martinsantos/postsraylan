$(document).ready(function() {
  let currentPage = 0;
  const itemsPerPage = 10; // Cambia esto al número de elementos que quieres por página
  let etiquetas = []; // Mueve la variable etiquetas aquí para que sea accesible en todas las funciones

  function getPostsByNumber() {
    const numeroPost = document.getElementById('numeroPost').value;
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
            if (item) {
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
        }).filter(Boolean).sort((a, b) => a.timestamp - b.timestamp).slice(0, numeroPost);

        currentPage = 0; // Reinicia la página actual cuando se obtienen nuevos resultados
        showResults();
      })
      .catch(error => {
        console.error(error);
      });
  }

  function getPostsByText() {
    const textoRelacionado = document.getElementById('textoRelacionado').value;

    axios.get('./your_posts_2.json', { responseType: 'json' })
      .then(response => {
        const data = response.data;

        etiquetas = data.filter(item => {
          if (item.data && item.data.length > 0 && item.data[0].post) {
            const post = decodeURIComponent(escape(item.data[0].post));
            return post.toLowerCase().includes(textoRelacionado.toLowerCase());
          }
        }).map(item => {
          const post = decodeURIComponent(escape(item.data[0].post));
          const timestamp = new Date(item.timestamp * 1000);
          return {
            post: post,
            timestamp: timestamp
          };
        }).filter(Boolean).sort((a, b) => a.timestamp - b.timestamp).slice(0, 50);

        currentPage = 0; // Reinicia la página actual cuando se obtienen nuevos resultados
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

    // Divide los resultados en páginas
    const pages = [];
    for (let i = 0; i < etiquetas.length; i += itemsPerPage) {
      pages.push(etiquetas.slice(i, i + itemsPerPage));
    }

    // Muestra solo la página actual
    const currentPageItems = pages[currentPage];
    if (currentPageItems && currentPageItems.length > 0) {
      currentPageItems.forEach(etiqueta => {
        const fecha = etiquetas.$(document).ready(function() {
  let currentPage = 0;
  const itemsPerPage = 10; // Cambia esto al número de elementos que quieres por página
  let etiquetas = []; // Mueve la variable etiquetas aquí para que sea accesible en todas las funciones

  function getPostsByNumber() {
    const numeroPost = document.getElementById('numeroPost').value;
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
            if (item) {
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
        }).filter(Boolean).sort((a, b) => a.timestamp - b.timestamp).slice(0, numeroPost);

        currentPage = 0; // Reinicia la página actual cuando se obtienen nuevos resultados
        showResults();
      })
      .catch(error => {
        console.error(error);
      });
  }

  function getPostsByText() {
    const textoRelacionado = document.getElementById('textoRelacionado').value;

    axios.get('./your_posts_2.json', { responseType: 'json' })
      .then(response => {
        const data = response.data;

        etiquetas = data.filter(item => {
          if (item.data && item.data.length > 0 && item.data[0].post) {
            const post = decodeURIComponent(escape(item.data[0].post));
            return post.toLowerCase().includes(textoRelacionado.toLowerCase());
          }
        }).map(item => {
          const post = decodeURIComponent(escape(item.data[0].post));
          const timestamp = new Date(item.timestamp * 1000);
          return {
            post: post,
            timestamp: timestamp
          };
        }).filter(Boolean).sort((a, b) => a.timestamp - b.timestamp).slice(0, 50);

        currentPage = 0; // Reinicia la página actual cuando se obtienen nuevos resultados
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

    // Divide los resultados en páginas
    const pages = [];
    for (let i = 0; i < etiquetas.length; i += itemsPerPage) {
      pages.push(etiquetas.slice(i, i + itemsPerPage));
    }

    // Muestra solo la página actual
    const currentPageItems = pages[currentPage];
    if (currentPageItems && currentPageItems.length > 0) {
      currentPageItems.forEach(etiqueta => {
        const fecha = etiqueras.
$(document).ready(function() {
  let currentPage = 0;
  const itemsPerPage = 10; // Cambia esto al número de elementos que quieres por página
  let etiquetas = []; // Mueve la variable etiquetas aquí para que sea accesible en todas las funciones

  function getPostsByNumber() {
    const numeroPost = document.getElementById('numeroPost').value;
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
            if (item) {
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
        }).filter(Boolean).sort((a, b) => a.timestamp - b.timestamp).slice(0, numeroPost);

        currentPage = 0; // Reinicia la página actual cuando se obtienen nuevos resultados
        showResults();
      })
      .catch(error => {
        console.error(error);
      });
  }

  function getPostsByText() {
    const textoRelacionado = document.getElementById('textoRelacionado').value;

    axios.get('./your_posts_2.json', { responseType: 'json' })
      .then(response => {
        const data = response.data;

        etiquetas = data.filter(item => {
          if (item.data && item.data.length > 0 && item.data[0].post) {
            const post = decodeURIComponent(escape(item.data[0].post));
            return post.toLowerCase().includes(textoRelacionado.toLowerCase());
          }
        }).map(item => {
          const post = decodeURIComponent(escape(item.data[0].post));
          const timestamp = new Date(item.timestamp * 1000);
          return {
            post: post,
            timestamp: timestamp
          };
        }).filter(Boolean).sort((a, b) => a.timestamp - b.timestamp).slice(0, 50);

        currentPage = 0; // Reinicia la página actual cuando se obtienen nuevos resultados
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

    // Divide los resultados en páginas
    const pages = [];
    for (let i = 0; i < etiquetas.length; i += itemsPerPage) {
      pages.push(etiquetas.slice(i, i + itemsPerPage));
    }

    // Muestra solo la página actual
    const currentPageItems = pages[currentPage];
    if (currentPageItems && currentPageItems.length > 0) {
      currentPageItems.forEach(etiqueta => {
        const fecha = etiquAquí está tu código con la paginación incorporada:

```javascript
$(document).ready(function() {
  let currentPage = 0;
  const itemsPerPage = 10; // Cambia esto al número de elementos que quieres por página
  let etiquetas = []; // Mueve la variable etiquetas aquí para que sea accesible en todas las funciones

  function getPostsByNumber() {
    const numeroPost = document.getElementById('numeroPost').value;
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
            if (item) {
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
        }).filter(Boolean).sort((a, b) => a.timestamp - b.timestamp).slice(0, numeroPost);

        currentPage = 0; // Reinicia la página actual cuando se obtienen nuevos resultados
        showResults();
      })
      .catch(error => {
        console.error(error);
      });
  }

  function getPostsByText() {
    const textoRelacionado = document.getElementById('textoRelacionado').value;

    axios.get('./your_posts_2.json', { responseType: 'json' })
      .then(response => {
        const data = response.data;

        etiquetas = data.filter(item => {
          if (item.data && item.data.length > 0 && item.data[0].post) {
            const post = decodeURIComponent(escape(item.data[0].post));
            return post.toLowerCase().includes(textoRelacionado.toLowerCase());
          }
        }).map(item => {
          const post = decodeURIComponent(escape(item.data[0].post));
          const timestamp = new Date(item.timestamp * 1000);
          return {
            post: post,
            timestamp: timestamp
          };
        }).filter(Boolean).sort((a, b) => a.timestamp - b.timestamp).slice(0, 50);

        currentPage = 0; // Reinicia la página actual cuando se obtienen nuevos resultados
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

    // Divide los resultados en páginas
    const pages = [];
    for (let i = 0; i < etiquetas.length; i += itemsPerPage) {
      pages.push(etiquetas.slice(i, i + itemsPerPage));
    }

    // Muestra solo la página actual
    const currentPageItems = pages[currentPage];
    if (currentPageItems && currentPageItems.length > 0) {
      currentPageItems.forEach(etiqueta => {
        const fecha = etiquAquí está tu código con la paginación incorporada:

```javascript
$(document).ready(function() {
  let currentPage = 0;
  const itemsPerPage = 10; // Cambia esto al número de elementos que quieres por página
  let etiquetas = []; // Mueve la variable etiquetas aquí para que sea accesible en todas las funciones

  function getPostsByNumber() {
    const numeroPost = document.getElementById('numeroPost').value;
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
            if (item) {
              const timestamp = new Date(item.timestamp * 1000);
              return fechaInicio <= timestamp && timestamp <= fechaFin;
