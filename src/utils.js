const localStorageKey = "fifa-api-user";

function login(email, password) {
  const config = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password })
  };

  return new Promise((resolve, reject) => {
    window
      .fetch(`${process.env.REACT_APP_API_URL}/login`, config)
      .then(response => {
        if (response.ok) {
          response
            .json()
            .then(json => {
              localStorage.setItem(localStorageKey, json.Token);
              return resolve(json);
            })
            .catch(() => {
              return reject({ message: "Error reading response" });
            });
        } else {
          localStorage.removeItem(localStorageKey);
          return reject({ message: "Unauthorized" });
        }
      });
  });
}

function loadUser() {
  return new Promise(resolve => {
    const token = localStorage.getItem(localStorageKey);
    return resolve(token && token.length > 0);
  });
}

function logout() {
  return new Promise(resolve => {
    localStorage.removeItem(localStorageKey);
    return resolve();
  });
}

export { login, logout, loadUser };
