import axios from 'axios';

export class PixabayAPI {
  static BASIC_URL = 'https://pixabay.com/api/';
  static API_KEY = '33069877-56d6b4be23d42e6d3f03db65c';
  constructor() {
    this.page = null;
    this.q = null;
    this.per_page = 40;
  }

  fetchPhotosByQuery() {
    const searchParams = {
      params: {
        q: this.q,
        page: this.page,
        per_page: this.per_page,
        image_type: 'photo',
        orientation: 'horisontal',
        safesearch: true,
      },
    };

    return axios.get(
      `${PixabayAPI.BASIC_URL}?key=${PixabayAPI.API_KEY}`,
      searchParams
    );
  }
}
