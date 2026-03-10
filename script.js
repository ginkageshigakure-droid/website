// Simpele winkelmand-logica voor Noma's Pizza

const orderList = document.getElementById('order-list');
const totalPriceEl = document.getElementById('total-price');
const dealInfoEl = document.getElementById('deal-info');
const checkoutBtn = document.getElementById('checkout-btn');

let cart = [];

function updateUI() {
  orderList.innerHTML = '';

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} – €${item.price}`;
    li.className = 'order-item';

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'x';
    removeBtn.className = 'btn-remove';
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      updateUI();
    };

    li.appendChild(removeBtn);
    orderList.appendChild(li);
  });

  const count = cart.length;
  let total = cart.reduce((sum, item) => sum + item.price, 0);

  // Deal: 3 pizza's voor €15
  if (count >= 3) {
    const setsOfThree = Math.floor(count / 3);
    const rest = count % 3;
    total = setsOfThree * 15 + rest * 5;
    dealInfoEl.textContent = `Deal actief: ${setsOfThree}× (3 pizza's voor €15)`;
    dealInfoEl.classList.add('deal-active');
  } else {
    dealInfoEl.textContent = `Deal: 3 pizza's voor €15`;
    dealInfoEl.classList.remove('deal-active');
  }

  totalPriceEl.textContent = `€${total}`;
}

document.querySelectorAll('.btn-add').forEach(btn => {
  btn.addEventListener('click', e => {
    const card = e.target.closest('.card');
    const name = card.dataset.name;
    const price = Number(card.dataset.price);

    cart.push({ name, price });
    updateUI();
  });
});

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Je hebt nog geen pizza’s gekozen.');
      return;
    }
    alert('Bedankt voor je bestelling bij Noma’s Pizza! 🍕');
    cart = [];
    updateUI();
  });
}
