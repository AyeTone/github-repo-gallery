// Profile info
const overview = document.querySelector(".overview")
const username = "ayetone"
const repoList = document.querySelector(".repo-list")

const profileInfo = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`)
    const data = await response.json()
    console.log(data)
    displayInfo (data)
}

profileInfo ()


const displayInfo = function (data) {
    const div = document.createElement("div")
    div.classList.add ("user-info")
    div.innerHTML = `
    <figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(div)
    repos ()
}

const repos = async function () {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
    const repoData = await response.json ()
    console.log (repoData)
    displayRepos (repoData)
}

const displayRepos = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li")
        repoItem.classList.add("repo")
        repoItem.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(repoItem)
    }
}