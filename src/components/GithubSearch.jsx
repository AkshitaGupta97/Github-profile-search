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
      setError(null)
    }
    catch (error) {
      setProfile(null);
      setError('User not found...')
    }
  }
  return (
    <div className="github-search">
      <p className="header"> Github Profile Search </p>
      <form onSubmit={handleSubmit}
        className="search-bar">
        <input
          value={username} onChange={(e) => setUsername(e.target.value)}
          type="text" placeholder="Enter Github username..."
        />
        <button type="submit" className="search-btn"> Search </button>
      </form>

      {
        error && <h3 className="user-error">User not found... </h3>   
      }
      {
        profile && (
          <div className="profile-card">
            <img className="profile-avatar" src={profile.avatar_url} alt="Avatar" />
            <h2 className="profile-username">{profile.name}</h2>
            <p className="profile-bio">{profile.bio}</p>
            <p className="profile-date">Joined: {new Date(profile.created_at).toLocaleDateString()}</p>
            <p className="profile-followers">Followers: <span>{profile.followers}</span></p>
            <p className="profile-following">Following: <span>{profile.following}</span></p>
            <a className="profile-link" href={profile.html_url} target="_blank" rel="noopener noreferrer"> View Profile on GitHub </a>
          </div>
        )
      }


    </div>
  )
}

export default GithubSearch;