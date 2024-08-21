let label = document.getElementById("label");
let ShoppingCart = document.getElementById("Shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let CartIcon = document.getElementById("cartamount");
  CartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    ShoppingCart.innerHTML = basket
      .map((x) => {
        let {
          id,
          item
        } = x;
        let search = shopitemsData.find((y) => y.id === id) || {};
        return `
                <div class="cart-item">
                    <img width="110" src="${search.Image}" alt="">
                    <div class="details">
                       <div class="title-price-x">
                       <h4 class="title-price">
                       <p>${search.name}</p>
                       <P class="cart-item-price">$ ${search.price}</p>
                       </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                       </div>
                      <div class="buttons">
                         <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                          <div id="${id}" class="quantity">${item}</div>
                         <i onclick="increment('${id}')" class="bi bi-plus"></i>
                        </div>
                        <h3>$ ${item * search.price}</h3>
                    </div>
                    
                </div>
            `;
      })
      .join(""); // Ensure to join the array returned by map into a string
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
          <button class="HomeBtn">Back to home</button>
        </a>
        `;
  }
};

generateCartItems();

let increment = (id) => {
  let selecteditem = shopitemsData.find((x) => x.id === id);
  let search = basket.find((x) => x.id === selecteditem.id);

  if (search === undefined) {
    basket.push({
      id: selecteditem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
  update(selecteditem.id);
  
};

let decrement = (id) => {
  let selecteditem = shopitemsData.find((x) => x.id === id);
  let search = basket.find((x) => x.id === selecteditem.id);

  if (search === undefined || search.item === 0) return;
  else {
    search.item -= 1;
  }
  generateCartItems();
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
  update(selecteditem.id);
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item || 0;
  calculation();
  generateCartItems();
  TotalAmount();
  
};
// update(selecteditem.id);
let removeItem = (id) =>{
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};
let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = ()=>{
if(basket.length !==0){
  let Amount= basket.map((x)=>{
    let {item,id}=x;
    let search = shopitemsData.find((y)=> y.id === id )|| [];
     return  item * search.price;
     
  }).reduce((x,y) => x+y,0);
  label.innerHTML = `
  <h2>Your Total Bill is $ ${Amount}</h2>
  
  <button class="checkout">Checkout</button>
  <button onclick="clearCart()" class="removeAll">Clear Cart</button>
  `
   
  
} else return;


};
TotalAmount();