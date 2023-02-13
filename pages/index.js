import React, { useState, useEffect } from "react";

const Home = () => {
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const data = await response.json();
      setRepositories(data);
    }

    if (username) {
      fetchData();
    }
  }, [username]);

  return (
    <div className="app">
      <div className="headlineContainer">
        <p>
          Find GitHub Repositories. Write the account username and Fetch Data.
          GitHub API
        </p>
      </div>

      <form
        className="formContainer"
        onSubmit={(e) => {
          e.preventDefault();
          setUsername(e.target.elements.username.value);
        }}
      >
        <input type="text" name="username" />
        <button type="submit">Search</button>
      </form>
      <div className="repositoriesList">
        <p>The repositories found in: {username} GitHub Account</p>
        <ul>
          {repositories.map((repo) => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
