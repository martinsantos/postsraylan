$(document).ready(function() {
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
          data.filter(item => {
            if (item) {
              const timestamp = new Date(item.timestamp * 1000);
              return fechaInicio <= timestamp && timestamp <= fechaFin;
            } else {
              return false;
            }
          });        

        }

        const etiquetas = data.map(item => {
          if (item.data && item.data.length > 0 && item.data[0].post) {
            const post = decodeURIComponent(escape(item.data[0].post));
            const timestamp = new Date(item.timestamp * 1000);
            return {
              post: post,
              timestamp: timestamp
            };
          }
        }).filter(Boolean).sort((a, b) => a.timestamp - b.timestamp).slice(0, numeroPost);

        showResults(etiquetas);
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
        const etiquetas = data.filter(item => {
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

        showResults(etiquetas);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function showResults(etiquetas) {
    const resultadoDiv = document.getElementById('resultado');
    const searchStatus = document.getElementById('searchStatus');
    let html = '';

    if (etiquetas.length === 0) {
      searchStatus.innerText = 'No se encontraron resultados para la búsqueda actual.';
    } else {
      searchStatus.innerText = `Mostrando ${etiquetas.length} resultados para la búsqueda actual.`;
    }

    etiquetas.forEach(etiqueta => {
      const fecha = etiqueta.timestamp.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

      html += `
        <div class="post">
          <p class="post-date">${fecha}</p>
          <p>${etiqueta.post}</p>
          <div class="card-actions">
            <span class="card-action" onclick="copyPost(event, '${fecha} - ${etiqueta.post}')">
              <i class="bi bi-clipboard icon"></i>
              Copiar
Lo siento por el corte anterior. Aquí está el resto del código JavaScript:

```javascript
            </span>
            <span class="card-action" onclick="sharePost(event, '${etiqueta.post}')">
              <i class="bi bi-share icon"></i>
              Compartir
            </span>
            <span class="card-action" onclick="sendWhatsApp(event, '${etiqueta.post}')">
              <i class="bi bi-whatsapp icon"></i>
              WhatsApp
            </span>
          </div>
        </div>
      `;
    });

    resultadoDiv.innerHTML = html;
  }

  function copyPost(event, post) {
    event.stopPropagation();
    const clipboard = navigator.clipboard;
    clipboard.writeText(post)
      .then(() => {
        alert('El texto ha sido copiado al portapapeles.');
      })
      .catch((error) => {
        console.error('Error al copiar el texto:', error);
      });
  }

  function sharePost(event, post) {
    event.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: 'Compartir Post',
        text: post
      })
        .then(() => console.log('Post compartido con éxito.'))
        .catch((error) => console.error('Error al compartir:', error));
    } else {
      alert('La función de compartir no está soportada en este navegador.');
    }
  }

  function sendWhatsApp(event, post) {
    event.stopPropagation();
    const encodedMessage = encodeURIComponent(post);
    const url = `https://wa.me/?text=${encodedMessage}`;
    window.open(url, '_blank');
  }

  // Asignar las funciones a los botones correspondientes
  document.getElementById('numeroPostButton').addEventListener('click', getPostsByNumber);
  document.getElementById('textoRelacionadoButton').addEventListener('click', getPostsByText);
});
