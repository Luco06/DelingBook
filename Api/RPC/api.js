//UserCall Api
export const userLogin = (payload) => {
  return fetch("http://192.168.1.23:3000/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      "Access-Control-Request-Headers": "*",
      // api_key: "64790224e0c5a553ae57f1d3",
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
    fetch("http://192.168.1.23:3000/logout", {
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
  return fetch("http://192.168.1.23:3000/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      // api_key: "64790224e0c5a553ae57f1d3",
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
export const updateUser = (payload, token) => {
  // if (payload.avatar) {
  //   payload.append("avatar", payload.avatar, "avatar.jpg");
  // }

  // const userUpdate = {
  //   pseudo: payload.pseudo || "",
  //   email: payload.email || "",
  //   telephone: payload.telephone || "",
  //   mdp: payload.mdp || "",
  // };

  // console.log("Payload", payload);
  // payload.append("userUpdate", JSON.stringify(userUpdate));
  // console.log("userUpdate", userUpdate);
  console.log("Avatar", payload);
  return fetch("http://192.168.1.23:3000/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: token,
    },
    body: payload,
  })
    .then((res) => {
      console.log(res);
      if (!res.ok) {
        throw new Error("Vérifier vos les informations saisies");
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la requête :", error);
      throw error;
    });
};

export const getMyInfo = (token) => {
  return fetch("http://192.168.1.23:3000/users/me", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error");
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la requête :", error);
      throw error;
    });
};
export const searchUser = (payload, token) => {
  return fetch("http://192.168.1.23:3000/users/searchuser", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Recherche impossible !");
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la requête :", error);
      throw error;
    });
};

export const addUser = (payload, token) => {
  return fetch("http://192.168.1.23:3000/users/addfriend", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Ajout impossible");
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la requête :", error);
      throw error;
    });
};
//BookApiCall
export const addBook = (userId, payload, token) => {
  return fetch(`http://192.168.1.23:3000/addBook/${userId}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(" Vous n'avez pas pu ajouter ce livre");
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la requête :", error);
      throw error;
    });
};

export const getBookInMyLibrary = (userId, tag, token) => {
  return fetch(`http://192.168.1.23:3000/booksByTag/${userId}/${tag}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          " Une erreur s'est produite lors de la récupération des livres par tag"
        );
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la requête :", error);
      throw error;
    });
};

export const deleteBookInMyLbrary = (userId, bookId, token) => {
  return fetch(`http://192.168.1.23:3000/deleteBook/${userId}/${bookId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          " Une erreur s'est produite lors de la suppression du livre"
        );
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la requête :", error);
      throw error;
    });
};
