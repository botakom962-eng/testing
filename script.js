// Data Katalog Produk Minuman (Menggunakan Gambar Terintegrasi)
const products = [
  {
    id: 1,
    name: "Coca Cola",
    price: 6000,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Cold Coffee",
    price: 10000,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Orange Juice",
    price: 8000,
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Green Tea",
    price: 7000,
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Mineral Water",
    price: 4000,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4e?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    name: "Milk Boba",
    price: 12000,
    image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=300&auto=format&fit=crop&q=80"
  }
];

let selectedProduct = null;
let qrCodeInstance = null;

// Utility Format Rupiah
function formatRupiah(amount) {
  return "Rp " + amount.toLocaleString("id-ID");
}

// Render Produk ke Rak
function renderProducts() {
  const gridContainer = document.getElementById("product-grid");
  gridContainer.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-img">
      <div class="product-name">${product.name}</div>
      <div class="product-price">${formatRupiah(product.price)}</div>
      <button class="buy-btn" onclick="openQRISModal(${product.id})">Beli via QRIS</button>
    `;
    gridContainer.appendChild(card);
  });
}

// Buka Modal & Generate QR Code QRIS
function openQRISModal(productId) {
  selectedProduct = products.find((p) => p.id === productId);
  if (!selectedProduct) return;

  // Update Data Modal
  document.getElementById("modal-product-name").innerText = selectedProduct.name;
  document.getElementById("modal-product-price").innerText = formatRupiah(selectedProduct.price);

  // Clear QR Code Lama
  const qrContainer = document.getElementById("qrcode-container");
  qrContainer.innerHTML = "";

  // Dynamic QRIS Payload String (Simulasi Format QRIS Standard Indonesia)
  const qrisPayload = `00020101021226680014ID.LINKAJA.WWW01189360091100221088820215ID10200230219080303UDE51440014ID.CO.QRIS.WWW0215ID10200230219080303UDE520458125303360540${selectedProduct.price}5802ID5913VENDING_STORE6007BANDUNG61054011162070703A016304`;

  // Generate QR Code
  qrCodeInstance = new QRCode(qrContainer, {
    text: qrisPayload,
    width: 150,
    height: 150,
    colorDark: "#0f172a",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  // Tampilkan Modal
  document.getElementById("qris-modal").style.display = "flex";

  // Update Status Layar
  document.getElementById("status-title").innerText = "MENUNGGU SCAN";
  document.getElementById("status-desc").innerText = `Scan QRIS ${formatRupiah(selectedProduct.price)}`;
}

// Tutup Modal QRIS
function closeModal() {
  document.getElementById("qris-modal").style.display = "none";
  document.getElementById("status-title").innerText = "SIAP DILAYANI";
  document.getElementById("status-desc").innerText = "Silakan pilih minuman pada rak";
  selectedProduct = null;
}

// Proses Pembayaran Berhasil (Simulasi)
function processPayment() {
  if (!selectedProduct) return;

  const item = selectedProduct;
  closeModal();

  // Status Memproses
  document.getElementById("status-title").innerText = "PEMBAYARAN SUKSES";
  document.getElementById("status-desc").innerText = `Mengeluarkan ${item.name}...`;

  // Animasi Mengeluarkan Minuman ke Slot
  setTimeout(() => {
    const dispenserOutput = document.getElementById("dispenser-output");
    dispenserOutput.innerHTML = `
      <div class="dispensed-item">
        <img src="${item.image}" alt="${item.name}">
        <p>${item.name}</p>
      </div>
    `;

    document.getElementById("status-title").innerText = "SILAKAN AMBIL";
    document.getElementById("status-desc").innerText = "Terima kasih telah berbelanja!";
  }, 1000);
}

// Inisialisasi Aplikasi saat Halaman Dimuat
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});