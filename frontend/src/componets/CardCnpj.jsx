import React, {useState} from "react";
import {PencilSquare } from 'react-bootstrap-icons';
import { ModalEdit } from "./ModalEdit";

export const CardCnpj = ({id, cnpj, nome,status, func})=>{

    const [show_edit, setShowEdit] = useState(false);



    let css = ''
    if(status === "Ativo")
        css = 'bg-success'
    else
        css = 'bg-secondary'
    return (
        <div className="d-flex flex-direction-row justify-content-between border-bottom mb-2 p-1">
            <div className="d-flex gap-5 ">
                <span className="display-9">{cnpj}</span>
                <span className="display-9">{nome}</span>
            </div>

            <div className="d-flex gap-5 " >
                <span className={`border rounded ${css} p-1 text-white rounded-pill `}>{status}</span>
                <a onClick={()=>setShowEdit(true)} className="btn btn-outline-primary"><PencilSquare/> Editar</a >
            </div>
            <ModalEdit show={show_edit} id={id} set={setShowEdit} func={func}/>
        </div>
    )
}