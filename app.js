let products = JSON.parse(localStorage.getItem('products')) || [];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function save(){
localStorage.setItem('products',JSON.stringify(products));
localStorage.setItem('cart',JSON.stringify(cart));
}

function display(){
let all = document.getElementById('products');
let mens = document.getElementById('mens');
let women = document.getElementById('women');
let admin = document.getElementById('adminProducts');

if(all) all.innerHTML="";
if(mens) mens.innerHTML="";
if(women) women.innerHTML="";
if(admin) admin.innerHTML="";

products.forEach((p,i)=>{
let card=`
<div class="card">
<img src="${p.img}">
<h3>${p.name}</h3>
<p>Rs.${p.price}</p>
<p>Size: ${p.size}</p>
<button onclick="addToCart(${i})">Add</button>
${admin?`<button onclick="deleteProduct(${i})">Delete</button>`:""}
</div>`;

if(all) all.innerHTML+=card;
if(mens && p.category=="mens") mens.innerHTML+=card;
if(women && p.category=="women") women.innerHTML+=card;
if(admin) admin.innerHTML+=card;

});
}

function addToCart(i){
cart.push(products[i]);
save();
alert("Added");
}

function deleteProduct(i){
products.splice(i,1);
save();
display();
}

function checkout(){
let msg="Hi New Fashion,%0AOrder:%0A";
cart.forEach(c=>{
msg+=`${c.name} (${c.size}) - Rs.${c.price}%0A`;
});
window.open("https://wa.me/94743045915?text="+msg);
}

function showCart(){
let el=document.getElementById('cart');
if(!el) return;
let total=0;
el.innerHTML="";
cart.forEach(c=>{
total+=Number(c.price);
el.innerHTML+=`<p>${c.name} (${c.size}) - Rs.${c.price}</p>`;
});
el.innerHTML+=`<h2>Total: Rs.${total}</h2>`;
}

function addProduct(){
let name=document.getElementById('name').value;
let price=document.getElementById('price').value;
let img=document.getElementById('img').value;
let category=document.getElementById('category').value;
let size=document.getElementById('size').value;

products.push({name,price,img,category,size});
save();
display();
}

display();
showCart();
