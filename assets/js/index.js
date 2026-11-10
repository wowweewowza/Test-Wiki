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
            <a href="./pages/wikipage.html?name=${encodeURIComponent(item.name)}">
                <button type="button">${item.name}</button>
            </a>`)
        .join('');
}

const pantheonList = document.getElementById('pantheon-list');
if (pantheonList) {
    const data = await getData(`entity`);

    const list = [...new Set(data.map(data => data.pantheon))]

    pantheonList.innerHTML = list
        .sort((a, b) => a.localeCompare(b))
        .map(item => `
            <a>
                <button type="button">${item}</button>
            </a>`)
        .join('');
}

const callingsList = document.getElementById('callings-list');
if (callingsList) {
    const data = await getData(`entity`);

    const list = [...new Set(data.flatMap(data => data.callings || []).filter(Boolean))]

    callingsList.innerHTML = list
        .sort((a, b) => a.localeCompare(b))
        .map(item => `
            <a>
                <button type="button">${item}</button>
            </a>`)
        .join('');
}



const purviewsList = document.getElementById('purviews-list');
if (purviewsList) {
    const data = await getData(`entity`);

    const list = [...new Set(data.flatMap(data => data.purviews || []).filter(Boolean))]

    const regex = /\s*\(.*?\)/g;

    const cleanedList = list.map(item => item.replace(regex,'').trim());

    const finalList = [...new Set(cleanedList)];

    purviewsList.innerHTML = finalList
        .sort((a, b) => a.localeCompare(b))
        .map(item => `
            <a>
                <button type="button">${item}</button>
            </a>`)
        .join('');
}