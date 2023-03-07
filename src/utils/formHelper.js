import { setCookie } from './cookies.js';
import { catService } from '../services/CatService.js';

const addSubmitListenerForAddForm = (checkAuth, handleResult) => {
    const addForm = document.querySelector('.popup__add .form');
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!checkAuth) {
            return;
        }

        const addForm = document.querySelector('.popup__add form.form');
        const idElement = addForm.querySelector('input[name="id"]');
        const ageElement = addForm.querySelector('input[name="age"]');
        const nameElement = addForm.querySelector('input[name="name"]');
        const rateElement = addForm.querySelector('input[name="rate"]');
        const imageElement = addForm.querySelector('input[name="image"]');
        const favoriteElement = addForm.querySelector('input[name="favorite"]');
        const descriptionElement = addForm.querySelector('textarea[name="description"]');

        const newCat = {
            id: +idElement?.value,
            age: +ageElement?.value || 0,
            name: nameElement?.value,
            rate: +rateElement?.value || 0,
            image: imageElement?.value,
            favorite: favoriteElement?.checked,
            description: descriptionElement?.value
        };

        catService.add(newCat).then(() => {
            handleResult(newCat);
            e.target.reset();
        });
    })
}

const addSubmitListenerForEditForm = (checkAuth, handleResult) => {

    const editForm = document.querySelector('.popup__edit .form');
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!checkAuth()) {
            return;
        }

        const editForm = document.querySelector('.popup__edit form.form');
        const idElement = editForm.querySelector('input[name="id"]');
        const ageElement = editForm.querySelector('input[name="age"]');
        const nameElement = editForm.querySelector('input[name="name"]');
        const rateElement = editForm.querySelector('input[name="rate"]');
        const imageElement = editForm.querySelector('input[name="image"]');
        const favoriteElement = editForm.querySelector('input[name="favorite"]');
        const descriptionElement = editForm.querySelector('textarea[name="description"]');

        const updatedCat = {
            age: ageElement?.value,
            name: nameElement?.value,
            rate: rateElement?.value,
            image: imageElement?.value,
            favorite: favoriteElement?.checked,
            description: descriptionElement?.value
        };

        catService.updateById(idElement.value, updatedCat).then(() => {
            handleResult({ id: +idElement.value, ...updatedCat });
            e.target.reset();
        });
    });
}

const addSubmitListenerForLoginForm = () => {

    const loginForm = document.querySelector('.popup__login .form');
    loginForm.addEventListener('submit', (e) => {

        e.preventDefault();

        const userName = document.querySelector('.popup__login input[name="username"]')?.value;

        if (userName) {
            setCookie('username', userName, { expires: 200 });
            location.reload();
        }
    });
}

export {
    addSubmitListenerForAddForm,
    addSubmitListenerForEditForm,
    addSubmitListenerForLoginForm,
}