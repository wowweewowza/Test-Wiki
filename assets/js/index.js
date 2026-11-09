// Get all info from source
async function getData(type) {
    const response = await fetch(`./assets/json/${type}.json`);
    const data = await response.json();
    return data;
}

// Simple li
const nameList = document.getElementById('name-list');
if (nameList) {
    const data = await getData(`entity`);
    nameList.innerHTML = data
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(item => `
            <a href="../pages/wikipage.html?name=${encodeURIComponent(item.name)}">
                <button type="button">${item.name}</button>
            </a>`)
        .join('');
}