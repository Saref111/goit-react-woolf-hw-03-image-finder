import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40884603-5ad171707053fe9611639638b';

export const fetchImages = ({
  searchQuery = '',
  currentPage = 1,
  pageSize = 40,
}) =>
  axios(
    `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${currentPage}&per_page=${pageSize}&key=${API_KEY}&safeSearch=true`
  );
