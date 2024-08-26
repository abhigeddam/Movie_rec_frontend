const login = async (name, password) => {
  const response = await fetch("http://127.0.0.1:8000/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: name,
      password: password,
    }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data;
};
const createAccount = async (name, password, email) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        password: password,
        email: email,
      }),
    });

    if (!response.ok) {
      throw new Error("Account creation failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};

const fetchMovieData = async (movieName) => {
  const token = sessionStorage.getItem("authToken");

  if (!token) {
    throw new Error("No authentication token found. Please login first.");
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ movie: movieName }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movie data");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
};

const moviedata = async (movie) => {};
export { login, createAccount, fetchMovieData };
