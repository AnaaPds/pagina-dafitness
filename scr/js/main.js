const tableBody = document.querySelector("table tbody");
 
 async function buscarAluno() {
        try {
            const response = await fetch("http://localhost:8080/academias"); 
            if (response.ok) {
                const alunos = await response.json(); 
                exibirAlunos(alunos); 
            } else {
                console.error("Erro na requisição:", response.status);
            }
        } catch (error) {
            console.error("Erro de conexão:", error);
        }
    }

    
    function exibirAlunos(alunos) {
        const tabela = document.getElementById("tabela-academia"); 
        tabela.querySelector("tbody").innerHTML = ""; 

        alunos.forEach((aluno) => {
            const novaLinha = document.createElement("tr");

            if(aluno.url == null){
                novaLinha.innerHTML = `
                <td>${tabela.querySelectorAll("tr").length + 1}</td>
                <td>${aluno.nome}</td>
                <td><img src="${aluno.url}" alt="Foto do Aluno" style="width: 50px; height: 50px; border-radius: 50%;"></td>
                <td>${aluno.idade}</td>
                <td>${aluno.email}</td>
                <td>${aluno.modalidade}</td>
                <td><a href ="/edit.html"><button class="btn-edit" id="btn-edit"><img src="./scr/image/editar.png" alt="Editar" data_edit="${aluno.id}"></button></a></td>
                <td><button class="btn-delete" data_del="${aluno.id}"><img src="./scr/image/lixeira.png" alt="Excluir"></button></td>
            `;
            }else{
                novaLinha.innerHTML = `
                <td>${tabela.querySelectorAll("tr").length + 1}</td>
                <td>${aluno.nome}</td>
                <td><img src="${aluno.url}" alt="Foto do Aluno" style="width: 50px; height: 50px; border-radius: 50%;"></td>
                <td>${aluno.idade}</td>
                <td>${aluno.email}</td>
                <td>${aluno.modalidade}</td>
                <td><a href ="/edit.html"><button class="btn-edit" id="btn-edit"><img src="./scr/image/editar.png" alt="Editar" data_edit="${aluno.id}"></button></a></td>
                <td><button class="btn-delete" data_del="${aluno.id}"><img src="./scr/image/lixeira.png" alt="Excluir"></button></td>
            `;
            }
    

        
            tabela.querySelector("tbody").appendChild(novaLinha);
        });
    }

    buscarAluno();

    document.addEventListener("DOMContentLoaded", () => {
    
        if (tableBody) {
            tableBody.addEventListener("click", async (event) => {

                const botao_excluir = event.target.closest(".btn-delete");
                if (botao_excluir) {
                    console.log("O botão está sendo clicado")
                    const alunoId = botao_excluir.getAttribute("data_del");
                    botao_excluir.addEventListener("click", async () => {
                        await excluirAluno(alunoId);
                    });
                }
            });
        } else {
            console.error("Tabela de academia não encontrada!");
        }
    });



async function excluirAluno(id) {
    try {
        const response = await fetch(`http://localhost:8080/academias/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            buscarAluno(); 
        } else {
            console.error("Erro ao excluir aluno:", response.status);
            console.log(id)
        }
    } catch (error) {
        console.error("Erro de conexão ao excluir aluno:", error);
    }
}

    



