function displayRepositories(event, data) {
  let repos = JSON.parse(this.responseText);
  const repoDiv = document.getElementById("repositories");
  const repoList = `<ul>${repos
    .map(
      r =>
        `<li><strong><a href=
         "${r.html_url}" target="_blank">
        ${r.name}</a></strong> - <a href="#" data-repository="${
          r.name
        }" data-username="${r.owner.login}" onclick="getCommits(this)">Get Commits</a> -
        <a href="#" data-repository="${
          r.name
        }" data-username="${r.owner.login}" onclick="getBranches(this)">Get Branches</a>
        </li>`
    )
    .join("")}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}
function getRepositories() {
  // event.preventDefault()
  let username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}
function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        `<li><strong>${commit.author.login}</strong>, ${
          commit.commit.author.name
        } - ${commit.commit.message}</li>`
    )
    .join("")}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}
function getCommits(el) {
  const username = el.dataset.username;
  const repository = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/commits`);
  req.send();
}
function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(
    branch => `<li>${branch.name}</li>`
  ).join("")}</ul>`
  document.getElementById("details").innerHTML = branchesList;
}
function getBranches(el) {
  const username = el.dataset.username;
  const repository = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/branches`);
  req.send();
}
