import React, { useState } from 'react'

export const Formulario = ({guardarFrase}) => {

    const [frase, setFrase] = useState('');
    const [error, setError] = useState(false);
    
    const handleSubmit=(e)=> {
        e.preventDefault();
        
        if(frase.trim()===''){
            setError(true);
            return;
        }
        
        guardarFrase(frase);
        
    }

    return (
        <form onSubmit={handleSubmit}>
         <div className="row">
            <div className="form-group col-md-8">
               
                <input 
                type="text"
                className="form-control form-control-lg"
                placeholder="Busca una imagen, Ej. 'Futboll o cafe' "
                onChange={e=> setFrase(e.target.value)}
                />
            
             </div>
             <div className="form-group col-md-4">
               
               <input 
               type="submit"
               className="btn btn-block btn-lg btn-danger"
               value='Buscar'
               />
           
            </div>
            {error? <p className="alert p-4 text-center alert-info mx-3" >Ingrese Frase</p>:null}
            </div>
        
        </form>
    )
}
