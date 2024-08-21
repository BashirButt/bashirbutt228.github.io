let shop = document.getElementById("shop");



let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateshop = () => {
  return (shop.innerHTML = shopitemsData
    .map((x) => {
      let { id, name, price, Desc, Image } = x;
      let search = basket.find((y) => y.id === id) || { item: 0 };
      return `
        <div id="product-id-${id}" class="item">
          <img width="220" src="${Image}" alt="">
          <div class="details">
            <h3>${name}</h3>
            <p>${Desc}</p>
            <div class="price-quantity">
              <h3>$ ${price}</h3>
              <div class="buttons">
                <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                <div id="${id}" class="quantity">${search.item === undefined ? 0:search.item}</div>
                <i onclick="increment('${id}')" class="bi bi-plus"></i>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join(""));
};

generateshop();

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

  update(selecteditem.id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search?.item || 0;
  Calculation();
};

let Calculation = () => {
  let CartIcon = document.getElementById("cartamount");
  CartIcon.innerHTML = basket
    .map((x) => x.item)
    .reduce((x, y) => x + y, 0);
};

Calculation();
