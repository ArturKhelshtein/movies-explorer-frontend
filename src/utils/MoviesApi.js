class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(result) {
    return result.ok
      ? result.json()
      : Promise.reject(`Ошибка: ${result.status}`);
  }

  async _request(endpoint, options) {
    const result = await fetch(`${this._baseUrl}${endpoint}`, options);
    return this._checkResponse(result);
  }

  search() {
    return this._request('', {
      method: 'GET',
      headers: this._headers,
    })
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;
