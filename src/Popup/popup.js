export class Popup {

    #handleEscUp = (e) => {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    constructor(classPopup) {
        this._popupElement = document.querySelector(`.${classPopup}`);
    }

    open() {
        this._popupElement.classList.add('popup-active');
        document.addEventListener('keyup', this.#handleEscUp);
    }

    close() {
        this._popupElement.classList.remove('popup-active');
        document.removeEventListener('keyUp', this.#handleEscUp);
    }

    setMouseDownListener() {
        this._popupElement.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('popup') || !!e.target.closest('.popup__close')) {
                this.close();
            }
        })
    }
}