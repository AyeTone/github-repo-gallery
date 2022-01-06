// Profile info
const overview = document.querySelector(".overview")
const username = "ayetone"
const repoList = document.querySelector(".repo-list")
const reposClass = document.querySelector(".repos")
const repoData = document.querySelector(".repo-data")
const backToGallery = document.querySelector(".view-repos")
const filterInput = document.querySelector(".filter-repos")

const profileInfo = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`)
    const data = await response.json()
    //console.log(data)
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
    //console.log (repoData)
    displayRepos (repoData)
}

const displayRepos = function (repos) {
    filterInput.classList.remove("hide")
    for (const repo of repos) {
        const repoItem = document.createElement("li")
        repoItem.classList.add("repo")
        repoItem.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(repoItem)
    }
}

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")){
        const repoName = e.target.innerText
        repoInformation(repoName)
    }
})

const repoInformation = async function (repoName) {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`)
    const repoInfo = await response.json()
    // console.log (repoInfo)
    const fetchLanguages = await fetch(repoInfo.languages_url)
    const languageData = await fetchLanguages.json()
    // console.log(languageData)
    const languages = []
    for (const language in languageData) {
        languages.push(language)
    }
    // console.log(languages)
    displayRepoInfo (repoInfo, languages)
}

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = ""
    repoData.classList.remove("hide")
    reposClass.classList.add("hide")
    backToGallery.classList.remove("hide")
    const div = document.createElement("div")
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a> `
    repoData.append(div)
}

backToGallery.addEventListener("click", function () {
    repoData.classList.add("hide")
    reposClass.classList.remove("hide")
    returntoGallery.classList.add("hide")
})

filterInput.addEventListener("input", function (e){
    const searchText = e.target.value
    //console.log(searchText)
    const repos = document.querySelectorAll(".repo")
    const searchTextCase = searchText.toLowerCase()
    for (const repo of repos) {
        const reposTextCase = repo.innerText.toLowerCase()
        if (reposTextCase.includes(searchTextCase)) {
            repo.classList.remove("hide")
        } else {
            repo.classList.add("hide")
        }
    }
})