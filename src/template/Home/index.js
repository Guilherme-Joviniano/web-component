import "../../components/ArtistCard/index.js";
import "../../components/artistDetail/index.js";

import popularArtists from "../../helpers/fetchPopularArtists.js";
import artFetch from "../../helpers/artFetch.js";
import removeAllChilds from "../../helpers/removeAllChilds.js";
import globalConfigs from "../../config/global.js";
import getRandomItem from "../../helpers/getRandomItem.js";

const { BASE_URL } = globalConfigs;
const CARDS_CONTAINER = document.querySelector(".ranking-cards");
const SEARCH_INPUT = document.querySelector(".search-input");
const COLORS = ["#663399", "#9370DB"];

const generatePopularArtistRanking = async () => {
  const data = await popularArtists();
  let cards = [];
  data.forEach(({ name, url, pic_medium, views }) => {
    const artistCard = document.createElement("artist-card");

    artistCard.setAttribute("nome", name);
    artistCard.setAttribute("bg-image-url", pic_medium);
    artistCard.setAttribute("views", views);
    artistCard.setAttribute("artist-url", url);

    artistCard.classList.add("card__artist");

    cards.push(artistCard);
  });

  return cards;
};

const generateArtistDetail = async (value) => {
  const { artist } = await artFetch(value);
  const { desc, pic_medium, toplyrics, lyrics, rank } = artist;

  const artistDetail = document.createElement("artist-detail");
  artistDetail.setAttribute("name", desc);
  artistDetail.setAttribute("art-image", BASE_URL + pic_medium);
  artistDetail.setAttribute("views", rank.views);

  artistDetail.data = [toplyrics, lyrics];
  artistDetail.classList.add("artist__detail");

  return artistDetail;
};

SEARCH_INPUT.addEventListener("keypress", async ({ target, key }) => {
  if (key === "Enter") {
    const { value } = target;

    const detail = await generateArtistDetail(value);

    const section = document.querySelector('#hero') 
    
    if(section.children.length > 1) section.removeChild(section.children[1]);

    section.appendChild(detail);

    document
      .querySelector("artist-detail")
      .scrollIntoView({ behavior: "smooth", block: "center" });

    localStorage.setItem("singer", value.replaceAll(` `, `-`).toLowerCase());
  }
});

const card = await generatePopularArtistRanking();
CARDS_CONTAINER.append(...card);
