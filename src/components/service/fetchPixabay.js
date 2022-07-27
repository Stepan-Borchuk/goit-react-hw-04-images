import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27725160-470a636dc677cf333fa2ad496';

async function FetchPictures( searchQuery, page ) {
    const url = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12 `;
    const response = await axios.get( url );
    return response.data;
}

export default FetchPictures;
