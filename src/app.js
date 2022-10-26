'use strict'

import {
    lyric,
    singer
} from "./helpers/fetch.js"

const lyricMain = async () => {
    const container = document.querySelector('.lyrics')

    const song = await lyric('skank', 'vamos fugir')
    const songArt = song.art
    const songLyric = song.mus[0]

    container.innerHTML = `
        <span class="title-container">
            <h1 class="song-name">${songLyric.name}</h1>
            <h2 class="artist">${songArt.name}</h2>
        </span>
        <p class="music">${songLyric.text}</p>
        <a href="${songArt.url}" target="_blank">
            <button class="about">Mais sobre ${songArt.name}</button>
        </a> 
    `

    if (songLyric.translate) {
        document.querySelector('.options').style.justifyContent = 'space-evenly'
        translate()
    } else
        document.querySelector('.options').style.justifyContent = 'center'

    ranking(songArt.name)
}

lyricMain()

const translate = () => {
    const translateContainer = document.querySelector('.translate')
    translateContainer.innerHTML = `
        <h2 class="option-title">Traduzir Letra</h2>
        <div class="input-container">
            <input type="radio" name="translate" id="english" class="hidden">
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
    `
    document.getElementById('english').addEventListener('change', english)
    document.getElementById('portuguese').addEventListener('change', portuguese)
}
const ranking = async (art) => {
    const name = art.toLowerCase()
    const artist = await singer(name)
    const fixedArtist = artist.splice(0, 5)

    const cards = fixedArtist.map(topLyrics)

    const container = document.querySelector('.top-musics-list')
    container.replaceChildren(...cards)
}

const topLyrics = (item, index) => {
    const card = document.createElement('a')
    card.classList.add('top-songs')
    card.href = `https://www.vagalume.com.br${item.url}`
    card.innerHTML = `
        <span>#${(index + 1)}</span>
        <h2>${item.desc}</h2>
    `
    return card
}

const english = async () => {
    const song = await lyric('madonna', 'holliday')
    const songLyric = song.mus[0]
    document.querySelector('.music').textContent = songLyric.text
}
const portuguese = async () => {
    const song = await lyric('madonna', 'holliday')
    const songLyric = song.mus[0].translate[0].text

    document.querySelector('.music').textContent = songLyric
}