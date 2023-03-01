import { cats } from './src/cats.js';
import { Popup } from './src/Popup/popup.js';
import { Card } from './src/Card/card.js';

const popupEdit = new Popup('popup__edit');

const createCatElement = (catDetails) => {
    return new Card(catDetails, () => {
        document.querySelector('.popup img').src = catDetails.image;
        popupEdit.open();
    });
}

const cardsContainer = document.querySelector('.cards');

const addForm = document.querySelector('.popup__add .form');
addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const idElement = document.querySelector('input[name="id"]');
    const ageElement = document.querySelector('input[name="age"]');
    const nameElement = document.querySelector('input[name="name"]');
    const rateElement = document.querySelector('input[name="rate"]');
    const imageElement = document.querySelector('input[name="image"]');
    const favouriteElement = document.querySelector('input[name="favourite"]');
    const descriptionElement = document.querySelector('textarea[name="description"]');

    const newCat = {
        id: idElement?.value,
        age: ageElement?.value, 
        name: nameElement?.value, 
        rate: rateElement?.value, 
        image: imageElement?.value,
        favourite: favouriteElement?.checked, 
        description: descriptionElement?.value
    };

    cats.shift(newCat);
    cardsContainer.prepend(createCatElement(newCat).getElement());

    e.target.reset();

    popupAdd.close();
})

cats.forEach(catDetails => {
    const catElement = createCatElement(catDetails);
    cardsContainer.append(catElement.getElement());
});

const popupAdd = new Popup('popup__add');

document.querySelector('.cat__add').addEventListener('click', popupAdd.open.bind(popupAdd));

document.querySelector('.popup.popup__add .popup__close').addEventListener('click', popupAdd.close.bind(popupAdd));
document.querySelector('.popup.popup__edit .popup__close').addEventListener('click', popupEdit.close.bind(popupEdit));

popupAdd.setMouseDownListener();
popupEdit.setMouseDownListener();