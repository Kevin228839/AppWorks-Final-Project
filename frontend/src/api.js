const api = {
  hostname: 'localhost:8000',
  signup (name, email, password) {
    return fetch(`http://${this.hostname}/api/v1/signup`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  },
  signin (email, password) {
    return fetch(`http://${this.hostname}/api/v1/signin`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }
};

export default api;
