const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 30;
const apiKey = 'oCH7cIdFcPeibbixghgFbtToxPk4EOm58zCxrUAOVXU';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages ) {
        ready = true;
        loader.hidden = true;
    }
}

//Helper function to set attributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for photos and add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> element
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event listener. Check when each is loaded
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imageCpntainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
         const response = await fetch(apiUrl);
         photosArray = await response.json();
         displayPhotos();
    } catch (error) {
        //Catch error
    }
}

//Check to see if scroll is near bottom. Load more photos
window.addEventListener('scroll', () => {
    if ( window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready ){
        ready = false;
        getPhotos();
    }   
})

// Onlload
getPhotos(); 