const response = await fetch('assets/json/data.json');
const data = await response.json();
const listNames = document.getElementById('nameList');

const list = [
  { name: 'Orange', price: 8 },
  { name: 'Banana', price: 5 },
  { name: 'Apple', price: 10 }
];

listNames.innerHTML = data
    .sort((a,b) => a.name.localeCompare(b.name))
    .map(item => `<li>${item.name}</li>`)
    .join('');