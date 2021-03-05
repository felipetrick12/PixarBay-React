import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Formulario } from './components/Formulario'
import { Listado } from './components/Listado';


export const App = () => {
  
  const [Frase, guardarFrase] = useState('');
  const [Busqueda, guardarBusqueda] = useState([]);
  const [ paginaactual, guardarPaginaActual ] = useState(1);
  const [ totalpaginas, guardarTotalPaginas] = useState(5);
  
  const limit=20;
  const apiKEy= '20534267-2000a0439fac51db0d3664b25';
  const url = `https://pixabay.com/api/?key=${apiKEy}&q=${Frase}&per_page=${limit}&page=${paginaactual}`;
  
 
      useEffect(() => {
        if(Frase === '') return;

        const consultarApi =async()=> {
          const {data} = await axios.get(url);   
          const{hits}=data; 
          guardarBusqueda(hits);
      
          // calcular el total de paginas
          const calcularTotalPaginas = Math.ceil(data.totalHits / limit );
          guardarTotalPaginas(calcularTotalPaginas);

          // Mover la pantalla hacia arriba
          const jumbotron = document.querySelector('.jumbotron');
          jumbotron.scrollIntoView({ behavior: 'smooth' })
        }
        consultarApi();
      }, [Frase,url,paginaactual]);
  

      // definir la página anterior
      const paginaAnterior = () => {
        const nuevaPaginaActual = paginaactual - 1;

        if(nuevaPaginaActual === 0 ) return;

        guardarPaginaActual(nuevaPaginaActual);
      }

      // definir la pagina siguiente
      const paginaSiguiente = () => {
        const nuevaPaginaActual = paginaactual + 1;

        if(nuevaPaginaActual > totalpaginas ) return;
    
        guardarPaginaActual(nuevaPaginaActual);
      }


  return (
    <>
    <div className="container-fluid m-0">
    <div className="container p-5">
      <div className="jumbotron" >
      <p className="lead text-center">Bucador de Imagenes </p>
      <Formulario
        guardarFrase={guardarFrase}
      />
      </div>
    </div>
    </div>

    <div className="container mt-2">
      <div className="row justify-content-center">
      <Listado 
      Busqueda={Busqueda}
      />

         { (paginaactual === 1) ? null : (
            <button 
                type="button"
                className="btn btn-lg btn-info mr-1"
                onClick={paginaAnterior}
            >&laquo; Anterior </button>
          ) }

          { (paginaactual === totalpaginas || Frase==='') ? null : (
            <button 
              type="button"
              className="btn btn-lg mx-2 btn-info"
              onClick={paginaSiguiente}
            >Siguiente &raquo;</button>
          ) }
      </div>
      </div>
     </>
  )
}
