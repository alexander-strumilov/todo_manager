const preloader = document.querySelector('.transition-loader');

function showLoader() {
    preloader.style.display = 'block';
}

function hideLoader() {
    preloader.style.display = 'none';
}

export {
    showLoader,
    hideLoader
}