const students = [];
const tableBody = document.querySelector("#studentsTable tbody");
const averageDiv = document.getElementById("average");
const form = document.getElementById("studentForm");
const editingIndexInput = document.getElementById("editingIndex");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const grade = parseFloat(document.getElementById("grade").value);
  const date = document.getElementById("date").value;

  const student = { name, lastName, grade, date };
  const editingIndex = editingIndexInput.value;

  if (editingIndex === "") {
    students.push(student);
    addStudentToTable(student);
  } else {
    students[editingIndex] = student;
    updateStudentRow(editingIndex, student);
    editingIndexInput.value = "";
    form.querySelector("button[type=submit]").textContent = "Agregar";
  }

  calcularPromedio();
  form.reset();
});

function addStudentToTable(student) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td>${student.date}</td>
    <td>
      <button class="delete-btn">Eliminar</button>
      <button class="edit-btn">Editar</button>
    </td>
  `;

  const index = students.length - 1;

  row.querySelector(".delete-btn").addEventListener("click", function () {
    borrarEstudiante(index, row);
  });

  row.querySelector(".edit-btn").addEventListener("click", function () {
    editarEstudiante(index);
  });

  tableBody.appendChild(row);
}

function updateStudentRow(index, student) {
  const row = tableBody.rows[index];
  row.cells[0].textContent = student.name;
  row.cells[1].textContent = student.lastName;
  row.cells[2].textContent = student.grade;
  row.cells[3].textContent = student.date;
}

function borrarEstudiante(index, row) {
  students.splice(index, 1);
  row.remove();
  refreshTable();
  calcularPromedio();
}

function editarEstudiante(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("lastName").value = student.lastName;
  document.getElementById("grade").value = student.grade;
  document.getElementById("date").value = student.date;

  editingIndexInput.value = index;
  form.querySelector("button[type=submit]").textContent = "Guardar Cambios";
}

function calcularPromedio() {
  if (students.length === 0) {
    averageDiv.textContent = "Promedio General del Curso : N/A";
    return;
  }
  const total = students.reduce((sum, student) => sum + student.grade, 0);
  const prom = total / students.length;
  averageDiv.textContent = "Promedio General del Curso : " + prom.toFixed(2);
}

function refreshTable() {
  tableBody.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.lastName}</td>
      <td>${student.grade}</td>
      <td>${student.date}</td>
      <td>
        <button class="delete-btn">Eliminar</button>
        <button class="edit-btn">Editar</button>
      </td>
    `;

    row.querySelector(".delete-btn").addEventListener("click", function () {
      borrarEstudiante(index, row);
    });

    row.querySelector(".edit-btn").addEventListener("click", function () {
      editarEstudiante(index);
    });

    tableBody.appendChild(row);
  });
}
