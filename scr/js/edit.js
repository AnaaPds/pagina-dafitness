const apiUrl = 'http://localhost:8080/academias';

// Carrega os dados no formulário
function fetchContacts() {
  console.log('Carregando dados...');
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) throw new Error(`Erro ao buscar dados: ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log('Dados recebidos:', data);
      if (data.length > 0) {
        const firstContact = data[0];
        editData(firstContact.id);
      }
    })
    .catch(error => console.error('Erro ao carregar dados:', error));
}

// Edita os dados no formulário
function editData(id) {
  fetch(`${apiUrl}/${id}`)
    .then(response => {
      if (!response.ok) throw new Error(`Erro ao buscar dados para edição: ${response.status}`);
      return response.json();
    })
    .then(data => {
      // Preenche os campos com os dados
      document.getElementById('name').value = data.nome || '';
      document.getElementById('age').value = data.idade || '';
      document.getElementById('email').value = data.email || '';
      document.getElementById('modality').value = data.modalidade || '';
      
      // Carrega a imagem dinamicamente
      const espacofoto = document.getElementById("espacofoto");
      espacofoto.innerHTML = "";
      if (data.url) {
        const img = document.createElement("img");
        img.src = data.url;
        img.style.width = "100px";
        img.style.height = "100px";
        img.style.objectFit = "cover";
        espacofoto.appendChild(img);
      }

      // Salva os dados no backend ao submeter o formulário
      document.getElementById('formulario-edicao').onsubmit = function(event) {
        event.preventDefault(); // Prevenir comportamento padrão

        const updatedData = {
          nome: document.getElementById('name').value,
          idade: document.getElementById('age').value,
          email: document.getElementById('email').value,
          modalidade: document.getElementById('modality').value,
          url: data.url // Mantém a URL sem alterações
        };

        console.log("Payload enviado:", updatedData);

        fetch(`${apiUrl}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        })
          .then(response => {
            if (!response.ok) throw new Error(`Erro ao salvar dados: ${response.status}`);
            alert('Dados editados com sucesso!');
            fetchContacts(); 
          })
          .catch(error => console.error('Erro ao salvar dados:', error));
      };
    })
    .catch(error => console.error('Erro ao buscar dados para edição:', error));
}

// Inicia a função no carregamento
fetchContacts();
