// Get specifically one entry from the entity.json
async function getEntity() {
    const data = await getData(`entity`);
    const urlParams = new URLSearchParams(window.location.search);
    const targetName = urlParams.get('name');
    const entity = data.find(item => item.name === targetName);
    return entity;
}

// Get specifically one entry from the purviews.json
async function getPurview() {
    const data = await getData(`purviews`);
    const urlParams = new URLSearchParams(window.location.search);
    const targetName = urlParams.get('title');
    const purview = data.find(item => item.title === targetName);
    return purview;
}

// Get all info from source
async function getData(type) {
    const response = await fetch(`../assets/json/${type}.json`);
    const data = await response.json();
    return data;
}

// For picking out info from chosen entities
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
    const aliases = entity.aliases;

    if (aliases === 'N/A') {
        entityAliases.textContent = '';
    } else {
        entityAliases.textContent = aliases
    }
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

// Purviews

const purviewTitleList = document.getElementById('purview-title-list');
if (purviewTitleList) {
    const data = await getData(`purviews`);
    purviewTitleList.innerHTML = data
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(item => `<li>${item.title}</li>`)
        .join('');
}

const purviewInfoList = document.getElementById('purview-info-list');
if (purviewInfoList) {
    const data = await getData(`purviews`);
    purviewInfoList.innerHTML = data
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(item => `<li>${item.info}</li>`)
        .join('');
}

const purviewList = document.getElementById('purview-list');
if (purviewList) {
    const data = await getData(`purviews`);
    purviewList.innerHTML = data
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(item => `
            <a>
                <button class="grid-container two-grid-col">
                    <div>${item.title}</div>
                    <div>${item.info}</div>
                </button>
            </a>`)
        .join('');
}

// Templates

const footer = document.getElementById('footer');
if (footer) {
    footer.innerHTML = '<a href="..">Go Back</a>';
}