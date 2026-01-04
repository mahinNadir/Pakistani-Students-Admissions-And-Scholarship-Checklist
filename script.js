const form = document.getElementById("checklistForm");
const resultSection = document.getElementById("result");

const documentsList = document.getElementById("documents");
const timelineList = document.getElementById("timeline");
const mistakesList = document.getElementById("mistakes");

let data = {};

fetch("data.json")
  .then(response => response.json())
  .then(json => {
    data = json;
  });

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const degree = document.getElementById("degree").value;
  const type = document.getElementById("type").value;
  const destination = document.getElementById("destination").value;

  const key = `${degree}_${type}_${destination}`;

  const checklist = data[key];

  if (!checklist) {
    alert("Checklist not available yet.");
    return;
  }

  renderList(documentsList, checklist.documents);
  renderList(timelineList, checklist.timeline);
  renderList(mistakesList, checklist.mistakes);

  resultSection.classList.remove("hidden");
});

function renderList(element, items) {
  element.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    element.appendChild(li);
  });
}
