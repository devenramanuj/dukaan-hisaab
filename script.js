let stock = {};
let ledger = [];

function purchaseItem(item, qty, rate){
  if(stock[item]){
    stock[item].qty += qty;
    stock[item].purchaseRate = rate;
  } else {
    stock[item] = {qty: qty, purchaseRate: rate, sellRate: rate*1.2};
  }
  ledger.push({type:'purchase', item, qty, rate, date:new Date()});
  alert(`${item} ખરીદી ${qty} units at ₹${rate} each`);
  updateStockTable();
}

function sellItem(item, qty){
  if(!stock[item] || stock[item].qty < qty){
    alert(`Stock not enough for ${item}`);
    return;
  }
  stock[item].qty -= qty;
  ledger.push({type:'sale', item, qty, rate: stock[item].sellRate, date:new Date()});
  alert(`${item} વેચાણ ${qty} units at ₹${stock[item].sellRate} each`);
  updateStockTable();
}

function updateStockTable(){
  let tbody = document.getElementById('stockBody');
  if(!tbody) return;
  tbody.innerHTML = '';
  for(let item in stock){
    tbody.innerHTML += `<tr>
      <td>${item}</td>
      <td>${stock[item].qty}</td>
      <td>${stock[item].purchaseRate}</td>
      <td>${stock[item].sellRate}</td>
    </tr>`;
  }
}
