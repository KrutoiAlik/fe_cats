// Написать запрос c fetch() который:
// - добавляет информацию о коте на сайт +
// - запрашивает все записи с котами +
// - запрашивает конкретную запись с котом+
// - редактирует информацию у конкретной записи с котом +
// - удаляет информацию о коте
// - запрашивает все айдишники


// GET https://cats.petiteweb.dev/api/single/:user/show - отобразить всех котиков
// GET https://cats.petiteweb.dev/api/single/:user/ids - отобразить все возможные айди котиков
// GET https://cats.petiteweb.dev/api/single/:user/show/:id  - отобразить конкретного котика
// POST https://cats.petiteweb.dev/api/single/:user/add - добавить котика
// PUT https://cats.petiteweb.dev/api/single/:user/update/:id - изменить информацию о котике
// DELETE  https://cats.petiteweb.dev/api/single/:user/delete/:id - удалить котика из базы данных

const config = {
    baseUrl: 'https://cats.petiteweb.dev/api/single/krutoialik',
    headers: {
        'content-type': 'application/json',
    }
}



class Api {
    #getResponse(res) {
        return res.ok ? res.json() : Promise.reject();
    }

    #baseUrl;
    #headers;

    constructor(config) {
        this.#baseUrl = config.baseUrl,
            this.#headers = config.headers
    }

    getAllCats() {
        return fetch(`${this.#baseUrl}/show`)
            .then(this.#getResponse)
    }

    getCatById(idCat) {
        return fetch(`${this.#baseUrl}/show/${idCat}`).then(this.#getResponse);
    }

    getIdsCats() {
        return fetch(`${this.#baseUrl}/ids`).then(this.#getResponse);
    }

    addNewCat(data) {
        return fetch(`${this.#baseUrl}/add`, {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify(data)
        }).then(this.#getResponse)
    }

    updateCatById(idCat, data) {
        return fetch(`${this.#baseUrl}/update/${idCat}`, {
            method: 'PUT',
            headers: this.#headers,
            body: JSON.stringify(data)
        }).then(this.#getResponse)
    }

    deleteCatById(idCat) {
        return fetch(`${this.#baseUrl}/delete/${idCat}`, {
            method: 'DELETE',
        }).then(this.#getResponse)
    }
}

const cat = {
    id: 1,
    name: 'Name',
    image: 'Image',
    age: 0,
    rate: 0,
    favorite: false,
    description: 'Description'
};

const root = document.getElementById('root');

const getCard = (cat) => {

    const card = document.createElement('div');
    card.classList.add('cat__card');
    card.dataset.id = cat.id;

    const form = document.createElement('form');
    const fieldset = document.createElement('fieldset');

    if (cat.image) {

        const img = document.createElement('img');
        img.src = cat.image || '';
        img.alt = 'catImage';
        fieldset.appendChild(img);
    }

    const nameField = document.createElement('input');
    nameField.id = 'nameFieldId_' + cat.id;
    nameField.dataset.field = 'name';
    nameField.type = 'text';
    nameField.placeholder = 'Name';
    nameField.value = cat.name || '';

    const imageField = document.createElement('input')
    imageField.id = 'imageFieldId_' + cat.id;
    imageField.dataset.field = 'image';
    imageField.type = 'text';
    imageField.placeholder = 'Image';
    imageField.value = cat.image || '';

    const ageField = document.createElement('input')
    ageField.id = 'ageFieldId_' + cat.id;
    ageField.dataset.field = 'age';
    ageField.type = 'number';
    ageField.placeholder = 'Age';
    ageField.value = cat.age || '';

    const rateField = document.createElement('input')
    rateField.id = 'rateFieldId_' + cat.id;
    rateField.dataset.field = 'rate';
    rateField.type = 'number';
    rateField.placeholder = 'Rate';
    rateField.value = cat.rate || '';

    const favoriteField = document.createElement('input')
    favoriteField.id = 'favoriteFieldId_' + cat.id;
    favoriteField.dataset.field = 'favorite';
    favoriteField.type = 'checkbox';
    favoriteField.checked = cat.favorite || '';

    const descriptionField = document.createElement('input')
    descriptionField.id = 'descriptionFieldId_' + cat.id;
    descriptionField.dataset.field = 'description';
    descriptionField.type = 'text';
    descriptionField.placeholder = 'Description';
    descriptionField.value = cat.description || '';

    const updateBtn = document.createElement('button');
    updateBtn.type = 'button';
    updateBtn.textContent = 'Update';
    updateBtn.dataset.id = cat.id;
    updateBtn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const fields = ['nameFieldId_', 'imageFieldId_', 'ageFieldId_', 'rateFieldId_', 'favoriteFieldId_', 'descriptionFieldId_'];
        const search = fields.map(field => '#' + field + id).join(', ');

        const res = document.querySelectorAll(search);
        const cat = {
            id: id
        };
        res.forEach(field => {
            cat[field.dataset.field] = field.type === 'checkbox' ? field.checked : field.value;
        });
        console.log({ cat });
        api.updateCatById(id, cat).then(() => getData());
    });

    fieldset.appendChild(nameField);
    fieldset.appendChild(imageField);
    fieldset.appendChild(ageField);
    fieldset.appendChild(rateField);
    fieldset.appendChild(favoriteField);
    fieldset.appendChild(descriptionField);
    fieldset.appendChild(updateBtn);
    form.appendChild(fieldset);
    card.appendChild(form);

    return card;
}

const getData = () => {
    document.getElementById('root').innerHTML = '';
    api.getAllCats().then((dataCats) => {
        dataCats.forEach(cat => root.appendChild(getCard(cat)));
        console.log(dataCats);
    })
}

const api = new Api(config);


const obj = {
    name: ""
}

const newObj = JSON.parse(JSON.stringify(obj))

console.log(obj === newObj);

// api.updateCatById(4, { name: "Кот в сапогах" })


getData();