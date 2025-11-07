import { useState } from "react"

function GithubSearch() {
  const [username, setUsername] = useState("")
  return (
    <div className="github-search">
        <h1> Github Profile Search </h1>
        <form className="search-bar">
          <input 
            value={username} onChange={(e) => setUsername(e.target.value)}
            type="text" placeholder="Enter Github username..."
          />
          <button type="submit" className="search-btn"> Search </button>
        </form>

    </div>
  )
}

export default GithubSearch