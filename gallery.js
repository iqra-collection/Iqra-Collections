// Product gallery enhancement for Iqra Collection
(function () {
  const galleryImages = [
    "assets/products/Black Printed Jersey Sleepwear Set (1).jpeg",
    "assets/products/Black Printed Jersey Sleepwear Set (2).jpeg",
    "assets/products/Black Printed Jersey Sleepwear Set (3).jpeg",
    "assets/products/Black Printed Jersey Sleepwear Set (4).jpeg",
    "assets/products/Black Printed Jersey Sleepwear Set (5).jpeg",
    "assets/products/Black Printed Jersey Sleepwear Set (6).jpeg",
    "assets/products/Black Printed Jersey Sleepwear Set (7).jpeg",
    "assets/products/Black Printed Jersey Sleepwear Set (8).jpeg"
  ];
  const pinkProductImages = ["assets/products/womens-pink-printed-jersey-sleepwear.jpg"];

  const style = document.createElement("style");
  style.textContent = `
    .gallery-wrap{min-width:0}.main-product-image{display:block;width:100%;max-height:520px;object-fit:contain;border-radius:14px;background:#f7f3f1}.product-thumbs{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:10px}.product-thumb{border:2px solid transparent;background:#fff;padding:0;border-radius:8px;overflow:hidden;cursor:pointer}.product-thumb.active{border-color:#8b5e5e}.product-thumb img{display:block;width:100%;height:82px;object-fit:cover}.product-detail{display:grid;grid-template-columns:minmax(280px,1fr) minmax(280px,1fr);gap:28px;align-items:start}@media(max-width:760px){.product-detail{grid-template-columns:1fr}.main-product-image{max-height:430px}.product-thumb img{height:70px}}
  `;
  document.head.appendChild(style);

  const originalOpenProduct = window.openProduct;
  window.openProduct = function (id) {
    const p = products.find(x => x.id === id);
    if (!p) return originalOpenProduct(id);
    const images = p.id === 1 ? galleryImages : (p.id === 2 ? pinkProductImages : [p.img]);
    document.getElementById("productModalContent").innerHTML = `
      <div class="product-detail">
        <div class="gallery-wrap">
          <img id="mainProductImage" class="main-product-image" src="${images[0]}" alt="${p.name}">
          <div class="product-thumbs">
            ${images.map((src, i) => `<button class="product-thumb ${i === 0 ? 'active' : ''}" onclick="selectProductImage(${i},${p.id})"><img src="${src}" alt="${p.name} image ${i + 1}"></button>`).join("")}
          </div>
        </div>
        <div>
          <div class="eyebrow">${p.category} · ${p.sub || ""}</div>
          <h2 class="detail-title">${p.name}</h2>
          <div class="detail-price">${money(p.price)} <span class="old-price">${money(p.originalPrice)}</span></div>
          <p class="discount-note">${p.discountPercent || CONFIG.discountPercent}% OFF</p>
          <p class="detail-description">${(p.description || "").replace(/\n/g,"<br>")}</p>
          <label class="variant-label">Size</label>
          <select id="sizeSelect" class="variant-select">${(p.sizes || ["M"]).map(s=>`<option>${s}</option>`).join("")}</select>
          <label class="variant-label">Color</label>
          <select id="colorSelect" class="variant-select">${(p.colors || ["As shown"]).map(c=>`<option>${c}</option>`).join("")}</select>
          <label class="variant-label">Quantity</label>
          <input id="qtySelect" class="variant-select" type="number" min="1" value="1">
          <div class="detail-buttons">
            <button onclick="addFromModal(${p.id})">Add to cart</button>
            <button class="wa" onclick="orderFromModal(${p.id})">Order Through WhatsApp</button>
          </div>
        </div>
      </div>`;
    document.getElementById("productModal").classList.remove("hidden");
  };

  window.selectProductImage = function (index, productId) {
    const images = productId === 1 ? galleryImages : (productId === 2 ? pinkProductImages : []);
    const src = images[index];
    const main = document.getElementById("mainProductImage");
    if (main && src) main.src = src;
    document.querySelectorAll(".product-thumb").forEach((b, i) => b.classList.toggle("active", i === index));
  };
})();
