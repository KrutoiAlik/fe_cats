const MAX_LIVE_STORAGE = 10;

function setDataRefresh(minute, key) {
    const setTime = new Date(new Date().getTime() + minute * 60000)
    localStorage.setItem(key, setTime);
    return setTime;
}

function updateLocalStorage(data, action) {
    const oldStorage = JSON.parse(localStorage.getItem('cats'));

    console.log(`Action: [${action.type}]`);

    switch (action.type) {
        case 'ADD_CAT':
            oldStorage.push(data);
            localStorage.setItem('cats', JSON.stringify(oldStorage));
            return;
        case 'ALL_CATS':
            setDataRefresh(MAX_LIVE_STORAGE, 'catsRefresh');
            localStorage.setItem('cats', JSON.stringify(data));
            return;
        case 'DELETE_CAT':
            const newStorage = oldStorage.filter(cat => cat.id !== data.id)
            localStorage.setItem('cats', JSON.stringify(newStorage));
            return;
        case 'EDIT_CAT':
            const updateStorage = oldStorage.map(cat => cat.id !== data.id ? cat : data)
            localStorage.setItem('cats', JSON.stringify(updateStorage));
            return;
        default:
            break;
    }
}

export {
    updateLocalStorage
}