// ===============================
// BASE DE DADOS DO CARDÁPIO
// ===============================

const menu = {

  otoshi: [
    { nome: "Sunomono", desc: "Salada de Pepino e Gergelim", preco: 10.00 },
    { nome: "Sunomono Camarão", desc: "Pepino com Camarão", preco: 24.99 },
    { nome: "Sunomono Kani", desc: "Pepino, Kani e Gergelim", preco: 23.00 },
    { nome: "Sunomono Salmão", desc: "Pepino com Salmão", preco: 24.99 },
    { nome: "Sunomono Especial", desc: "Pepino, Kani e Peixe", preco: 24.99 },
    { nome: "Missoshiro", desc: "Sopa de Soja", preco: 10.00 },
    { nome: "Ceviche Salmão", preco: 24.99 },
    { nome: "Ceviche Misto", preco: 24.99 },
    { nome: "Carpaccio de Salmão", preco: 30.00 }
  ],

  porcoes: [
    { nome: "Isca de Salmão", preco: 30.00 },
    { nome: "Isca de Camarão", preco: 30.00 },
    { nome: "Bolinho de Salmão (10un)", preco: 22.00 },
    { nome: "Batata Frita", preco: 15.00 }
  ],

  rolinho: [
    { nome: "Harumaki Salmão", preco: 16.00 },
    { nome: "Harumaki Camarão", preco: 16.00 },
    { nome: "Harumaki Queijo", preco: 16.00 }
  ],

  temaki: [
    { nome: "Filadélfia", preco: 25.99 },
    { nome: "Salmão Grelhado", preco: 25.99 },
    { nome: "Kani", preco: 25.99 },
    { nome: "Koi", preco: 25.99 },
    { nome: "Skin", preco: 25.00 },
    { nome: "Maguno", preco: 25.00 },
    { nome: "Spicy Tuna", preco: 25.00 },
    { nome: "Couve", preco: 27.00 },
    { nome: "Ebitem", preco: 26.99 },
    { nome: "Califórnia", preco: 24.99 },
    { nome: "Primavera", preco: 25.99 },
    { nome: "Temaki sem Arroz", preco: 31.99 },
    { nome: "Temaki do Chefe", preco: 35.00 },
    { nome: "Temaki da Casa", preco: 30.00 }
  ],

  yakissoba: [
    { nome: "Yakissoba P", desc: "Frango / Carne / Camarão", preco: 25.99 },
    { nome: "Yakissoba G", desc: "Frango / Carne / Camarão", preco: 35.99 }
  ],

  sashimi: [
    { nome: "Salmão (5un)", preco: 15.00 },
    { nome: "Camarão (5un)", preco: 18.00 },
    { nome: "Atum (5un)", preco: 18.00 },
    { nome: "Kani (5un)", preco: 17.00 }
  ],

  hotroll: [
    { nome: "Filadélfia (10un)", preco: 24.99 },
    { nome: "Big Hot", preco: 30.99 },
    { nome: "Ebi Camarão", preco: 25.00 },
    { nome: "Hot Especial", preco: 29.99 }
  ],

  uramaki: [
    { nome: "Philadelphia (10un)", preco: 21.99 },
    { nome: "Koi", preco: 21.99 },
    { nome: "Skin", preco: 18.99 },
    { nome: "Spicy Tuna", preco: 21.99 }
  ],

  combinado: [
    { nome: "15 unidades", preco: 35.99 },
    { nome: "20 unidades", preco: 50.99 },
    { nome: "30 unidades", preco: 70.99 },
    { nome: "40 unidades", preco: 80.99 },
    { nome: "50 unidades", preco: 90.99 }
  ],

  bebidas: [
    { nome: "Coca-Cola", preco: 6.00 },
    { nome: "Coca-Cola Zero", preco: 6.00 },
    { nome: "Guaraná", preco: 6.00 },
    { nome: "Heineken", preco: 10.00 },
    { nome: "Água", preco: 3.00 }
  ]
};

// ===============================
// ABRIR POPUP
// ===============================

function abrirCategoria(categoria) {

  const container = document.getElementById("popupItens");
  container.innerHTML = "";

  if (!menu[categoria]) return;

  menu[categoria].forEach(item => {

    container.innerHTML += `
      <div class="item-card">

        <div class="item-info">
          <h4 style="color:black;">${item.nome}</h4>
          <small style="color:black;">${item.desc || ""}</small>
          <p style="color:black; font-weight:600;">
            R$ ${item.preco.toFixed(2)}
          </p>
        </div>

        <div class="controle">

          <button class="btn-qtd"
            onclick="alterarQtd('${item.nome}', -1, ${item.preco})">
            -
          </button>

          <span class="qtd"
            id="qtd-${item.nome.replace(/\s/g,'')}">
            0
          </span>

          <button class="btn-qtd"
            onclick="alterarQtd('${item.nome}', 1, ${item.preco})">
            +
          </button>

          <button class="btn-add"
            onclick="adicionarDireto('${item.nome}', ${item.preco})">
            Adicionar
          </button>

        </div>

      </div>
    `;
  });

  document.getElementById("popup").style.display = "flex";
}



// ===============================
// FECHAR POPUP
// ===============================

function fecharPopup(event){
    if(!event || event.target.id === "popup"){
        document.getElementById("popup").style.display = "none";
    }
}


// ===============================
// CARRINHO
// ===============================

// ===============================
// CARRINHO
// ===============================

let carrinho = [];

// Alterar quantidade no popup
function alterarQtd(nome, valor, preco) {

  let id = "qtd-" + nome.replace(/\s/g,'');
  let span = document.getElementById(id);

  let atual = parseInt(span.innerText);
  atual += valor;

  if (atual < 0) atual = 0;

  span.innerText = atual;
}


// Adicionar ao carrinho
function adicionarDireto(nome, preco) {

  let id = "qtd-" + nome.replace(/\s/g,'');
  let span = document.getElementById(id);
  let quantidade = parseInt(span.innerText);

  if (quantidade <= 0) {
    alert("Selecione a quantidade!");
    return;
  }

  let itemExistente = carrinho.find(p => p.nome === nome);

  if (itemExistente) {
    itemExistente.qtd += quantidade;
  } else {
    carrinho.push({
      nome: nome,
      qtd: quantidade,
      preco: preco
    });
  }

  span.innerText = 0;

  atualizarCarrinho();

  alert("✅ Pedido adicionado ao carrinho!");
}


// Atualizar carrinho lateral
function atualizarCarrinho() {

  const container = document.getElementById("cartItems");
  const totalSpan = document.getElementById("cartTotal");
  const contador = document.getElementById("cartCount");

  container.innerHTML = "";
  let total = 0;
  let totalItens = 0;

  carrinho.forEach(item => {

    total += item.qtd * item.preco;
    totalItens += item.qtd;

    container.innerHTML += `
      <div class="item-carrinho">
        ${item.nome} x${item.qtd}
        <button onclick="removerItem('${item.nome}')">❌</button>
      </div>
    `;
  });

  totalSpan.innerText = total.toFixed(2);
  contador.innerText = totalItens;
}


// Remover item
function removerItem(nome) {
  carrinho = carrinho.filter(item => item.nome !== nome);
  atualizarCarrinho();
}


// Abrir/fechar carrinho
function toggleCart() {
  document.getElementById("cart").classList.toggle("open");
}


// Finalizar pedido
function finishOrder() {

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  document.getElementById("checkoutModal").style.display = "flex";
}

function closeCheckout() {
  document.getElementById("checkoutModal").style.display = "none";
}


function sendOrder() {

  let endereco = document.getElementById("address").value;
  let pagamento = document.getElementById("paymentMethod").value;

  if (endereco.trim() === "") {
    alert("Por favor, preencha o endereço.");
    return;
  }

  let mensagem = "🍣 *Pedido - Kyoko Sushi* 🍣\n\n";

  let total = 0;

  carrinho.forEach(item => {
    mensagem += `• ${item.nome} x${item.qtd}\n`;
    total += item.qtd * item.preco;
  });

  mensagem += `\n💰 Total: R$ ${total.toFixed(2)}\n`;
  mensagem += `\n📍 Endereço: ${endereco}\n`;
  mensagem += `💳 Pagamento: ${pagamento}\n`;

  let numero = "5582993955723";
  let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");

  // Limpar tudo após envio
  carrinho = [];
  atualizarCarrinho();
  closeCheckout();
}


