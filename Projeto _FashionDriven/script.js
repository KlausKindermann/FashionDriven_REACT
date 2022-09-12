
let modelo;
let gola;
let tecido;
let link;
let nome;
let informações;

function perguntarNome(){
  nome = prompt("Qual seu nome?");
  if(nome === ""){
    perguntarNome()
  }
}
perguntarNome()

// Inicio da parte de selecionar opções para fazer o pedido
function selecionarModelo(escolhido){
    const modeloSelecionado = document.querySelector('.modeloPronto');
    if (modeloSelecionado !== null){
        modeloSelecionado.classList.remove ('modeloPronto');  
    }
    escolhido.classList.add('modeloPronto');
    modelo = escolhido.id;
    liberarBotao();
}
function selecionarGola(escolhido){
    const golaSelecionada= document.querySelector('.golaPronto');
    if (golaSelecionada !== null){
        golaSelecionada.classList.remove ('golaPronto');  
    }
    escolhido.classList.add('golaPronto');
    gola = escolhido.id;
    liberarBotao();
}
function selecionarTecido(escolhido){
    const tecidoSelecionado = document.querySelector('.tecidoPronto');
    if (tecidoSelecionado !== null){
        tecidoSelecionado.classList.remove ('tecidoPronto');  
    }
    escolhido.classList.add('tecidoPronto');
    tecido = escolhido.id;
    liberarBotao();
}
function liberarBotao (){
    if(tecido !== undefined && gola !== undefined && tecido !== undefined){
        const esconder = document.querySelector('.pedido')
        esconder.classList.add('escondido');
        const aparecer = document.querySelector('.pedido-pronto')
        aparecer.classList.remove('escondido');
    }
}
// Fim da parte de selecionar opções para fazer o pedido

// Parte de concluir e enviar um pedido
function finalizarPedido(){
    link =  document.querySelector('input').value;
    if(link === ""){
    alert("Insira um link para concluir o pedido!");
    }
    else{
    enviarMensagem()
    }
}
function enviarMensagem(){
    const promise = axios.post(`https://mock-api.driven.com.br/api/v4/shirts-api/shirts`,{
    model: modelo,
    neck: gola,
    material: tecido,
    image: link,
    owner: nome,
    author: nome
    });
    promise.then(carregarPedidos);
    promise.catch(erro);
}
//fim da parte de concluir um pedido

// Parte de carregar os pedidos
function renderizarPedidos(resposta){  
    informações = resposta.data;
    const ulpedidos = document.querySelector('.container-de-pedidos');
    ulpedidos.innerHTML = '';
    let pedidos;
    for(let i = 0; i < resposta.data.length; i++){
        pedidos = resposta.data[i];
        console.log(pedidos);
        let item = `
           <li id="${pedidos.id}" onclick= "copiarPedido(this)">
              <img class="foto-pedido" src="${pedidos.image}">
              <p><a>Criador: </a>${pedidos.owner}</p>
           </li>
           `;
        ulpedidos.innerHTML += item;
    }
}
function carregarPedidos(resposta){
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/shirts-api/shirts`);
    promise.then(renderizarPedidos);
}
    carregarPedidos()
function erro(){
        alert("Ops, não conseguimos processar sua encomenda!");
}
// Fim da parte de carregar pedidos

// Parte de repetir o pedido
function copiarPedido(pedidoCopiado){
  let objetoCopiado;
  const retorno = confirm("Deseja copiar o pedido?");
  if (retorno == false){
    return;
  }
  for(let i = 0; i < informações.length; i++){
    if(informações[i].id == pedidoCopiado.id){
        objetoCopiado = informações[i];
   }
 }
 const promise = axios.post(`https://mock-api.driven.com.br/api/v4/shirts-api/shirts`,{
    model: objetoCopiado.model,
    neck: objetoCopiado.neck,
    material: objetoCopiado.material,
    image: objetoCopiado.image,
    owner: nome,
    author: nome
    });
    promise.then(carregarPedidos);
    promise.catch(erro);
}