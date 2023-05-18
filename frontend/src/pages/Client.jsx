import {  useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios";
export const Client = () => {
    const [empresa, setEmpresa] = useState('');
    const [ativo, setAtivo] = useState('Ativo');


    const client = {
        empresa: empresa,
        ativo: ativo
    }

    async function CadastroCliente(e){
        e.preventDefault()
        await axios.post(
            'http://localhost:8000/api/cadastro/client', client,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        }
        ).then((e)=>{


            if(e.status===200){
                toast.success('Cliente criado com sucesso!',{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
             }) 
             setTimeout(()=>{
                 window.location.assign(`/cliente/${e.data}`)
             }, 1000)

            } else if(e.response.status === 400){
               toast.error(e.response.data,{
                   position: "top-right",
                   autoClose: 5000,
                   hideProgressBar: false,
                   closeOnClick: true,
                   pauseOnHover: true,
                   draggable: true,
                   progress: undefined,
                   theme: "colored",

            });

            }
        })
       
    }

            
        

    return <div className="form-signin mt-5 text-center d-flex align-items-center justify-content-center flex-column gap-5">
        <form className="h-50 w-50 border p-5 bg-white bg-white rounded shadow row" onSubmit={CadastroCliente}>
            <div className="form-group col-md-6" >
                <label htmlFor="empresa" className="control-label d-flex justify-content-start">Empresa</label>
                <input type="text" name="empresa" className="form-control" 
                value={empresa}
                onChange={e => setEmpresa(e.target.value)}
                />
            </div>

            <div className="form-group col-md-6">
                <label htmlFor="status" className="d-flex justify-content-start" >Status</label>
                <select name="status" className="form-select" id="status"
                value={ativo}
                onChange={e => setAtivo(e.target.value)}
                >
                    <option value='Ativo' selected>Ativo</option>
                    <option value='Inativo' >Inativo</option>
                </select>
            </div>

        <div className="mt-4 d-flex justify-content-end">
            <input type="submit" value="Salvar" className="btn btn-outline-primary btn-lg"/>
        
        </div>
    </form>

       <ToastContainer/>

    </div>
}