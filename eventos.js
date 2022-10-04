const API_URL = 'http://localhost:3000'

async function excluir (id){
    let resposta = confirm('você tem certeza?');

    if (resposta !== true) {
        return;
    }
    
    await fetch(API_URL+'/contatos/'+id, {
        method: 'DELETE'
        

    });
    


    atualizarLista();

}

function atualizarLista(){

    tabela_contatos.innerHTML = '';
    fetch(API_URL+'/contatos')
    

    .then(function(resposta){
        return resposta.json();
    })
    .then(function(lista){
        lista.forEach(function(cadaItem){
            tabela_contatos.innerHTML +=`
            <tr>
                <td>${cadaItem.id}</td>
                <td>${cadaItem.nome}</td>
                <td>${cadaItem.numero}</td>
                <td>${cadaItem.cidade}</td>
                <td>
                    <button onclick="buscarParaEditar(${cadaItem.id})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEditar" class="btn btn-warning"> Editar </button>
                    
                    <button onclick="excluir(${cadaItem.id})" class="btn btn-danger">Excluir</button>
                    
                </td>
                
            </tr> 
            `;
        });     
    })
    

}

atualizarLista();

function inserir(){
    event.preventDefault();
    let dados = {
        nome: input_item.value,
        cidade: input_cidade.value,
        numero: parseInt(input_numero.value),
    };

    fetch(API_URL+'/contatos', {
        method: 'POST',
        body: JSON.stringify(dados),
        headers:{
            'Content-Type': 'application/json'
        }
    })
      .then(resposta => resposta.json())
      .then(resposta => atualizarLista());
    
    form_add.reset();
    

}

function buscarParaEditar(id){
    fetch(API_URL+'/contatos/'+id)
        .then(res => res.json())
        .then(item => {
            input_editar_id.value = id;
            input_editar_nome.value = item.nome;
            input_editar_numero.value = item.numero;
            input_editar_cidade.value = item.cidade;
           
        });
}

function editar(id){
    event.preventDefault();

    let dados = {
        nome: input_editar_nome.value,
        numero: input_editar_numero.value,
        cidade: input_editar_cidade.value,

    };

    fetch(API_URL+'/contatos/'+input_editar_id.value,{
        method: 'PATCH',
        body: JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json'
        }
    
    })    
     .then(res => res.json())
     .then(() => atualizarLista());

    let x = document.querySelector('[data-bs-dismiss="offcanvas"]')
    x.dispatchEvent(new Event('click'));

}
