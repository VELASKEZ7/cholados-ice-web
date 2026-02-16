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
  { threshold: 0.05, rootMargin: "0px 0px -8% 0px" }
);

revealNodes.forEach((node) => observer.observe(node));

const yearNode = document.querySelector("#year");
if (yearNode) {
  yearNode.textContent = `Actualizado ${new Date().getFullYear()}`;
}

const CONTACT_WHATSAPP = "573216567202";
const contactForm = document.querySelector("#contact-form");

function notify(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast?.classList.remove("show"), 1500);
}

if (contactForm instanceof HTMLFormElement) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const type = String(formData.get("type") || "").trim();
    const zone = String(formData.get("zone") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !phone || !type || !message) {
      notify("Completa los campos obligatorios.");
      return;
    }

    const text = [
      "*Contacto Web - Cholados Ice*",
      `Nombre: ${name}`,
      `Telefono: ${phone}`,
      `Solicitud: ${type}`,
      `Zona: ${zone || "Sin zona especificada"}`,
      "",
      "*Detalle*",
      message,
    ].join("\n");

    const url = `https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
    notify("Mensaje listo. Te llevamos a WhatsApp.");
  });
}

