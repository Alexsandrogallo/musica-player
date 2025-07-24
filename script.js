const audioPlayer = document.getElementById("audioPlayer");
const songSelect = document.getElementById("songSelect");
const playPauseButton = document.getElementById("playPauseButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const currentSongDisplay = document.getElementById("currentSongDisplay");

// Array con la playlist di canzoni
const playlist = [
  { title: "Ambient Calm", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Soft Piano", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Upbeat Groove", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "Relaxing Waves", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { title: "Gentle Breeze", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { title: "Night Sky", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  { title: "Morning Light", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { title: "City Walk", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { title: "Deep Focus", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
  { title: "Chill Vibes", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
  // Ho riusato altri URL validi di SoundHelix per questi esempi aggiuntivi
  { title: "Energetic Beat (Ex. Song 1)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Dreamy Atmosphere (Ex. Song 2)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Funky Jazz (Ex. Song 3)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "Calm Meditation (Ex. Song 4)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { title: "Inspiring Journey (Ex. Song 5)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" }
];

let currentSongIndex = 0; // Tiene traccia della canzone corrente nella playlist

// --- Funzioni Core del Player ---

// Popola il menu a discesa con le canzoni della playlist
function populatePlaylist() {
  songSelect.innerHTML = "";
  playlist.forEach((song, index) => {
    const option = document.createElement('option');
    option.value = index; // Usiamo l'indice come valore per un facile riferimento
    option.textContent = song.title;
    songSelect.appendChild(option);
  });
}

// Carica e riproduce una canzone in base all'indice
function loadAndPlaySong(index) {
  if (index >= 0 && index < playlist.length) {
    currentSongIndex = index;
    audioPlayer.src = playlist[currentSongIndex].url;
    audioPlayer.play();
    updatePlayerUI(); // Aggiorna l'interfaccia utente dopo il cambio canzone
  } else if (playlist.length > 0) {
    // Se l'indice è fuori dai limiti, riavvia dalla prima canzone (loop)
    loadAndPlaySong(0); 
  }
}

// Aggiorna l'interfaccia utente (testo del pulsante, titolo canzone)
function updatePlayerUI() {
  playPauseButton.textContent = audioPlayer.paused ? '▶️ Play' : '⏸️ Pausa';
  if (playlist.length > 0) {
    currentSongDisplay.textContent = `Ora in riproduzione: ${playlist[currentSongIndex].title}`;
    songSelect.value = currentSongIndex; // Sincronizza il select con la canzone corrente
  } else {
    currentSongDisplay.textContent = 'Nessuna canzone disponibile';
  }
}

// --- Funzioni di Controllo dei Pulsanti ---

function togglePlayPause() {
  if (audioPlayer.paused) {
    // Se l'audioPlayer non ha una sorgente (es. all'avvio prima della prima riproduzione)
    if (!audioPlayer.src) {
        loadAndPlaySong(currentSongIndex); // Carica e riproduci la prima canzone
    } else {
        audioPlayer.play();
    }
  } else {
    audioPlayer.pause();
  }
  updatePlayerUI();
}

function playNextSong() {
  let nextIndex = currentSongIndex + 1;
  if (nextIndex >= playlist.length) {
    nextIndex = 0; // Torna all'inizio della playlist (loop)
  }
  loadAndPlaySong(nextIndex);
}

function playPrevSong() {
  let prevIndex = currentSongIndex - 1;
  if (prevIndex < 0) {
    prevIndex = playlist.length - 1; // Vai alla fine della playlist (loop)
  }
  loadAndPlaySong(prevIndex);
}

// --- Event Listener ---

// Quando una canzone finisce, passa alla successiva
audioPlayer.addEventListener('ended', playNextSong);

// Gestisce la pausa esterna (es. controlli del browser)
audioPlayer.addEventListener('pause', updatePlayerUI);

// Gestisce l'avvio della riproduzione esterna
audioPlayer.addEventListener('play', updatePlayerUI);

// Quando si cambia la selezione nel menu a discesa
songSelect.addEventListener('change', () => {
  loadAndPlaySong(parseInt(songSelect.value)); // Converti il valore (stringa) a intero
});

// --- Inizializzazione all'avvio della pagina ---

populatePlaylist(); // Popola il menu a discesa
// Carica e imposta la prima traccia (se presente) all'avvio
if (playlist.length > 0) {
    audioPlayer.src = playlist[currentSongIndex].url;
    updatePlayerUI(); // Aggiorna UI per mostrare la prima canzone
} else {
    currentSongDisplay.textContent = 'Nessuna canzone disponibile';
    playPauseButton.disabled = true; // Disabilita i controlli se non ci sono canzoni
    prevButton.disabled = true;
    nextButton.disabled = true;
    songSelect.disabled = true;
}

