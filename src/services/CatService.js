class CatService {

    #baseUrl = 'https://cats.petiteweb.dev/api/single/krutoialik';
    #headers = {
        'content-type': 'application/json'
    }

    #getResponse(res) {

        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Server error: ${res.status}`);
    }

    getAll() {
        return fetch(`${this.#baseUrl}/show`).then(this.#getResponse);
    }

    getById(id) {
        return fetch(`${this.#baseUrl}/show/${id}`).then(this.#getResponse);
    }

    getIds() {
        return fetch(`${this.#baseUrl}/ids`).then(this.#getResponse);
    }

    add(details) {
        const options = {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify(details)
        };
        return fetch(`${this.#baseUrl}/add`, options).then(this.#getResponse);
    }

    updateById(id, details) {
        const options = {
            method: 'PUT',
            headers: this.#headers,
            body: JSON.stringify(details)
        };
        return fetch(`${this.#baseUrl}/update/${id}`, options).then(this.#getResponse);
    }

    deleteById(id) {
        const options = {
            method: 'DELETE'
        }
        return fetch(`${this.#baseUrl}/delete/${id}`, options).then(this.#getResponse);
    }

}

export const catService = new CatService();