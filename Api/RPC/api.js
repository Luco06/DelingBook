//UserCall Api
export const userLogin = (payload) => {
  return fetch("http://192.168.0.20:3000/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      "Access-Control-Request-Headers": "*",
      api_key: "64790224e0c5a553ae57f1d3",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Vérifier vos identifiants");
      }
      return res.json();
    })
    .catch((error) => {
      console.error("error");
      throw error;
    });
};

export const logoutUser = (token) => {
  return new Promise((resolve, reject) => {
    fetch("http://192.168.0.20:3000/logout", {
      method: "POST",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Vérifier vos identifiants");
        }
        console.log("Déco réussie");
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const createUser = (payload) => {
  return fetch("http://192.168.0.20:3000/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      api_key: "64790224e0c5a553ae57f1d3",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Vérifier vos les informations saisie");
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la requête :", error);
      throw error;
    });
};
