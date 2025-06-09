const API_URL = 'https://jsonplaceholder.typicode.com/users';
const tableBody = document.querySelector('#users-table tbody');
const cardsContainer = document.getElementById('cards-container');
const cityChartCtx = document.getElementById('cityChart').getContext('2d');

async function fetchUsers() {
  const response = await fetch(API_URL);
  const users = await response.json();
  renderTable(users);
  renderCards(users);
  renderCityChart(users);
}

function renderTable(users) {
  users.forEach(user => {
    tableBody.innerHTML += `
      <tr>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.address.city}</td>
        <td><a href="http://${user.website}" target="_blank">${user.website}</a></td>
      </tr>
    `;
  });
}

function renderCards(users) {
  const total = users.length;
  const cities = [...new Set(users.map(u => u.address.city))].length;

  cardsContainer.innerHTML = `
    <div class="col-md-6 col-lg-4 mb-3">
      <div class="card card-porsche p-3">
        <h4>Total de Clientes</h4>
        <p class="display-6">${total}</p>
      </div>
    </div>
    <div class="col-md-6 col-lg-4 mb-3">
      <div class="card card-porsche p-3">
        <h4>Cidades Atendidas</h4>
        <p class="display-6">${cities}</p>
      </div>
    </div>
  `;
}

function renderCityChart(users) {
  const cityCounts = {};
  users.forEach(user => {
    const city = user.address.city;
    cityCounts[city] = (cityCounts[city] || 0) + 1;
  });

  new Chart(cityChartCtx, {
    type: 'bar',
    data: {
      labels: Object.keys(cityCounts),
      datasets: [{
        label: 'Clientes por Cidade',
        data: Object.values(cityCounts),
        backgroundColor: '#ffcc00'
      }]
    },
    options: {
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#fff' }
        },
        x: {
          ticks: { color: '#fff' }
        }
      }
    }
  });
}

fetchUsers();
