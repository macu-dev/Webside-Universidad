const course_list = document.querySelector('#list-courses');
course_list.addEventListener('click', BuyCourses);
let courses;
let section = document.querySelector("#courses");

const ul = document.querySelector('.container-original ul');

const eVaciarCarrito = document.querySelector('#vaciarCarrito');
eVaciarCarrito.addEventListener('click', vaciarCarrito);

//formulario

const input = document.querySelector('input.form-control');
const btnBuscar = document.querySelector('#button-addon1');
btnBuscar.addEventListener('click', buscarCursos);


async function main (){
  courses = await getCourses();
  let template = drawCourses(courses);
  activeCloseMenuOnOutsideClick();
  section.innerHTML=template;
}



//cuando la pagina este cargada, ejecute la funcion main
window.onload = main;