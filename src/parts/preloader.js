const preloader = document.querySelector('.transition-loader');

console.log(preloader);
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