const overlay = document.querySelector('.modal-overlay'),
    modalWindow = document.querySelector('.modal-window'),
    modalWindowClose = document.querySelector('.modal-window__close'),
    modalWindowBtns = document.querySelector('.modal-window__btns'),
    modalWindowYesBtn = document.querySelector('.modal-window__btn_yes'),
    modalWindowNoBtn = document.querySelector('.modal-window__btn_no');

modalWindowClose.addEventListener('click', closeModal)

function closeModal() {
    overlay.style.visibility = 'hidden';
    modalWindow.style.visibility = 'hidden';
}

// Export
export {
    overlay,
    modalWindow,
    modalWindowClose,
    modalWindowBtns,
    modalWindowYesBtn,
    modalWindowNoBtn,
    closeModal
}
// sudo npm run dev