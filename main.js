let projects = JSON.parse(localStorage.getItem('projects')) || [
  { id: 1, name: "Project A", description: "Description of Project A" },
  { id: 2, name: "Project B", description: "Description of Project B" },
  { id: 3, name: "Project C", description: "Description of Project C" }
];

function renderProjectList() {
  const projectList = document.getElementById('project-list');
  projectList.innerHTML = '';
  projects.forEach(project => {
      const projectElement = document.createElement('div');
      projectElement.className = 'project';
      projectElement.innerHTML = `
          <span>${project.name}</span>
          <div>
              <button onclick="viewProject(${project.id})">View</button>
              <button onclick="deleteProject(${project.id})">Delete</button>
          </div>
      `;
      projectList.appendChild(projectElement);
  });
}

function viewProject(id) {
  const project = projects.find(proj => proj.id === id);
  const projectDetails = document.getElementById('project-details');
  if (project) {
      projectDetails.innerHTML = `
          <h2>${project.name}</h2>
          <p>${project.description}</p>
      `;
  } else {
      projectDetails.innerHTML = `<p>Project not found.</p>`;
  }
}

function viewAllProjects() {
  renderProjectList();
  document.getElementById('project-details').innerHTML = '';
}

function deleteProject(id) {
  const projectIndex = projects.findIndex(proj => proj.id === id);
  if (projectIndex > -1) {
      projects.splice(projectIndex, 1);
      localStorage.setItem('projects', JSON.stringify(projects));
      renderProjectList();
  }
}

function addProject() {
  document.getElementById('add-project-form').style.display = 'block';
}

function submitProject() {
  const name = document.getElementById('project-name').value;
  const description = document.getElementById('project-description').value;
  const id = Math.max(...projects.map(p => p.id), 0) + 1;
  projects.push({ id, name, description });
  localStorage.setItem('projects', JSON.stringify(projects));
  renderProjectList();
  document.getElementById('add-project-form').style.display = 'none';
}
function closeProject() {
  document.getElementById('project-details').innerHTML = '';
}
renderProjectList();