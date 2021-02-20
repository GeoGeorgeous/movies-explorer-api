const urlRegExp = /^(https?:\/\/)?(w{3,}.)?([a-z0-9-]+\.)+([a-z]{2,})\/?([a-z0-9-._~:/?#[\]@!$&'()*+,;=]){0,}/i;

// Проверка https://                            : ^(https?:\/\/)?
// Проверка www.                                : (w{3,}.)?
// Проверка субдоменов, включая домен 1 уровня  : ([a-z0-9\-]+\.)+
// Проверка доменный зоны                       : ([a-z]{2,})\/?
// Проверка пути                                : ([a-z0-9-._~:\/?#\[\]@!$&'()*+,;=]){0,}

module.exports = urlRegExp;
