function fetchGHRepos(searchValue) {
    fetch(`https://api.github.com/users/${searchValue}/repos`, {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      }
    })
      .then(res => res.json())
      .then(repos => {
        if (repos.length > 0) {
          for (let repo of repos) {
            console.log(repo);
            createRepoCard(repo);
          }
        } else {
          alert(`No repositories found for ${searchValue}`);
        }
      });
  }
  function fetchGHUsers(searchValue) {
    fetch(`https://api.github.com/search/users?q=${searchValue}`)
      .then(response => response.json())
      .then(data => {
        if (data.items.length > 0) {
          const user = data.items[0];
          console.log(user);
          createUserCard(user);
        } else {
          alert(`No user found with username ${searchValue}`);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('github-form');
    form.addEventListener('submit', usersubmit);
  
    function usersubmit(e) {
      e.preventDefault();
      const inputName = document.getElementById('search');
      const user = inputName.value;
  
      fetchGHUsers(user);
      inputName.value = '';
    }
  });
  
  let searchUserButton = document.getElementById('searchUsername');
  let searchUserRepoButton = document.getElementById('searchUserRepo');
  
  searchUserButton.addEventListener('click', (e) => {
    e.preventDefault();
    let searchInputValue = document.getElementById('search').value;
    fetchGHUsers(searchInputValue);
    searchInputValue = '';
  });
  
  searchUserRepoButton.addEventListener('click', (e) => {
    e.preventDefault();
    let repoSearchValue = document.getElementById('search').value;
    fetchGHRepos(repoSearchValue);
  });
  
  function createUserCard(userDetails) {
    let userCardDiv = document.createElement('div');
    let userMainDiv = document.getElementById('articles');
    userMainDiv.append(userCardDiv);
    userCardDiv.innerHTML = `
      <div class="article-wrapper">
        <div id="imgContainer">
          <img id='userImg' src="${userDetails.avatar_url}" alt="" />
        </div>
        <div class="article-body">
          <h2>${userDetails.name}</h2>
          <p>${userDetails.bio}</p>
          <div id="fDiv">
            <a class="fLinks" href="${userDetails.followers_url}">Followers: ${userDetails.followers}</a>
            <a class="fLinks" href="${userDetails.following_url}">Following: ${userDetails.following}</a>
          </div>
          <div id="repoLinkDiv">
            <a id="repoLink" href="${userDetails.html_url}">GitHub Account</a>
          </div>
        </div>
      </div>`;
  }
  
  function createRepoCard(repo) {
    let repoCardDiv = document.createElement('div');
    repoCardDiv.setAttribute('id', 'GHRepoCard');
    let repoMainDiv = document.getElementById('userRepos');
    repoMainDiv.append(repoCardDiv);
  
    repoCardDiv.innerHTML = `
      <h1 id="repoName">${repo.name}</h1>
      <p id="repoLanguage">Language: ${repo.language}</p>
      <a id="ghRepoUrl" href="${repo.html_url}">GitHub Repo</a>
      <p>Date Created ${repo.created_at}</p>`;
  }
    