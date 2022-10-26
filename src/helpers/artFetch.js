export default async (name) => {
    const response = await fetch(`https://www.vagalume.com.br/${name}/index.js`);
    const json = await response.json();
    return json;
}