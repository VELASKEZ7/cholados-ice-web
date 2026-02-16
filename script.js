const WHATSAPP_NUMBER = "573216567202";

const MENU_ITEMS = [
  {
    id: "banana-split",
    name: "Banana Split",
    copy: "Clasico con fruta, helado y salsas.",
    prices: [
      { label: "Mediano", value: 15000 },
      { label: "Grande", value: 17000 },
    ],
  },
  {
    id: "ensalada-frutas",
    name: "Ensalada de Frutas",
    copy: "Papaya, melon, mango y mas.",
    prices: [
      { label: "Basica", value: 13000 },
      { label: "Plus", value: 14000 },
      { label: "Premium", value: 15000 },
      { label: "Mega", value: 17000 },
    ],
  },
  {
    id: "oblea-ice",
    name: "Oblea Ice",
    copy: "Oblea con fruta, queso y crema.",
    prices: [{ label: "Unico", value: 13000 }],
  },
  {
    id: "maracumango",
    name: "Maracumango",
    copy: "Combinacion de maracuya y mango.",
    prices: [
      { label: "Mini", value: 11000 },
      { label: "Mediano", value: 12000 },
      { label: "Grande", value: 13000 },
    ],
  },
  {
    id: "waffle-ice",
    name: "Waffle Ice",
    copy: "Waffle con helado, fruta y crema.",
    prices: [{ label: "Unico", value: 15000 }],
  },
  {
    id: "osito-ice",
    name: "Osito Ice",
    copy: "Helado decorado para ninos.",
    prices: [{ label: "Unico", value: 13000 }],
  },
  {
    id: "gusanito-ice",
    name: "Gusanito Ice",
    copy: "Helado divertido con toppings.",
    prices: [{ label: "Unico", value: 13000 }],
  },
  {
    id: "malteada",
    name: "Malteada",
    copy: "Malteada de tu sabor favorito.",
    prices: [{ label: "Unico", value: 13000 }],
  },
  {
    id: "payaso-frutal",
    name: "Payaso Frutal",
    copy: "Copa especial con frutas y crema.",
    prices: [{ label: "Unico", value: 12000 }],
  },
  {
    id: "pina-helado",
    name: "Pina con Helado",
    copy: "Pina, helado y salsas dulces.",
    prices: [{ label: "Unico", value: 15000 }],
  },
  {
    id: "raspado",
    name: "Raspado",
    copy: "Refrescante clasico con hielo.",
    prices: [
      { label: "Pequeno", value: 5000 },
      { label: "Grande", value: 7000 },
    ],
  },
  {
    id: "malteada-wisky",
    name: "Malteada Crema de Wisky",
    copy: "Version especial de la casa.",
    prices: [{ label: "Unico", value: 16000 }],
  },
  {
    id: "fresas-crema",
    name: "Fresas con Crema",
    copy: "Fresas frescas con crema chantilly.",
    prices: [
      { label: "Mediano", value: 11000 },
      { label: "Grande", value: 12000 },
    ],
  },
  {
    id: "brownie-helado",
    name: "Brownie con Helado",
    copy: "Brownie caliente con helado.",
    prices: [{ label: "Unico", value: 13000 }],
  },
  {
    id: "raspado-helado",
    name: "Raspado con Helado",
    copy: "Raspado con porcion de helado.",
    prices: [
      { label: "Mediano", value: 9000 },
      { label: "Grande", value: 11000 },
    ],
  },
  {
    id: "duraznos-crema",
    name: "Duraznos con Crema",
    copy: "Durazno, crema y toques dulces.",
    prices: [{ label: "Unico", value: 15000 }],
  },
  {
    id: "granizado-quipitos",
    name: "Granizado de Quipitos",
    copy: "Granizado con gomas y jarabe.",
    prices: [{ label: "Unico", value: 13000 }],
  },
  {
    id: "mango-biche",
    name: "Mango Biche",
    copy: "Mango fresco con sal y limon.",
    prices: [{ label: "Unico", value: 11000 }],
  },
];

const state = {
  selectedPriceByItem: {},
  cart: [],
  method: "Nequi",
};
const STORE_KEY = "cholados-ice-web-state-v1";

const menuItemsNode = document.querySelector("#menu-items");
const cartListNode = document.querySelector("#cart-list");
const cartEmptyNode = document.querySelector("#cart-empty");
const cartTotalNode = document.querySelector("#cart-total");
const payWhatsAppNode = document.querySelector("#pay-whatsapp");
const activeMethodNode = document.querySelector("#active-method");
const customerNameNode = document.querySelector("#customer-name");
const customerAddressNode = document.querySelector("#customer-address");
const customerNotesNode = document.querySelector("#customer-notes");
const clearCartNode = document.querySelector("#clear-cart");

const revealNodes = document.querySelectorAll(".reveal, .stagger");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
revealNodes.forEach((node) => observer.observe(node));

function formatCOP(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

function renderMenu() {
  if (!menuItemsNode) return;

  menuItemsNode.innerHTML = MENU_ITEMS.map((item) => {
    const selectedIndex = state.selectedPriceByItem[item.id] ?? 0;
    const selectedPrice = item.prices[selectedIndex];
    const options = item.prices
      .map(
        (price, idx) =>
          `<button type="button" class="price-option ${
            selectedIndex === idx ? "active" : ""
          }" data-action="select-price" data-item-id="${item.id}" data-price-index="${idx}">
            ${price.label}
          </button>`
      )
      .join("");

    return `<article class="shop-card">
      <h4>${item.name}</h4>
      <small>${item.copy}</small>
      <div class="price-switch">${options}</div>
      <div class="card-footer">
        <span class="card-price">${formatCOP(selectedPrice.value)}</span>
        <button type="button" class="add-btn" data-action="add-item" data-item-id="${item.id}" data-price-index="${selectedIndex}">
          Agregar
        </button>
      </div>
    </article>`;
  }).join("");
}

function findCartItem(key) {
  return state.cart.find((entry) => entry.key === key);
}

function addToCart(itemId, priceIndex) {
  const item = MENU_ITEMS.find((entry) => entry.id === itemId);
  if (!item) return;
  const selectedPrice = item.prices[priceIndex];
  const key = `${itemId}-${priceIndex}`;
  const existing = findCartItem(key);

  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      key,
      name: item.name,
      label: selectedPrice.label,
      unitPrice: selectedPrice.value,
      qty: 1,
    });
  }

  renderCart();
  showToast(`${item.name} agregado al carrito`);
}

function getTotal() {
  return state.cart.reduce((acc, item) => acc + item.unitPrice * item.qty, 0);
}

function updateWhatsAppLink() {
  if (!payWhatsAppNode) return;

  if (state.cart.length === 0) {
    payWhatsAppNode.href = `https://wa.me/${WHATSAPP_NUMBER}`;
    payWhatsAppNode.classList.add("btn-disabled");
    return;
  }

  const name = customerNameNode?.value.trim() || "Cliente web";
  const address = customerAddressNode?.value.trim() || "Sin direccion enviada";
  const notes = customerNotesNode?.value.trim() || "Sin notas";
  const total = getTotal();

  const itemsText = state.cart
    .map(
      (item) =>
        `- ${item.name} (${item.label}) x${item.qty}: ${formatCOP(item.qty * item.unitPrice)}`
    )
    .join("\n");

  const message = [
    "*Pedido Web - Cholados Ice*",
    `Cliente: ${name}`,
    `Entrega: ${address}`,
    `Pago: ${state.method}`,
    "",
    "*Productos*",
    itemsText,
    "",
    `Total: ${formatCOP(total)}`,
    `Notas: ${notes}`,
  ].join("\n");

  payWhatsAppNode.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  payWhatsAppNode.classList.remove("btn-disabled");
}

function renderCart() {
  if (!cartListNode || !cartEmptyNode || !cartTotalNode) return;

  if (state.cart.length === 0) {
    cartListNode.innerHTML = "";
    cartEmptyNode.style.display = "block";
  } else {
    cartEmptyNode.style.display = "none";
    cartListNode.innerHTML = state.cart
      .map(
        (item) => `<li class="cart-item">
          <div>
            <strong>${item.name}</strong>
            <small>${item.label} - ${formatCOP(item.unitPrice)} c/u</small>
          </div>
          <div class="cart-actions">
            <button type="button" class="qty-btn" data-action="minus" data-key="${item.key}">-</button>
            <strong>${item.qty}</strong>
            <button type="button" class="qty-btn" data-action="plus" data-key="${item.key}">+</button>
          </div>
        </li>`
      )
      .join("");
  }

  cartTotalNode.textContent = formatCOP(getTotal());
  updateWhatsAppLink();
  persistState();
}

function persistState() {
  try {
    const payload = {
      cart: state.cart,
      method: state.method,
      customerName: customerNameNode?.value ?? "",
      customerAddress: customerAddressNode?.value ?? "",
      customerNotes: customerNotesNode?.value ?? "",
    };
    localStorage.setItem(STORE_KEY, JSON.stringify(payload));
  } catch (_) {
    // Silent fallback for private mode.
  }
}

function hydrateState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (Array.isArray(data.cart)) state.cart = data.cart;
    if (typeof data.method === "string") state.method = data.method;

    if (customerNameNode && typeof data.customerName === "string") {
      customerNameNode.value = data.customerName;
    }
    if (customerAddressNode && typeof data.customerAddress === "string") {
      customerAddressNode.value = data.customerAddress;
    }
    if (customerNotesNode && typeof data.customerNotes === "string") {
      customerNotesNode.value = data.customerNotes;
    }
  } catch (_) {
    // Ignore invalid cache.
  }
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast?.classList.remove("show"), 1400);
}

function syncPaymentUI() {
  document.querySelectorAll(".pay-chip").forEach((chip) => {
    const isActive = chip.getAttribute("data-method") === state.method;
    chip.classList.toggle("active", isActive);
  });
  if (activeMethodNode) activeMethodNode.textContent = `Metodo: ${state.method}`;
}

if (menuItemsNode) {
  menuItemsNode.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const optionButton = target.closest("[data-action='select-price']");
    if (optionButton instanceof HTMLElement) {
      const itemId = optionButton.dataset.itemId;
      const priceIndex = Number(optionButton.dataset.priceIndex);
      if (!itemId || Number.isNaN(priceIndex)) return;

      state.selectedPriceByItem[itemId] = priceIndex;
      renderMenu();
      return;
    }

    const addButton = target.closest("[data-action='add-item']");
    if (addButton instanceof HTMLElement) {
      const itemId = addButton.dataset.itemId;
      const priceIndex = Number(addButton.dataset.priceIndex);
      if (!itemId || Number.isNaN(priceIndex)) return;
      addToCart(itemId, priceIndex);
    }
  });
}

if (cartListNode) {
  cartListNode.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest("[data-action]");
    if (!(button instanceof HTMLElement)) return;

    const action = button.dataset.action;
    const key = button.dataset.key;
    if (!action || !key) return;

    const item = findCartItem(key);
    if (!item) return;

    if (action === "plus") item.qty += 1;
    if (action === "minus") item.qty -= 1;
    state.cart = state.cart.filter((entry) => entry.qty > 0);
    renderCart();
  });
}

document.querySelectorAll(".pay-chip").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".pay-chip").forEach((chip) => chip.classList.remove("active"));
    button.classList.add("active");
    state.method = button.dataset.method || "Nequi";
    syncPaymentUI();
    updateWhatsAppLink();
    persistState();
  });
});

[customerNameNode, customerAddressNode, customerNotesNode].forEach((input) => {
  input?.addEventListener("input", () => {
    updateWhatsAppLink();
    persistState();
  });
});

document.querySelectorAll("[data-offer-item]").forEach((button) => {
  button.addEventListener("click", () => {
    const itemId = button.getAttribute("data-offer-item");
    const priceIndex = Number(button.getAttribute("data-offer-price"));
    if (!itemId || Number.isNaN(priceIndex)) return;
    addToCart(itemId, priceIndex);
  });
});

clearCartNode?.addEventListener("click", () => {
  state.cart = [];
  renderCart();
  showToast("Carrito vaciado");
});

const statusNode = document.querySelector("#open-status");
function getOpenStatus() {
  const now = new Date();
  const day = now.getDay(); // 0: dom, 6: sab
  const hour = now.getHours();
  const isWeekend = day === 0 || day === 6;
  const openHour = isWeekend ? 10 : 9;
  const closeHour = 21;
  const isOpen = hour >= openHour && hour < closeHour;
  if (isOpen) return "ABIERTO AHORA";
  return "CERRADO EN ESTE MOMENTO";
}

if (statusNode) {
  statusNode.textContent = getOpenStatus();
  statusNode.style.color = statusNode.textContent.includes("ABIERTO")
    ? "#009b61"
    : "#c93f2f";
}

const yearNode = document.querySelector("#year");
if (yearNode) yearNode.textContent = `Actualizado ${new Date().getFullYear()}`;

hydrateState();
syncPaymentUI();
renderMenu();
renderCart();
