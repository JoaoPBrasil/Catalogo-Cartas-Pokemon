const addCardButton = document.getElementById("addCardButton");
const cardFormContainer = document.getElementById("cardFormContainer");
const cardForm = document.getElementById("cardForm");
const formSubmitButton = document.getElementById("formSubmitButton");
const formCancelButton = document.getElementById("formCancelButton");
const cardContainer = document.getElementById("cardContainer");

// Carrinho
const cartContainer = document.getElementById("cartContainer");
const cartItemsContainer = document.getElementById("cartItems");
const totalPriceElement = document.getElementById("totalPrice");
const checkoutButton = document.getElementById("checkoutButton");

// Array para armazenar as cartas e o carrinho
let cards = [];
let cart = [];
let editingIndex = null;

// Função para exibir as cartas na página
function displayCards() {
  cardContainer.innerHTML = ''; // Limpa a lista antes de adicionar as cartas
  cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    cardElement.innerHTML = `
      <img src="${card.image}" alt="${card.name}">
      <h3>${card.name}</h3>
      <p><strong>Descrição:</strong> ${card.description}</p>
      <p class="price">Preço: R$ ${card.price.toFixed(2)}</p>
      <div class="actions">
        <button onclick="addToCart(${index})">Adicionar ao Carrinho</button>
        <button onclick="removeCard(${index})">Remover</button>
        <button class="edit-btn" onclick="editCard(${index})">Editar</button>
      </div>
    `;

    cardContainer.appendChild(cardElement);
  });
}

// Função para adicionar carta ao carrinho
function addToCart(index) {
  const card = cards[index];
  cart.push(card);
  displayCart();
}

// Função para exibir o carrinho
function displayCart() {
  cartItemsContainer.innerHTML = ''; // Limpa o carrinho antes de exibir os itens

  let total = 0;

  cart.forEach((item, index) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");
    cartItemElement.innerHTML = `
      <p>${item.name}</p>
      <p>R$ ${item.price.toFixed(2)}</p>
      <button onclick="removeFromCart(${index})">Remover</button>
    `;

    cartItemsContainer.appendChild(cartItemElement);

    total += item.price;
  });

  totalPriceElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Função para remover item do carrinho
function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
}

// Função para finalizar a compra
checkoutButton.addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio. Adicione cartas ao carrinho para comprar.");
  } else {
    alert("Compra finalizada com sucesso! Obrigado por comprar conosco.");
    cart = []; // Limpa o carrinho após a compra
    displayCart();
  }
});

// Função para cancelar a edição ou adição de carta
formCancelButton.addEventListener("click", function () {
  cardFormContainer.style.display = "none";
  editingIndex = null; // Reseta o índice de edição
});

// Função para adicionar ou editar uma carta
cardForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("cardName").value;
  const description = document.getElementById("cardDescription").value;
  const image = document.getElementById("cardImage").value;
  const price = parseFloat(document.getElementById("cardPrice").value);

  if (editingIndex !== null) {
    // Editando uma carta existente
    cards[editingIndex] = { name, description, image, price };
    editingIndex = null; // Resetamos o índice de edição após salvar
  } else {
    // Adicionando uma nova carta
    const newCard = { name, description, image, price };
    cards.push(newCard);
  }

  displayCards();
  cardFormContainer.style.display = "none"; // Esconde o formulário após o submit
});

// Função para remover uma carta
function removeCard(index) {
  cards.splice(index, 1);
  displayCards();
}

// Função para editar uma carta
function editCard(index) {
  const card = cards[index];

  // Preenche o formulário com os dados da carta
  document.getElementById("cardName").value = card.name;
  document.getElementById("cardDescription").value = card.description;
  document.getElementById("cardImage").value = card.image;
  document.getElementById("cardPrice").value = card.price;

  // Exibe o formulário e altera o botão para "Salvar Alterações"
  formSubmitButton.textContent = "Salvar Alterações";
  cardFormContainer.style.display = "block";
  editingIndex = index; // Marca que estamos editando essa carta
}

// Exibe as cartas iniciais
displayCards();

// Botão para abrir o formulário de adicionar carta
addCardButton.addEventListener("click", function () {
  cardFormContainer.style.display = "block";
  formSubmitButton.textContent = "Adicionar Carta"; // Define o texto do botão como "Adicionar Carta"
});
