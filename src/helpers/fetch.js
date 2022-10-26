const lyric = async (art, mus) => {
    const url = `https://api.vagalume.com.br/search.php?apikey=0f7de1d897e2f5bf25d34afd2e9474fe&art=${art}&mus=${mus}`
    const response = await fetch(url)

    const lyrics = await response.json()
    return lyrics
}
const singer = async (art) => {
    const url = `https://www.vagalume.com.br/${art}/index.js`
    const response = await fetch(url)

    const singer = await response.json()
    return singer.artist.toplyrics.item
}
export {
    lyric,
    singer
}