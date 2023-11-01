const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/;
const regexUrl = /^https?:\/\/[www.]?[-a-zA-Z0-9+&@/?=~_!:,.;()*'$\][]+\.[-a-zA-Z0-9+&@/?=~_!:,.;()*'$\][]+#?/;
const regexInt16 = /[a-f0-9]*/;

module.exports = { regexEmail, regexUrl, regexInt16 };
