import { useState } from "react"
import axios from "axios"

function GithubSearch() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setProfile(response.data);
      error(null)
    }
    catch (error) {
      setProfile(null);
      setError('User not found...')
    }
  }

  return (
    <div className="github-search">
      <h1> Github Profile Search </h1>
      <form onSubmit={handleSubmit}
        className="search-bar">
        <input
          value={username} onChange={(e) => setUsername(e.target.value)}
          type="text" placeholder="Enter Github username..."
        />
        <button type="submit" className="search-btn"> Search </button>
      </form>

      {
        error ? <h3 className="user-error">User not found... </h3> :
          profile && (
            <div className="profile-card">
              <img src={profile.avatar_url} alt={profile.login} />
              <h2>{profile.name}</h2>
              <p>{profile.bio}</p>
              <p>Followers: {profile.followers} | Following: {profile.following}</p>  
              <a href={profile.html_url} target="_blank" rel="noreferrer"> View Profile on GitHub </a>
            </div>
          )
      }


    </div>
  )
}

export default GithubSearch;