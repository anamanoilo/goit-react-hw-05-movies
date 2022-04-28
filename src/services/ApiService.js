import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

class ApiService {
  #API_KEY = '53d591c4c7c46fce2d77997efee7f254';
  page = 1;
  movieId = 0;
  searchQuery = '';

  async fetchTrendingMovies() {
    const response = await axios.get(
      `/trending/movies/day?api_key=${this.#API_KEY}&page=${this.page}`
    );
    return response.data;
  }

  async fetchMovieDetails() {
    const response = await axios.get(
      `/movie/${this.movieId}?api_key=${this.#API_KEY}`
    );
    return response.data;
  }

  async fetchMovieCast() {
    const response = await axios.get(
      `/movie/${this.movieId}/credits?api_key=${this.#API_KEY}`
    );
    return response.data;
  }
  async fetchMovieReviews() {
    const response = await axios.get(
      `/movie/${this.movieId}/reviews?api_key=${this.#API_KEY}`
    );
    return response.data;
  }

  async fetchMovieByKeyword() {
    const response = await axios.get(
      `/search/movie/?api_key=${this.#API_KEY}&query=${this.searchQuery}&page=${
        this.page
      }&include_adult=false`
    );
    return response.data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
const api = new ApiService();

export default api;
