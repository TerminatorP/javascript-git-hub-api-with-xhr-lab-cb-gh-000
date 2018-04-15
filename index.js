function handleResponse(event, data) {
  let repos = JSON.parse(this.responseText);
  const repoDiv = document.getElementById("repositories");
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li><strong><a href="' +
        r.html_url +
        '" target="_blank">' +
        r.name +
        '</a></strong> - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join("")}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}
function getRepositories() {
  event.preventDefault();
  let username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", handleResponse);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}
function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        `<li><strong>${commit.author.login}</strong> - ${commit.commit.message}</li>`
    )
    .join("")}</ul>`;
  // document.getElementById("details").innerHTML = commitsList;
  console.log(commits);
}
function getCommits(el) {
  let username = document.getElementById("username").value;
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`);
  req.send();
}
