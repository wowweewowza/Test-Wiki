// Get all info from source
const getData = async (type) => {
    const response = await fetch(`./assets/json/${type}.json`);
    const data = await response.json();
    return data;
}

const makeList = async (data, key) => {
    const list = [...new Set(data.flatMap(data => data[key] || []).filter(Boolean))]
    return list;
}

const listHtml = async (element, list, key, url_root) => {
    element.innerHTML = list
        .sort((a, b) => a.localeCompare(b))
        .map(item => `
            <a href="${url_root}?${key}=${encodeURIComponent(item)}">
                <button type="button">${item}</button>
            </a>`)
        .join('');
}

// Simple li
const nameList = document.getElementById('name-list');
if (nameList) {
    const data = await getData('entity');
    const key = 'name';
    const list = await makeList(data, key);
    await listHtml(nameList, list, key, './pages/wikipage.html');
}

const pantheonList = document.getElementById('pantheon-list');
if (pantheonList) {
    const data = await getData('entity');
    const key = 'pantheon';
    const list = await makeList(data, key);
    await listHtml(pantheonList, list, key, './pages/pantheonpage.html');
}

const callingsList = document.getElementById('callings-list');
if (callingsList) {
    const data = await getData('entity');
    const key = 'callings';
    const list = await makeList(data, key);
    await listHtml(callingsList, list, key, './pages/callingpage.html');
}

const purviewsList = document.getElementById('purviews-list');
if (purviewsList) {
    const data = await getData(`entity`);
    const key = 'purviews';

    const dirytList = await makeList(data, key);

    const regex = /\s*\(.*?\)/g;
    const cleanedList = dirytList.map(item => item.replace(regex,'').trim());
    const list = [...new Set(cleanedList)];

    await listHtml(purviewsList, list, key, './pages/purviewpage.html');

}