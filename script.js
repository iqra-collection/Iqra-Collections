const CONFIG = {
  whatsappNumber: "923197556797",
  currency: "PKR",
  discountPercent: 12,
  bank: {
    name: "YOUR BANK NAME",
    title: "IQRA COLLECTION",
    account: "YOUR ACCOUNT NUMBER",
    iban: "YOUR IBAN",
    instructions: "After making the bank transfer, send your payment proof on WhatsApp."
  }
};

const products = [
  {
    id: 1,
    name: "Black Printed Jersey 2-Piece Sleepwear Set for Girls & Women",
    category: "Ready To Wear",
    sub: "Lounge Wear",
    price: 2500,
    originalPrice: 2841,
    discountPercent: 12,
    img: "assets/products/black-printed-jersey-sleepwear.jpg",
    sizes: ["Medium", "Large", "Extra Large"],
    colors: ["Black"],
    description: "Stay comfortable and stylish with this 2-Piece Printed Jersey Sleepwear Set, designed for girls and women. Made from soft and comfortable jersey fabric, this lounge wear set is perfect for sleeping, relaxing at home, or casual lounging. The set includes a printed round-neck sleep shirt and matching sleep trouser in classic black. Its relaxed fit provides comfort and ease of movement throughout the day or night.\n\nFabric: Soft Jersey\nDesign: Printed\nNeck Type: Round Neck\nColor: Black\nStyle: Lounge Wear / Sleepwear\nSuitable For: Girls & Women\nSet Includes: 1 Sleep Shirt + 1 Sleep Trouser\nProduct Code: MZ2098202790DK\n\nSize Guide:\nMedium — Chest 18 inches, Shirt Length 26 inches\nLarge — Chest 21 inches, Shirt Length 28 inches\nExtra Large — Chest 23 inches, Shirt Length 30 inches",
    new: true,
    sale: true
  }
];

const CLOTHES_CATEGORIES = {
  "Unstitched": ["Summer", "Embroidered", "Printed", "Lawn", "Bottoms"],
  "Ready To Wear": ["Embroidered", "Printed", "Solids", "Silk", "Formals", "Kurtis", "Bottoms", "Lounge Wear"],
  "Co-ords": ["Printed", "Embroidered", "Solids", "Silk", "Lounge Wear"],
  "Western": ["Tops", "Co-ords", "Lounge Wear", "Dresses", "Pants", "Jeans", "Winter"]
};

let cart = JSON.parse(localStorage.getItem("iqraCart") || "[]");
const money = n => `${CONFIG.currency} ${Number(n).toLocaleString("en-PK")}`;
const waUrl = message => `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

function productCard(p){
  const discount = p.discountPercent || CONFIG.discountPercent;
  return `<article class="product-card">
    <div class="product-image">
      <span class="badge">${discount}% OFF</span>
      <img src="${p.img}" alt="${p.name}" loading="lazy">
    </div>
    <div class="product-info">
      <div class="product-category">${p.category} · ${p.sub || ""}</div>
      <div class="product-name">${p.name}</div>
      <div class="price">${money(p.price)} <span class="old-price">${money(p.originalPrice)}</span></div>
      <div class="product-actions">
        <button onclick="openProduct(${p.id})">View</button>
        <button onclick="quickWhatsApp(${p.id})">WhatsApp</button>
      </div>
    </div>
  </article>`;
}

function categoryButtons(){
  let html = `<button class="filter-btn active" onclick="setClothesCategory('all',this)">All</button>`;
  for(const category of Object.keys(CLOTHES_CATEGORIES)){
    html += `<button class="filter-btn" onclick="setClothesCategory('${category}',this)">${category}</button>`;
  }
  return html;
}

function setClothesCategory(category, btn){
  const buttons = document.querySelectorAll("#clothesFilters .filter-btn");
  buttons.forEach(b => b.classList.remove("active"));
  if(btn) btn.classList.add("active");
  else {
    const match = [...buttons].find(b => b.textContent === category);
    if(match) match.classList.add("active");
  }
  renderProducts(category);
}

function renderProducts(category="all"){
  const grid = document.getElementById("clothesGrid");
  const empty = document.getElementById("emptyProductsMessage");
  const filtered = category === "all" ? products : products.filter(p => p.category === category);
  grid.innerHTML = filtered.map(productCard).join("");
  if(empty) empty.style.display = filtered.length ? "none" : "block";
  document.getElementById("newGrid").innerHTML = products.filter(p => p.new).map(productCard).join("");
  document.getElementById("sale-products").innerHTML = products.filter(p => p.sale).map(productCard).join("");
}

function render(){
  document.getElementById("clothesFilters").innerHTML = categoryButtons();
  renderProducts("all");
  updateCart();
}

function openProduct(id){
  const p = products.find(x => x.id === id);
  if(!p) return;
  document.getElementById("productModalContent").innerHTML = `<div class="product-detail">
    <img src="${p.img}" alt="${p.name}">
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
}
function closeProduct(){document.getElementById("productModal").classList.add("hidden")}
function addFromModal(id){
  const p=products.find(x=>x.id===id);
  if(!p) return;
  const size=document.getElementById("sizeSelect").value,color=document.getElementById("colorSelect").value,qty=Math.max(1,Number(document.getElementById("qtySelect").value));
  addToCart(p,size,color,qty);closeProduct();openCart();
}
function orderFromModal(id){
  const p=products.find(x=>x.id===id);
  if(!p) return;
  const size=document.getElementById("sizeSelect").value,color=document.getElementById("colorSelect").value,qty=Math.max(1,Number(document.getElementById("qtySelect").value));
  const msg=`Hello Iqra Collection,\n\nI would like to order:\nProduct: ${p.name}\nSKU: IQ-${String(p.id).padStart(4,"0")}\nProduct Code: ${p.productCode || "MZ2098202790DK"}\nSize: ${size}\nColor: ${color}\nQuantity: ${qty}\nPrice: ${money(p.price*qty)}\nDiscount: ${p.discountPercent || CONFIG.discountPercent}% OFF\n\nPlease confirm availability and delivery details.`;
  window.open(waUrl(msg),"_blank");
}
function quickWhatsApp(id){
  const p=products.find(x=>x.id===id);
  if(!p) return;
  window.open(waUrl(`Hello Iqra Collection,\n\nI am interested in:\nProduct: ${p.name}\nSKU: IQ-${String(p.id).padStart(4,"0")}\nPrice: ${money(p.price)}\nDiscount: ${p.discountPercent || CONFIG.discountPercent}% OFF\n\nPlease confirm availability, sizes, colors and delivery details.`),"_blank");
}
function addToCart(p,size,color,qty){
  const key=`${p.id}-${size}-${color}`,existing=cart.find(i=>i.key===key);
  if(existing) existing.qty+=qty; else cart.push({key,id:p.id,name:p.name,price:p.price,img:p.img,size,color,qty});
  localStorage.setItem("iqraCart",JSON.stringify(cart));updateCart();
}
function updateCart(){
  document.getElementById("cartCount").textContent=cart.reduce((a,i)=>a+i.qty,0);
  const box=document.getElementById("cartItems");
  if(!cart.length){box.innerHTML=`<p class="small">Your cart is empty. Add something beautiful.</p>`;document.getElementById("cartTotal").textContent=money(0);return}
  box.innerHTML=cart.map((i,index)=>`<div class="cart-item">
    <img src="${i.img}" alt="${i.name}">
    <div><h4>${i.name}</h4><p>Size: ${i.size} · ${i.color}</p><p>${money(i.price)} × ${i.qty}</p>
      <div class="qty-controls"><button onclick="changeQty(${index},-1)">−</button><span>${i.qty}</span><button onclick="changeQty(${index},1)">+</button><button class="remove" onclick="removeCart(${index})">Remove</button></div>
    </div>
    <strong>${money(i.price*i.qty)}</strong>
  </div>`).join("");
  document.getElementById("cartTotal").textContent=money(cart.reduce((a,i)=>a+i.price*i.qty,0));
}
function changeQty(index,delta){cart[index].qty+=delta;if(cart[index].qty<=0)cart.splice(index,1);localStorage.setItem("iqraCart",JSON.stringify(cart));updateCart()}
function removeCart(index){cart.splice(index,1);localStorage.setItem("iqraCart",JSON.stringify(cart));updateCart()}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("drawerBackdrop").classList.remove("hidden")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("drawerBackdrop").classList.add("hidden")}
function cartWhatsApp(){
  if(!cart.length){alert("Your cart is empty.");return}
  let msg="Hello Iqra Collection,\n\nI would like to place an order:\n\n";
  cart.forEach((i,n)=>{msg+=`${n+1}. ${i.name}\nSKU: IQ-${String(i.id).padStart(4,"0")}\nSize: ${i.size}\nColor: ${i.color}\nQuantity: ${i.qty}\nAmount: ${money(i.price*i.qty)}\n\n`});
  msg+=`Subtotal: ${money(cart.reduce((a,i)=>a+i.price*i.qty,0))}\n\nPlease confirm availability and delivery charges.`;
  window.open(waUrl(msg),"_blank");
}
function bankInfo(){
  alert(`Bank: ${CONFIG.bank.name}\nAccount Title: ${CONFIG.bank.title}\nAccount: ${CONFIG.bank.account}\nIBAN: ${CONFIG.bank.iban}\n\n${CONFIG.bank.instructions}`);
}
function showPolicy(type){
  const data={
    shipping:["Shipping Policy","Shipping charges and delivery times depend on your location and order. Confirm the current delivery details with Iqra Collection before dispatch."],
    returns:["Returns & Refunds","Replace this demo policy with your actual return, exchange and refund terms before launch."],
    privacy:["Privacy Policy","Replace this demo policy with your final privacy policy and applicable legal requirements before launch."]
  };
  document.getElementById("policyContent").innerHTML=`<p class="eyebrow">IQRA COLLECTION</p><h2>${data[type][0]}</h2><p>${data[type][1]}</p>`;
  document.getElementById("policyModal").classList.remove("hidden");
}
function closePolicy(){document.getElementById("policyModal").classList.add("hidden")}

document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("searchBtn").onclick=()=>{document.getElementById("searchOverlay").classList.remove("hidden");document.getElementById("searchInput").focus()};
document.getElementById("closeSearch").onclick=()=>document.getElementById("searchOverlay").classList.add("hidden");
document.getElementById("closeProduct").onclick=closeProduct;
document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("drawerBackdrop").onclick=closeCart;
document.getElementById("whatsappCart").onclick=cartWhatsApp;
document.getElementById("bankInfoBtn").onclick=bankInfo;
document.querySelector(".menu-toggle").onclick=()=>document.getElementById("mobileNav").classList.toggle("open");
document.getElementById("floatingWhatsApp").href=waUrl("Hello Iqra Collection, I would like to know more about your products.");
document.getElementById("contactWhatsApp").href=waUrl("Hello Iqra Collection, I would like to know more about your products.");
document.getElementById("contactForm").addEventListener("submit",e=>{e.preventDefault();const n=document.getElementById("contactName").value,m=document.getElementById("contactMessage").value;window.open(waUrl(`Hello Iqra Collection,\n\nName: ${n}\nMessage: ${m}`),"_blank")});
document.getElementById("searchInput").addEventListener("input",e=>{const q=e.target.value.toLowerCase().trim();document.getElementById("searchResults").innerHTML=products.filter(p=>`${p.name} ${p.category} ${p.sub||""}`.toLowerCase().includes(q)).map(productCard).join("")});
render();
