document.getElementById('cadastroForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("foi")
    
    const nome = document.getElementById('nomeAluno').value;
    const idade = document.getElementById('numberAluno').value;
    const email = document.getElementById('emailAluno').value;
    const modalidade = document.getElementById('modalidadeAluno').value;
    const url = document.getElementById('foto').value;
    
    console.log("Dados do formulário:", { nome, idade, email, modalidade, url });

    
    if (!nome || !idade || !email || !modalidade) {
        alert("Todos os campos são obrigatórios.");
        return; 
    }

    
    const aluno = {
        nome,
        idade,
        email,
        modalidade,
        url
    };

    try {
        const response = await fetch("http://localhost:8080/academias/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(aluno), 
        });
        
        if (response.ok) {
            console.log(aluno);
            alert("Aluno cadastrado com sucesso!");
            document.getElementById('cadastroForm').reset(); 
        } else {
            console.error("Falha ao cadastrar. Status:", response.status);
            alert("Falha ao cadastrar aluno. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao enviar os dados:", error);
        alert("Erro ao cadastrar aluno. Tente novamente.");
    }
});
