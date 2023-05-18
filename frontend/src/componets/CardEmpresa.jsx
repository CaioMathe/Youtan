import React from "react";
import {PencilSquare } from 'react-bootstrap-icons';


export const Card = ({id, empresa, status})=>{
    let css = ''
    if(status === "Ativo")
        css = 'bg-success'
    else
        css = 'bg-secondary'
    return (
        <div className="d-flex flex-direction-row justify-content-between border-bottom mb-2 p-1">
            <span className="display-9">{empresa}</span>
            <div className="d-flex gap-5 " >
                <span className={`border rounded ${css} p-1 text-white rounded-pill `}>{status}</span>
                <a href={`/cliente/${id}`} className="btn btn-outline-primary"><PencilSquare/> Editar</a >
            </div>
        </div>
    )
}