const firebaseConfig = {
    apiKey: "AIzaSyC9WEYweDpR6Jar3CNfMb3fzA1RmR8h2T8",
    authDomain: "pokemonapp-7cdf4.firebaseapp.com",
    projectId: "pokemonapp-7cdf4",
    storageBucket: "pokemonapp-7cdf4.appspot.com",
    messagingSenderId: "258785971382",
    appId: "1:258785971382:web:b4f250ffbbe0abde2cea17"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Función para subir la foto de un Pokémon al almacenamiento
function uploadPokemonPhoto() {
    const storageReference = firebase.storage().ref();
    const file = document.querySelector("#file").files[0];

    if (file == null) {
        alert('Select Image');
        return;
    }

    const nameImage = file.name;
    const metadata = {
        contentType: file.type
    };

    const task = storageReference.child(nameImage).put(file, metadata);

    task.then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            console.log(url);
            alert('Image upload successful');
            updateImageElement(url);
        })
        .catch(error => {
            console.log(error);
            alert('Image upload failed');
        });
}

// Actualizar el elemento de imagen con la URL de la foto subida
function updateImageElement(url) {
    const imageElement = document.querySelector("#imgNN");
    imageElement.src = url;
}

