const firebaseConfig = {
    apiKey: "AIzaSyC9WEYweDpR6Jar3CNfMb3fzA1RmR8h2T8",
    authDomain: "pokemonapp-7cdf4.firebaseapp.com",
    projectId: "pokemonapp-7cdf4",
    storageBucket: "pokemonapp-7cdf4.appspot.com",
    messagingSenderId: "258785971382",
    appId: "1:258785971382:web:b4f250ffbbe0abde2cea17"
};

firebase.initializeApp(firebaseConfig);

function uploadPokemonPhoto() {
    let storageReference = firebase.storage().ref();
    const file = document.querySelector("#file").files[0];
    const nameImage = file.name;
    if (file == null) {
        alert('Select Image')
    } else {
        const metadata = {
            contentType: file.type
        }

        const task = storageReference.child(nameImage).put(file, metadata);

        task
        .then(snapShot => snapShot.ref.getDownloadURL())
        .then(url => {
            console.log(url);
            alert('Image upload successful');
            const imageElement = document.querySelector("#imgNN");
            imageElement.src = url;
        });
    }
    console.log(storageReference);
}
