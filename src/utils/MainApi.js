class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(result) {
    return result.ok
      ? result.json()
      : Promise.reject(`Ошибка: ${result.status}`);
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(
      this._checkResponse
    );
  }

  signup({ email, password, name }) {
    return this._request(`/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
        name,
      }),
    });
  }

  signin({ email, password }) {
    return this._request(`/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    });
  }

  signout() {
    return this._request(`/signout`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    });
  }

  getUserMe() {
    return this._request(`/users/me`, {
      headers: this._headers,
      credentials: 'include',
    });
  }

  patchUserMe(email, name) {
    return this._request(`/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        name: name,
      }),
    });
  }

  getMovies() {
    return this._request(`/movies`, {
      headers: this._headers,
      credentials: 'include',
    });
  }

  postMovies(
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN
  ) {
    return this._request(`/movies`, {
      headers: this._headers,
      credentials: 'include',
      country: country,
      director: director,
      duration: duration,
      year: year,
      description: description,
      image: image,
      trailerLink: trailerLink,
      thumbnail: thumbnail,
      movieId: movieId,
      nameRU: nameRU,
      nameEN: nameEN,
    });
  }

  deleteMovies(id) {
    return this._request(`/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    });
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.arturkhelshtein.nomoredomainsicu.ru',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
