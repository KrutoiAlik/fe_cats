import { Popup } from './src/components/Popup/popup.js';
import { Card } from './src/components/Card/card.js';
import { catService } from './src/services/CatService.js';
import { getCookie } from './src/utils/cookies.js';
import { updateLocalStorage } from './src/reducers/catReducer.js';
import { addSubmitListenerForAddForm, addSubmitListenerForEditForm, addSubmitListenerForLoginForm } from './src/utils/formHelper.js';

const cardsContainer = document.querySelector('.cards');
const popupRead = new Popup('popup__read');
const popupAdd = new Popup('popup__add');
const popupEdit = new Popup('popup__edit');
const popupLogin = new Popup('popup__login');

async function initData() {

    const localData = JSON.parse(localStorage.getItem('cats'));
    const getTimeExpires = localStorage.getItem('catsRefresh');

    if (localData?.length && new Date(getTimeExpires) > new Date()) {
        localData.forEach(catDetails => {
            const catElement = createCatElement(catDetails);
            cardsContainer.append(catElement.getElement());
        });
        return;
    }

    const cats = await catService.getAll();

    cats.forEach(catDetails => {
        const catElement = createCatElement(catDetails);
        cardsContainer.append(catElement.getElement());
    });
    updateLocalStorage(cats, { type: 'ALL_CATS' });
}

const createCatElement = (catDetails) => {
    return new Card(catDetails, () => {
        if (checkAuth()) {
            document.querySelector('.popup.popup__read .popup__details').dataset.id = catDetails.id;
            document.querySelector('.popup.popup__read img').src = catDetails.image;
            const name = document.querySelector('.popup__details h2[name="name"]');
            name.textContent = catDetails.name;

            const age = document.querySelector('.popup__details span[name="age"]')
            age.textContent = catDetails.age;

            const description = document.querySelector('.popup__details p[name="description"]')
            description.textContent = catDetails.description;

            const rate = document.querySelector(`.popup__details input[name="rate"][value="${catDetails.rate}"]`);
            if (rate) {
                rate.checked = true;
            }

            const favorite = document.querySelector('.popup__details span[name="favorite"]');
            favorite.dataset.favorite = catDetails.favorite;
            favorite.innerHTML = catDetails.favorite
                ? '<i class="fa-solid fa-heart"></i>'
                : '<i class="fa-regular fa-heart"></i>';

            popupRead.open();
        } else {
            showLogin();
        }
    });
}

const checkAuth = () => {
    return !!getCookie()['username'];
}

addSubmitListenerForAddForm(checkAuth, (cat) => {
    updateLocalStorage(cat, { type: 'ADD_CAT' });
    popupAdd.close();
    cardsContainer.innerHTML = '';
    initData();
});

addSubmitListenerForEditForm(checkAuth, (cat) => {
    updateLocalStorage(cat, { type: 'EDIT_CAT' });
    popupEdit.close();
    cardsContainer.innerHTML = '';
    initData();
});

addSubmitListenerForLoginForm();

const openEditPopupListener = () => {
    document.querySelector('.popup.popup__read .popup__edit.btn')?.addEventListener('click', (e) => {

        const popupReadDetails = document.querySelector('.popup.popup__read .popup__details');
        const editForm = document.querySelector('.popup__edit form.form');
        const id = editForm.querySelector('input[name="id"]');
        id.value = popupReadDetails.dataset.id;
        id.disabled = true;
        editForm.querySelector('input[name="age"]').value = +popupReadDetails.querySelector('span[name="age"]').textContent;
        editForm.querySelector('input[name="name"]').value = popupReadDetails.querySelector('h2[name="name"]').textContent;
        editForm.querySelector('input[name="rate"]').value = popupReadDetails.querySelector('.rate input:checked')?.value;
        editForm.querySelector('input[name="image"]').value = popupReadDetails.querySelector('.popup__image').src;
        const isFavorite = popupReadDetails.querySelector('span[name="favorite"]').dataset.favorite === 'true' ? true : false;
        editForm.querySelector('input[name="favorite"]').checked = isFavorite;
        editForm.querySelector('textarea[name="description"]').value = popupReadDetails.querySelector('p[name="description"]').textContent;

        popupRead.close.bind(popupRead)();
        popupEdit.open();
    });
}

const deleteCatListener = () => {
    document.querySelector('.popup.popup__read .popup__delete.btn').addEventListener('click', (e) => {
        const id = document.querySelector('.popup.popup__read .popup__details').dataset.id;
        catService.deleteById(id).then(() => {
            updateLocalStorage({ id }, { type: 'DELETE_CAT' });
            popupRead.close.bind(popupRead)();
            cardsContainer.innerHTML = '';
            initData();
        });
    });
}

document.querySelector('.cat__add').addEventListener('click', () => {
    if (checkAuth()) {
        popupAdd.open.bind(popupAdd)();
    } else {
        showLogin();
    }
});

document.querySelector('.popup.popup__add .popup__close').addEventListener('click', popupAdd.close.bind(popupAdd));
document.querySelector('.popup.popup__read .popup__close').addEventListener('click', popupRead.close.bind(popupRead));
document.querySelector('.popup.popup__login .popup__close').addEventListener('click', popupLogin.close.bind(popupLogin));
document.querySelector('.popup.popup__edit .popup__close').addEventListener('click', popupEdit.close.bind(popupEdit));

openEditPopupListener();
deleteCatListener();

popupAdd.setMouseDownListener();
popupRead.setMouseDownListener();
popupLogin.setMouseDownListener();
popupEdit.setMouseDownListener();

function showLogin() {
    popupLogin.open();
}

if (checkAuth()) {
    initData();
} else {
    showLogin();
}