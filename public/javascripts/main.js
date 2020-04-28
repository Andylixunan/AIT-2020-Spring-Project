// this javascript is for client-side form validation
const createAlbumForm = document.querySelector('#createAlbumForm');
const createAlbumInput = document.querySelector('#createAlbumInput');
const createAlbumInputErr = document.querySelector('#createAlbumError');
const createPhotoForm = document.querySelector('#createPhotoForm');
const createPhotoNameInput = document.querySelector('#createPhotoNameInput');
const createPhotoUrlInput = document.querySelector('#createPhotoUrlInput');
const createPhotoError = document.querySelector('#createPhotoError');

if(createAlbumForm){
createAlbumForm.addEventListener('submit', function (event) {
    if (createAlbumInput.value.length == 0) {
        createAlbumInputErr.textContent = 'You need to enter an album name. (This field cannot be empty)';
        createAlbumInputErr.className = 'error active';
        event.preventDefault();
    }
    else if (createAlbumInput.value.length >= 30) {
        createAlbumInputErr.textContent = 'You need to shorten your album name';
        createAlbumInputErr.className = 'error active';
        event.preventDefault();
    }
});
}
if(createPhotoForm){
createPhotoForm.addEventListener('submit', function (event) {
    if (createPhotoNameInput.value.length == 0 || createPhotoUrlInput.value.length == 0) {
        createPhotoError.textContent = 'You need to enter a photo name and a url. (Both fields cannot be empty)';
        createPhotoError.className = 'error active';
        event.preventDefault();
    }
});
}