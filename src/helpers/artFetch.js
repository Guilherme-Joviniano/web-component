export default async (name) => {
    const artName = name.replaceAll(` `, `-`).toLowerCase()
    console.log(artName);
    const response = await fetch(`https://www.vagalume.com.br/${artName}/index.js`);
    const json = await response.json();
    return json;
}