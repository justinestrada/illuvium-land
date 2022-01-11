export const getOpenSea = (collection_slug = 'illuvium') => {
  let fetch_url = `https://api.opensea.io/api/v1/collection/${collection_slug}/stats`
  return fetch(fetch_url).then(response => response.json()).catch((err) => {
    console.error(err)
    return null
  })
}
