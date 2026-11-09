async function getData(type) {
    const response = await fetch(`./assets/json/${type}.json`);
    const data = await response.json();
    return data;
}

const nameList = document.getElementById('name-list');
if (nameList) {
    const data = await getData(`entity`);
    nameList.innerHTML = data
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(item => `<li><a href='../pages/wikipage.html?name=${encodeURIComponent(item.name)}'>${item.name}</a></li>`)
        .join('');
}