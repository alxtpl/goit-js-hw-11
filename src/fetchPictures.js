export default async function fetchPictures(name) {
    const baseUrl = `https://pixabay.com/api/?key=25290317-a78b6ca683460bb34341152ac&q=${name}&image_type=photo`;
    const responce = await fetch(baseUrl);
    if (responce.ok) {
        return responce.json();
    }
    throw new Error(responce.status);
}