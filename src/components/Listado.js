import React from 'react'
import { Imagen } from './Imagen'

export const Listado = ({Busqueda}) => {

    if(Busqueda === '') return;
   
    
    return (
        <div className="col-12 p-5 row " >
            {
                Busqueda.map(listado => (
                  
                        <Imagen 
                        key={listado.id}
                        Listado={listado} 
                        />
                  
                ))
            } 
        </div>
            
    )
}
