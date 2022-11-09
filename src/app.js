"use strict";

import { lyric, singer } from "./helpers/fetch.js";

import musicFetch from "./helpers/musicFetch.js";

const SONG_NAME = localStorage.getItem("songName");
const SINGER_NAME = localStorage.getItem("singer");
const MUSIC_PLAYER = await musicFetch(SONG_NAME);

console.log(SONG_NAME, SINGER_NAME);

const addMusicPlayer = (musicID) => {
    const container = document.querySelector('.music-frame')
    
    container.innerHTML = `
    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${musicID}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
}

addMusicPlayer(MUSIC_PLAYER.id)

const lyricMain = async (songName, singerName) => {
  const container = document.querySelector(".lyrics");

  const song = await lyric(singerName, songName);
  const songArt = song.art;
  const songLyric = song.mus[0];

  container.innerHTML = `
        <span class="title-container">
            <h1 class="song-name">${songLyric.name}</h1>
            <h2 class="artist">${songArt.name}</h2>
        </span>
        <p class="music">${songLyric.text}</p>
        <a class="about-link" href="${songArt.url}" target="_blank">
            <button class="about">Mais sobre ${songArt.name}</button>
        </a> 
    `;

  if (songLyric.translate)
    translate();

  ranking(songArt.name);
};

lyricMain(SONG_NAME, SINGER_NAME);

const translate = () => {
  const translateContainer = document.querySelector(".translate");
  translateContainer.innerHTML = `
        <h2 class="option-title">Traduzir Letra</h2>
        <div class="input-container">
            <input type="radio" name="translate" id="english" class="hidden" checked>
            <label for="english" class="input-text">
                <img src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/05/bandeira-estados-unidos.jpg" alt="bandeira dos estados unidos" class="flag">
                ORIGINAL
            </label>
            <input type="radio" name="translate" id="portuguese" class="hidden">
            <label for="portuguese" class="input-text">
                <img src="https://www.gov.br/planalto/pt-br/conheca-a-presidencia/acervo/simbolos-nacionais/bandeira/bandeiragrande.jpg" alt="bandeira do brasil" class="flag">
                TRADUÇÃO
            </label>
        </div>
    `;
  document.getElementById("english").addEventListener("change", english);
  document.getElementById("portuguese").addEventListener("change", portuguese);
};
const ranking = async (art) => {
  const name = art.toLowerCase();
  const artist = await singer(name);
  const fixedArtist = artist.splice(0, 5);

  const cards = fixedArtist.map(topLyrics);

  const container = document.querySelector(".top-musics-list");
  container.replaceChildren(...cards);
};

const topLyrics = (item, index) => {
  const card = document.createElement("a");
  card.classList.add("top-songs");
  card.href = `https://www.vagalume.com.br${item.url}`;
  card.innerHTML = `
        <span>#${index + 1}</span>
        <h2>${item.desc}</h2>
    `;
  return card;
};

const english = async () => {
  const song = await lyric(SINGER_NAME, SONG_NAME);
  const songLyric = song.mus[0];
  document.querySelector(".music").textContent = songLyric.text;
};
const portuguese = async () => {
  const song = await lyric(SINGER_NAME, SONG_NAME);
  const songLyric = song.mus[0].translate[0].text;
  document.querySelector(".music").textContent = songLyric;
};
