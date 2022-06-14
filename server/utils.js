// check if jwt exist and remove 'bearer'
async function modifyJwt (accessToken, _req, res, _next) {
  if (!accessToken) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }
  accessToken = accessToken.replace('Bearer ', '');
  if (accessToken === 'null') {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }
  return accessToken;
}

module.exports = {
  modifyJwt
};
