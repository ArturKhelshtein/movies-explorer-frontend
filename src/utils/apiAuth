class ApiAuth {
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

  register({ email, password }) {
    return this._request(`/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    });
  }

  authorize({ email, password }) {
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

  logout() {
    return this._request(`/signout`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    });
  }

  getContent() {
    return this._request(`/users/me`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
  }
}

const apiAuth = new ApiAuth({
  baseUrl: 'https://api.arturkhelshtein.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiAuth;
