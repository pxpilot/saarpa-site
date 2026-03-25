const ACCESS_TOKEN = 'IGQWRNQXRabnZA3cmt1cHQxUEswc1NBWWd3TDZArMXpWT2FUYVVpdVZAqaUJ1RG82Yy1QMloyWE9sZAVVGM08waS1OUXd0eUxSNnFwUUxPZAFBOeDVCVy0xWHhBS0NNS0ZAMNGtoakdFdHJlckRIZAwZDZD';
const USER_ID = '25427489056894500';
const ENDPOINT = `https://graph.instagram.com/${USER_ID}/media?fields=id,media_type,media_url,caption&access_token=${ACCESS_TOKEN}&limit=100`;

let allPhotos = [];
let displayedPhotos = new Set();

async function fetchInstagramPhotos(url = ENDPOINT) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Failed to fetch photos');
            return allPhotos;
        }

        const data = await response.json();
        allPhotos = allPhotos.concat(data.data);

        if (data.paging && data.paging.next) {
            return fetchInstagramPhotos(data.paging.next);
        }
        
        return allPhotos;
    } catch (error) {
        console.error('Error:', error);
        return allPhotos;
    }
}

function getRandomSize() {
    const sizes = ['1fr', '2fr', '3fr'];
    return sizes[Math.floor(Math.random() * sizes.length)];
}

function createMediaElement(photo) {
    if (photo.media_type === 'IMAGE') {
        const img = document.createElement('img');
        img.src = photo.media_url;
        img.alt = photo.caption || 'Instagram Photo';
        return img;
    } else if (photo.media_type === 'VIDEO') {
        const video = document.createElement('video');
        video.src = photo.media_url;
        video.controls = true;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        return video;
    }
}

function displayPhotos(photos) {
    const photosContainer = document.getElementById('photos');
    photosContainer.innerHTML = ''; // Clear previous photos

    const filteredPhotos = photos.filter(photo => 
        (photo.media_type === 'IMAGE' || photo.media_type === 'VIDEO') && 
        photo.caption && photo.caption.toLowerCase().includes('zen')
    );

    const numberOfPhotos = 22;//Math.floor(Math.random() * 9) + 4; // Random number between 4 and 12
    const photosToShow = getRandomSubset(filteredPhotos, numberOfPhotos);

    photosToShow.forEach(photo => {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'photo';
        photoDiv.style.gridColumn = `span ${getRandomSize()}`;
        photoDiv.style.gridRow = `span ${getRandomSize()}`;
        photoDiv.dataset.photoId = photo.id;

        const mediaElement = createMediaElement(photo);
        if (mediaElement) {
            photoDiv.appendChild(mediaElement);
            photosContainer.appendChild(photoDiv);
            displayedPhotos.add(photo.id);
        }
    });

    setInterval(() => replaceRandomPhoto(photosContainer, filteredPhotos), 3000); // Replace every 3 seconds
    document.getElementById("title1").id = 'title2'; 
}

function getRandomSubset(array, size) {
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, size);
    selected.forEach(item => displayedPhotos.add(item.id));
    return selected;
}

function replaceRandomPhoto(container, photos) {
    const photoDivs = container.getElementsByClassName('photo');
    if (photoDivs.length > 0) {
        const randomIndex = Math.floor(Math.random() * photoDivs.length);
        let randomPhoto;
        do {
            randomPhoto = photos[Math.floor(Math.random() * photos.length)];
        } while (displayedPhotos.has(randomPhoto.id));

        const mediaElement = photoDivs[randomIndex].querySelector('img, video');
        displayedPhotos.delete(photoDivs[randomIndex].dataset.photoId);
        displayedPhotos.add(randomPhoto.id);
        photoDivs[randomIndex].dataset.photoId = randomPhoto.id;

        mediaElement.style.opacity = 0;

        setTimeout(() => {
            const newMediaElement = createMediaElement(randomPhoto);
            if (newMediaElement) {
                photoDivs[randomIndex].replaceChild(newMediaElement, mediaElement);
                newMediaElement.style.opacity = 1;
            }
        }, 1000); // Duration of the fade out/in effect
    }
}

async function main() {
    const photos = await fetchInstagramPhotos();
    displayPhotos(photos);
}

main();