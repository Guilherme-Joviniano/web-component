export default async (musicName) => {
  const r = await fetch(
    `https://api-youtube-scraper.netlify.app/.netlify/functions/api/v1/search/?term=${musicName}`
  );
  const data = await r.json();
  return data[0]
};
