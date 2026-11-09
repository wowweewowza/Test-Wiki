async function getEntity() {
    const data = await getData(`entity`);
    const urlParams = new URLSearchParams(window.location.search);
    const targetName = urlParams.get('name');
    const entity = data.find(item => item.name === targetName);
    return entity;
}

async function getData(type) {
    const response = await fetch(`../assets/json/${type}.json`);
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

const entityName = document.getElementById('ent-name');
if (entityName) {
    const entity = await getEntity();
    entityName.textContent = entity.name;
}

const entityPurviews = document.getElementById('ent-purviews')
if (entityPurviews) {   
    const entity = await getEntity();
    entityPurviews.innerHTML = `
        ${entity.purviews
            .slice()
            .sort((a, b) => a.localeCompare(b))
            .map(item => `<span class='wiki-tag'>${item}</span>`)
            .join('')
        }
    `;
}