
//espera que la promesa se cumpla
async function getCourses () {
  let response = await fetch('api/cursos.json'); //nos permite obtener informacion(nos devuelve un objeto"promesa")
  //await =>espera a que la promesa se cumpla
  let data = await response.json();
  return data;
}

//devuelve el html de las tarjetas de cursos
function drawCard({ nombre, profesor, img, precio }){
  return `
  <div class="col mb-4 col-sm-6 col-10">
    <div class="card shadow rounded">
      <img src="${img}" class="card-img-top" alt="desarrollo web">
      <div class="card-body">
        <h5 class="card-title text-center mb-0">${nombre}</h5>
        <span class="card-text d-inline-block mt-0 mb-0 text-muted">${profesor}</span> <br/>
        <img src="img/estrellas.png" alt="estrellas"> <br/>
        <span class="old-price d-inline-block mb-0">$200</span> <br>
        <span class="new-price d-block ml-auto w-25 mt-0 font-weight-bolder mb-0">${precio}</span>
        <button type="button" class="btn btn-gradient d-inline-block w-100" id="boton">Agregar al carrito</button>
      </div>
    </div>
  </div>
  `;
}

//dibuja las tarjetas de los cursos
function drawCourses(courses){
   let template ='<h1 class="text-center mb-4">Cursos en Línea</h1>';

   for (let i=0; i<courses.length/4; i++){
     template+= `<div class="row row-cols-1 row-cols-lg-4 d-flex justify-content-center">`;
    
    for(let j=0; 4*i+j< courses.length && j< 4; j++){
      template+= drawCard(courses[4*i+j]);
    }
    template+=`</div>`;
   }

   return template;
}


//borrar los cursos del carrito

function borrarCurso(e){
  const li = e.target.parentNode.parentNode;
  li.parentNode.removeChild(li);
  
}

//vaciar todos los cursos del carrito

function vaciarCarrito(e){
  const listaCursos = e.target.previousElementSibling;
  
  while(listaCursos.firstChild){
    listaCursos.removeChild(listaCursos.firstChild);
  }
}

//agregra los cursos al carrito
function BuyCourses(e){
  e.preventDefault();
  if(e.target.classList.contains('btn')){
    const course = e.target.parentElement.parentElement;
    readDataCourses(course);
  }
}

//lee la informacion de los cursos seleccionados
function readDataCourses(dataCourse){
  const data_course = {
    imagen: dataCourse.querySelector('img').src,
    titulo: dataCourse.querySelector('.card-body h5').textContent,
    profesor: dataCourse.querySelector('span.card-text').textContent,
    precio : dataCourse.querySelector('.new-price').textContent
  }
  insertCourse(data_course);
}

//muestra los cursos seleccionados en el carrito
function insertCourse({imagen, titulo, profesor,  precio}){
  const li = document.createElement('li');
  
  li.innerHTML = `
  <div class="col-4 p-0 d-flex align-items-start justify-content-center">
  <img src="${imagen}" alt="curso" width="70" height="50" >  
  </div>
  <div class="col-6 p-0 item">
  <span class="text-capitalize"> ${titulo} </span><br/>
  <span class="text-muted text-capitalize">${profesor}</span><br/>
  <img src="img/estrellas.png" alt="estrellas"> <br/>
  <span class="new-price w-25 mt-0 font-weight-bolder mb-0">${precio} </span>
  </div>
  
  <div class="col-2 p-0 d-flex justify-content-center align-items-start">
  <a href="#" class="btn btn-danger btn-sm btn-borrar" onclick="borrarCurso(event)" id="btn-borrar">X</a>
  </div>
  `;
  
  li.classList.add('row', 'lista');
  
  ul.appendChild(li);
  
}


//esconder el menu cuando se da click en el body
function activeCloseMenuOnOutsideClick() {
  $(document).click(function (event) {
    var clickover = $(event.target);
    var _opened = $(".navbar-collapse").hasClass("navbar-collapse collapse show");
    if (_opened === true && !clickover.hasClass("navbar-toggle")) {
      $("button.navbar-toggler").click();
    }
  });
};

//formulario 

function buscarCursos(e){
  e.preventDefault();
  let busqueda = input.value.toUpperCase();
  let resultado = [];

  if(busqueda !== ''){
    courses.forEach(curso => {
      let pos = curso.nombre.toUpperCase().search(busqueda);
      if(pos > -1 ){
        resultado.push(curso);
      }
    });   
  }
  

  section.innerHTML= resultado.length > 0 
    ? drawCourses(resultado)
    : '<h1 class="text-center emoji-error">(>_<)</h1><p class="text-center text-muted mensaje-error">No existen resultados con el nombre de tu busqueda</p>';
      
  // window.scrollTo(section.offsetTop)


  // let html = resultado.map(drawCard).join("");

  
}
