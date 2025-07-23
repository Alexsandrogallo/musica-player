const audioPlayer = document.getElementById("audioPlayer");
const songSelect = document.getElementById("songSelect");

// Array con playlist iniziale (qui solo 10 esempi royalty-free, poi si amplia)
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
  { title: "Chill Vibes", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" }
];

// Genera il menu delle tracce in modo dinamico, pulito e performante
function populatePlaylist() {
  // svuota prima il select per evitare duplicati se eseguito più volte
  songSelect.innerHTML = "";
  playlist.forEach(song => {
    const option = document.createElement('option');
    option.value = song.url;
    option.textContent = song.title;
    songSelect.appendChild(option);
  });
}

// Riproduce la traccia selezionata
function playSong() {
  audioPlayer.src = songSelect.value;
  audioPlayer.play();
}

// Metti in pausa la traccia
function pauseSong() {
  audioPlayer.pause();
}

// Inizializza la pagina con la playlist e carica la prima traccia
populatePlaylist();
audioPlayer.src = playlist[0].url;