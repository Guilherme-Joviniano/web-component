import '../../components/ArtistCard/index.js'
import '../../components/artistDetail/index.js'

import popularArtists from '../../helpers/fetchPopularArtists.js'

const CARDS_CONTAINER = document.querySelector('.ranking-cards');
const SEARCH_INPUT = document.querySelector('.search-input')

const generateArtistDetail = async (value) => {
    const response = await artFetch(value);

}
const generatePopularArtistRanking = async () => {
    const data = await popularArtists();

    data.forEach(({
        name,
        url,
        pic_medium,
        views,
    }) => {
        const artistCard = document.createElement('artist-card');

        artistCard.setAttribute('nome', name);
        artistCard.setAttribute('bg-image-url', pic_medium);
        artistCard.setAttribute('views', views);
        artistCard.setAttribute('artist-url', url);

        artistCard.classList.add('card__artist');

        CARDS_CONTAINER.appendChild(artistCard)
    });

}


// await generatePopularArtistRanking();
const art = document.createElement('artist-detail')
art.setAttribute('name', 'Matue');
art.setAttribute('art-image', 'https://s2.glbimg.com/edM1HJtDGbHdDXZvhIJfUGiyWrA=/0x0:1080x1350/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/9/G/qfvEJ5Qdiq18A4BKQGJQ/matue4.jpg');
art.setAttribute('views', '2.000.500');
art.setAttribute('topSongs', `{"topsongs":"['Maquina do Tempo', '777-666']"}`);
art.setAttribute('all-songs', ['Maquina do Tempo', '777-666']);
art.setAttribute('genres', ['R&B', 'Rap', 'Hip-Hop']);

document.querySelector('main').append(art)



SEARCH_INPUT.addEventListener('keypress', ({
    target,
    key
}) => {
    if (key === 'Enter') {
        const {
            value
        } = target;
        console.log(value);
    }
})