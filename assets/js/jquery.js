const nameList = document.getElementById('name-list');
if (nameList) {
    const response = await fetch('../assets/json/data.json');
    const data = await response.json();
    nameList.innerHTML = data
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(item => `<li><a href='../pages/wikipage.html?name=${encodeURIComponent(item.name)}'>${item.name}</a></li>`)
        .join('');
}

const entityName = document.getElementById('ent-name');
if (entityName) {
    const response = await fetch('../assets/json/data.json');
    const data = await response.json();
    const urlParams = new URLSearchParams(window.location.search);
    const targetName = urlParams.get('name');
    const entity = data.find(item => item.name === targetName)
    entityName.textContent = entity.name;
}