const CONFIG = {
  whatsappNumber: "923197556797", // Replace with your WhatsApp number, country code only, no + or spaces.
  currency: "PKR",
  bank: {
    name: "YOUR BANK NAME",
    title: "IQRA COLLECTION",
    account: "YOUR ACCOUNT NUMBER",
    iban: "YOUR IBAN",
    instructions: "After making the bank transfer, send your payment proof on WhatsApp."
  }
};

const products = [
  {id:1,name:"Embroidered Lawn 3 Piece",category:"Clothes",sub:"Lawn Suits",price:5490,oldPrice:6490,img:"https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85",sizes:["S","M","L","XL"],colors:["Rose","Ivory"],description:"Elegant three piece lawn outfit with embroidered details. Replace this demo description with your actual product information.",new:true,sale:true},
  {id:2,name:"Chikankari Cotton Suit",category:"Clothes",sub:"Chikankari",price:4290,oldPrice:null,img:"https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=85",sizes:["S","M","L","XL"],colors:["White","Beige"],description:"A refined everyday cotton look. Replace this demo description with your actual product information.",new:true},
  {id:3,name:"Formal Embroidered Dress",category:"Clothes",sub:"Formal Wear",price:8990,oldPrice:9990,img:"https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85",sizes:["S","M","L"],colors:["Black","Maroon"],description:"Formal Pakistani inspired outfit for special occasions.",sale:true},
  {id:4,name:"Classic Ready to Wear",category:"Clothes",sub:"Ready to Wear",price:3890,oldPrice:null,img:"https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=85",sizes:["S","M","L","XL","XXL"],colors:["Cream","Olive"],description:"A versatile ready to wear look for everyday styling."},
  {id:5,name:"Printed Lawn 2 Piece",category:"Clothes",sub:"Two Piece Suits",price:3290,oldPrice:3790,img:"https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=85",sizes:["S","M","L","XL"],colors:["Blue","Pink"],description:"Lightweight printed lawn suit for warm weather.",sale:true},
  {id:6,name:"Embroidered Kurti",category:"Clothes",sub:"Kurtis",price:2690,oldPrice:null,img:"https://images.unsplash.com/photo-1583391733981-8498a9c0aeb8?auto=format&fit=crop&w=800&q=85",sizes:["S","M","L","XL"],colors:["Black","Rust"],description:"Simple embroidered kurti with an elegant finish.",new:true},
  {id:7,name:"Bridal Khussa",category:"Shoes",sub:"Khussa",price:4990,oldPrice:5590,img:"https://images.unsplash.com/photo-1534653299134-96a171b61581?auto=format&fit=crop&w=800&q=85",sizes:["36","37","38","39","40"],colors:["Gold","Beige"],description:"Traditional inspired khussa for festive and bridal looks.",sale:true},
  {id:8,name:"Crystal Party Heels",category:"Shoes",sub:"Heels",price:5990,oldPrice:null,img:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85",sizes:["36","37","38","39","40"],colors:["Nude","Black"],description:"Elegant heels for parties and formal occasions.",new:true},
  {id:9,name:"Classic Ladies Flats",category:"Shoes",sub:"Flats",price:2990,oldPrice:3490,img:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85",sizes:["36","37","38","39","40","41"],colors:["Black","Tan"],description:"Comfortable everyday flats with a clean finish.",sale:true},
  {id:10,name:"Embroidered Bridal Shoes",category:"Shoes",sub:"Bridal Shoes",price:6990,oldPrice:null,img:"https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=85",sizes:["36","37","38","39","40"],colors:["Gold","Silver"],description:"Statement footwear for weddings and festive events.",new:true},
  {id:11,name:"Everyday Sandals",category:"Shoes",sub:"Sandals",price:2490,oldPrice:null,img:"https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=800&q=85",sizes:["36","37","38","39","40"],colors:["Tan","Black"],description:"Easy everyday sandals designed for comfort."},
  {id:12,name:"Minimal Sneakers",category:"Shoes",sub:"Sneakers",price:3490,oldPrice:3990,img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",sizes:["36","37","38","39","40","41"],colors:["White","Black"],description:"Clean casual sneakers for everyday outfits.",sale:true}
];

let cart = JSON.parse(localStorage.getItem("iqraCart") || "[]");

const money = n => `${CONFIG.currency} ${Number(n).toLocaleString("en-PK")}`;
const waUrl = message => `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

function productCard(p){
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  return `<article class="product-card">
    <div class="product-image">
      ${p.oldPrice ? `<span class="badge">${discount}% OFF</span>` : p.new ? `<span class="badge">NEW</span>` : ""}
      <img src="${p.img}" alt="${p.name}" loading="lazy">
    </div>
    <div class="product-info">
      <div class="product-category">${p.category} · ${p.sub}</div>
      <div class="product-name">${p.name}</div>
      <div class="price">${money(p.price)} ${p.oldPrice ? `<span class="old-price">${money(p.oldPrice)}</span>` : ""}</div>
      <div class="product-actions">
        <button onclick="openProduct(${p.id})">View</button>
        <button onclick="quickWhatsApp(${p.id})">WhatsApp</button>
      </div>
    </div>
  </article>`;
}

function render(){
  document.getElementById("clothesGrid").innerHTML = products.filter(p=>p.category==="Clothes").slice(0,8).map(productCard).join("");
  document.getElementById("shoesGrid").innerHTML = products.filter(p=>p.category==="Shoes").slice(0,8).map(productCard).join("");
  document.getElementById("newGrid").innerHTML = products.filter(p=>p.new).map(productCard).join("");
  document.getElementById("sale-products").innerHTML = products.filter(p=>p.sale).map(productCard).join("");
  document.getElementById("clothesFilters").innerHTML = makeFilters("Clothes");
  document.getElementById("shoesFilters").innerHTML = makeFilters("Shoes");
  updateCart();
}
function makeFilters(category){
  const subs=[...new Set(products.filter(p=>p.category===category).map(p=>p.sub))];
  return `<button class="filter-btn active" onclick="filterProducts('${category}','all',this)">All</button>`+
    subs.map(s=>`<button class="filter-btn" onclick="filterProducts('${category}','${s.replaceAll("'","\\'")}',this)">${s}</button>`).join("");
}
function filterProducts(category,sub,btn){
  btn.parentElement.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
  const target=category==="Clothes"?"clothesGrid":"shoesGrid";
  document.getElementById(target).innerHTML=products.filter(p=>p.category===category&&(sub==="all"||p.sub===sub)).map(productCard).join("");
}
function openProduct(id){
  const p=products.find(x=>x.id===id);
  document.getElementById("productModalContent").innerHTML=`<div class="product-detail">
    <img src="${p.img}" alt="${p.name}">
    <div>
      <div class="eyebrow">${p.category} · ${p.sub}</div>
      <h2 class="detail-title">${p.name}</h2>
      <div class="detail-price">${money(p.price)} ${p.oldPrice?`<span class="old-price">${money(p.oldPrice)}</span>`:""}</div>
      <p class="detail-description">${p.description}</p>
      <label class="variant-label">Size</label>
      <select id="sizeSelect" class="variant-select">${p.sizes.map(s=>`<option>${s}</option>`).join("")}</select>
      <label class="variant-label">Color</label>
      <select id="colorSelect" class="variant-select">${p.colors.map(c=>`<option>${c}</option>`).join("")}</select>
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
  const size=document.getElementById("sizeSelect").value,color=document.getElementById("colorSelect").value,qty=Math.max(1,Number(document.getElementById("qtySelect").value));
  addToCart(p,size,color,qty);closeProduct();openCart();
}
function orderFromModal(id){
  const p=products.find(x=>x.id===id),size=document.getElementById("sizeSelect").value,color=document.getElementById("colorSelect").value,qty=Math.max(1,Number(document.getElementById("qtySelect").value));
  const msg=`Hello Iqra Collection,\n\nI would like to order:\nProduct: ${p.name}\nSKU: IQ-${String(p.id).padStart(4,"0")}\nSize: ${size}\nColor: ${color}\nQuantity: ${qty}\nPrice: ${money(p.price*qty)}\n\nPlease confirm availability and delivery details.`;
  window.open(waUrl(msg),"_blank");
}
function quickWhatsApp(id){
  const p=products.find(x=>x.id===id);
  window.open(waUrl(`Hello Iqra Collection,\n\nI am interested in:\nProduct: ${p.name}\nSKU: IQ-${String(p.id).padStart(4,"0")}\nPrice: ${money(p.price)}\n\nPlease confirm availability, sizes, colors and delivery details.`),"_blank");
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
document.querySelectorAll(".mobile-nav a").forEach(a=>a.onclick=()=>document.getElementById("mobileNav").classList.remove("open"));

document.getElementById("searchInput").addEventListener("input",e=>{
  const q=e.target.value.toLowerCase().trim();
  document.getElementById("searchResults").innerHTML=q?products.filter(p=>(p.name+" "+p.category+" "+p.sub+" "+p.colors.join(" ")).toLowerCase().includes(q)).map(productCard).join(""):`<p class="small">Start typing to search.</p>`;
});
document.getElementById("contactWhatsApp").href=waUrl("Hello Iqra Collection, I would like to ask about your products.");
document.getElementById("floatingWhatsApp").href=waUrl("Hello Iqra Collection, I would like to know more about your products.");
document.getElementById("contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  const n=document.getElementById("contactName").value,m=document.getElementById("contactMessage").value;
  window.open(waUrl(`Hello Iqra Collection,\n\nName: ${n}\nMessage: ${m}`),"_blank");
});
render();