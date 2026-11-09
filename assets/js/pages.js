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

const entityName = document.getElementById('ent-name');
if (entityName) {
    const entity = await getEntity();
    entityName.textContent = entity.name;
}

const entityPantheon = document.getElementById('ent-pantheon');
if (entityPantheon) {
    const entity = await getEntity();
    entityPantheon.textContent = entity.pantheon;
}

const entityAliases = document.getElementById('ent-aliases');
if (entityAliases) {
    const entity = await getEntity();
    entityAliases.textContent = entity.aliases;
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

const entityCallings = document.getElementById('ent-callings')
if (entityCallings) {   
    const entity = await getEntity();
    entityCallings.innerHTML = `
        ${entity.callings
            .slice()
            .sort((a, b) => a.localeCompare(b))
            .map(item => `<span class='wiki-tag'>${item}</span>`)
            .join('')
        }
    `;
}