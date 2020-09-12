
const autor = document.getElementById('inputAutor');
const titulo = document.getElementById('inputTitulo');
const tabla = document.getElementById('tbody');
const inputB = document.getElementById('inputB');

const editTitulo = document.getElementById('editTitulo');
const editAutor = document.getElementById('editAutor');

const patern = /^[a-zA-ZÁ-ÿ0-9\s]{3,20}$/;

const libro = new Libro();


function eventListener() {
    document.getElementById('btnAdd').addEventListener('click', prepararLibro);
    //document.getElementById('confEdit').addEventListener('click', confirmarEdicion);
    tabla.addEventListener('click', acciones);
    document.getElementById('btnVaciar').addEventListener('click', vaciarLibreria);
    document.getElementById('btnBuscar').addEventListener('click', buscarLibro);
}

eventListener();
prepararDom();

let uid = Number(LocalStorageOperation.ultimoID());

function prepararLibro() {
    
    if((autor.value != '' && titulo.value != '') && (patern.test(autor.value) && patern.test(titulo.value))){
        
        const infoLibro = {
            id: uid++,
            titulo: titulo.value.trim(),
            autor: autor.value.trim()
        };
        
        let aux = LocalStorageOperation.noRepetir(infoLibro);
        console.log(aux + 'devuelto'); 
        if(aux == 'exito'){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Libro ya registrado',
                showConfirmButton: false,
                timer: 1000
              })
        }else{
            let tr = libro.agregar(infoLibro);
            tabla.appendChild(tr);
            LocalStorageOperation.almacenarLibro(infoLibro);
            // sweet alert
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se agregó libro',
                showConfirmButton: false,
                timer: 1000
              })
              autor.value = '';
              titulo.value = '';
        }
    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al escribir',
            showConfirmButton: false,
            timer: 1000
          })
    }
}

function acciones(event) {

    // console.log(event.target.tagName);
    if(event.target.tagName === 'I' || event.target.tagName === 'BUTTON' ){
        //libro.eliminar(event.target.tagName);

        if(event.target.className.includes('btn-outline-danger') || event.target.className.includes('fa-times')){
            libro.eliminar(event.target);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Libro eliminado',
                showConfirmButton: false,
                timer: 1000
              })
        }
        if(event.target.className.includes('btn-outline-warning') || event.target.className.includes('fas fa-pencil-alt')){
            libro.editar(event.target);
            
        }


    }
}

function prepararDom() {
    const librosLS = LocalStorageOperation.obtenerLS();
    console.log(librosLS);

    for(let i = 0; i < librosLS.length; i++){
        // const instanciaLibro = new Libro();
        let tr = libro.agregar(librosLS[i]);
        tabla.appendChild(tr);
    }
}

function vaciarLibreria() {
    while(tabla.firstChild){
        tabla.firstChild.remove();
    }
    LocalStorageOperation.borrarStorage();
}

function buscarLibro(event){
    event.preventDefault();
    //console.log(inputB.value);
    if(inputB.value != ''){
        let resultado=LocalStorageOperation.buscarTitulo(inputB.value.trim().toLowerCase());
        console.log(resultado);
    
        if(resultado != ''){
            Swal.fire(
            'Búsqueda exitosa',
            `El libro con título ${resultado.titulo} tiene el id ${resultado.id}, escrito por ${resultado.autor}`,
            'success'
            );
        }else{
            Swal.fire(
            'No se encontró el libro',
            `No existe un libro con título ${inputB.value}`,
            'error'
            );
        }
    }
    else{

    }
    inputB.value='';
}

// function confirmarEdicion(){
//     if((editTitulo.value != '' && editAutor.value != '') && (patern.test(editTitulo.value) && patern.test(editAutor.value))){
//         let arrayLibros = this.obtenerLS();
//         let arrayNuevo = [];

//         for()
//     }
// }