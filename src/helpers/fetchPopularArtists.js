const popularArtists = async () => {
    const url = `https://api.vagalume.com.br/rank.php?apikey=0f7de1d897e2f5bf25d34afd2e9474fe&type=art&period=week&scope=nacional,internacional&limit=2`

    const response = await fetch(url)

    const json = await response.json()

    const {
        art
    } = json

    const {
        week
    } = art

    const {
        nacional,
        internacional
    } = week

    const popularArtists = nacional.concat(internacional)

    return popularArtists
}

export default popularArtists;