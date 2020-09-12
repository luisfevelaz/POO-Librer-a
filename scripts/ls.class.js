class LocalStorageOperation{
    static almacenarLibro(infoLibro){
        // console.log(infoLibro);
        let arrayLibros = this.obtenerLS();
        arrayLibros.push(infoLibro);
        // console.log(arrayLibros);
        localStorage.setItem('Libros', JSON.stringify(arrayLibros));
    }
    
    static obtenerLS(){
        if(localStorage.getItem('Libros') === null){
            // console.log('Vacío');
            return [];
        }else{
            // console.log('Sí hay libros');
            return JSON.parse(localStorage.getItem('Libros'));
        }
    }

    static borrarStorage() {
        localStorage.clear();
    }

    static borrarLibro(idLibro) {
        console.log(idLibro);
        let arrayLibros = this.obtenerLS();
        let arrayNuevo = [];

        for(let i = 0; i < arrayLibros.length; i++){
            if(idLibro != arrayLibros[i].id){
                arrayNuevo.push(arrayLibros[i]);
            }
        }
        console.log(arrayNuevo);

        localStorage.setItem('Libros',JSON.stringify(arrayNuevo));

        // localStorage.clear();
        // if(arrayNuevo.length > 0){
        //     localStorage.setItem('Libros',JSON.stringify(arrayNuevo));
        // }
    }

    static ultimoID(){
        let arrayLibro=this.obtenerLS();

        if(arrayLibro == 0){
            return 0;
        }
        else{
            return (arrayLibro[arrayLibro.length-1].id+1);
        }
    }

    static buscarTitulo(tituloLibro){
        console.log(tituloLibro);

        let arrayLibros = this.obtenerLS();
        let resultado = '';

        for(let i = 0; i < arrayLibros.length; i++){
            if(arrayLibros[i].titulo.toLowerCase() == tituloLibro){
                return resultado=arrayLibros[i];
            }
        }
        return resultado;
    }

    static noRepetir(infoLibro){
        let arrayLibros = this.obtenerLS(); 
        let auxiliar = '';

        for(let i = 0; i< arrayLibros.length; i++){
            if(arrayLibros[i].titulo.toLowerCase() == infoLibro.titulo.toLowerCase() && arrayLibros[i].autor.toLowerCase() == infoLibro.autor.toLowerCase()){
                return 'exito';
            }
        }
        return auxiliar;
    }

    static editarLibro(idLibro){
        const titulo = document.getElementById('editTitulo');
        const autor = document.getElementById('editAutor');
        const patern = /^[a-zA-ZÁ-ÿ0-9\s]{3,20}$/;

        console.log(idLibro);

        let arrayLibros = this.obtenerLS();
        let arrayNuevo = [];

        

        for(let i = 0; i < arrayLibros.length; i++){
            if(idLibro == arrayLibros[i].id){
                titulo.value = arrayLibros[i].titulo;
                autor.value = arrayLibros[i].autor;
            }
        }

        document.getElementById('confEdit').addEventListener('click', () => {
           

            if((titulo.value.trim() != '' && autor.value.trim() != '') && (patern.test(titulo.value) && patern.test(autor.value))){
                const infoLibro = {
                    id: 0,
                    titulo: titulo.value.trim(),
                    autor: autor.value.trim()
                };


                 let aux = this.noRepetir(infoLibro);
                 console.log(aux + ' repetir');
                 if(aux == ''){
                     for(let i = 0; i < arrayLibros.length; i++){
                         if(idLibro == arrayLibros[i].id){
                             arrayLibros[i].titulo = titulo.value.trim();
                             arrayLibros[i].autor = autor.value.trim();
                         }
                         arrayNuevo.push(arrayLibros[i]);
     
                     }
                     localStorage.setItem('Libros',JSON.stringify(arrayNuevo));
                     window.location.reload(false);   
                }else{
                    Swal.fire(
                        'Libro repetido',
                        `Este libro ya está registrado`,
                        'error'
                        );
                }


            }
            else{
                Swal.fire(
                    'Datos incorrectos',
                    `Los datos no son validos`,
                    'error'
                    );
            }
            //return true
            //window.location.reload(false);
        });


    }
}