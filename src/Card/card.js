export class Card {

    #data;
    #onClickHandler;

    constructor(data, onClickHandler) {
        this.#data = data;
        this.#onClickHandler = onClickHandler;
    }

    #getTemplateContent() {
        return document.getElementById('cardTemplate').content.querySelector('.card');
    }

    getElement() {
        const templateElement = this.#getTemplateContent().cloneNode(true);
        const image = templateElement.querySelector('.card__image');
        const name = templateElement.querySelector('.card__name');

        image.src = this.#data.image;
        name.textContent = this.#data.name;

        image.addEventListener('click', () => {
            this.#onClickHandler(this.#data.id);
        })

        return templateElement;
    }
}