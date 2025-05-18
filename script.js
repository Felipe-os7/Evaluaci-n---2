const students=[]
const tableBody=document.querySelector("#studentsTable tbody");
const averageDiv=document.getElementById("average");
document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const grade = parseFloat(document.getElementById("grade").value);
  const date = document.getElementById("date").value;

  if (!name) {
    alert("Por favor, ingresa el nombre del estudiante.");
    return;
  }
  if (!lastName) {
    alert("Por favor, ingresa el apellido del estudiante.");
    return;
  }
  if (isNaN(grade)) {
    alert("Por favor, ingresa una nota válida.");
    return;
  }
  if (grade < 1 || grade > 7) {
    alert("La nota debe estar entre 1 y 7.");
    return;
  }
  if (!date) {
    alert("Por favor, ingresa la fecha.");
    return;
  }
 const student={name,lastName,grade,date};

 students.push(student);
 //console.log(students)
addStudentToTable(student)
calcularPromedio();
 this.reset()

});
function addStudentToTable(student){
    const row= document.createElement("tr");
    row.innerHTML=`
    <td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td>${student.date}</td>
    `;
 tableBody.appendChild(row);
}
       function calcularPromedio(){
           if(students.length===0){
             averageDiv.textContent="Promedio General del Curso : N/A"
             return
           }
            const total=students.reduce((sum,student)=>sum+student.grade,0);
           const prom=total/students.length;
           averageDiv.textContent="Promedio General del Curso : "+prom.toFixed(2);
       }
