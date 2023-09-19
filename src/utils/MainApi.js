class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(result) {
    return result.ok ? result.json() : Promise.reject(result);
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(
      this._checkResponse
    );
  }

  signUp({ email, password, name }) {
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

  signIn({ email, password }) {
    return this._request(`/signin`, {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    });
  }

  signOut() {
    return this._request(`/signout`, {
      credentials: 'include',
      method: 'GET',
      headers: this._headers,
    });
  }

  getContent() {
    return this._request(`/users/me`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  getUserMe() {
    return this._request(`/users/me`, {
      credentials: 'include',
      headers: this._headers,
    });
  }

  patchUserMe(email, name) {
    return this._request(`/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        name: name,
      }),
    });
  }

  getMovies() {
    return this._request(`/movies`, {
      credentials: 'include',
      headers: this._headers,
    });
  }

  getAppInfo() {
    return Promise.all([this.getUserMe(), this.getMovies()]);
  }

  postMovies({
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
    nameEN,
  }) {
    return this._request(`/movies`, {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
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
        nameEN,
      }),
    });
  }

  deleteMovies(id) {
    return this._request(`/movies/${id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    });
  }
}

const mainApi = new MainApi({
  // baseUrl: 'http://localhost:3000',
  baseUrl: 'https://api.arturkhelshtein.nomoredomainsicu.ru',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
