import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';


export const ModalEdit = ({id, show, set, func})=>{

    const [nome, setNome] = useState('')
    const [cnpj_empresa, setCnpj] = useState('')
    const [ativos, setAtivos] = useState('')
    
    const handleClose = () => set(false);

    async function GetDados(){
        
        await axios.get(
            `http://localhost:8000/api/get/edit/cnpj/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        }
        ).then((e) => {
            setNome(e.data[0].nome)
            setAtivos(e.data[0].status)
            setCnpj(e.data[0].cnpj_empresa)



        });
    }



    const cnpj = {
        status: ativos,
        cnpj: cnpj_empresa,
        nome: nome
    }
    async function put(e){
        e.preventDefault()
            await axios.put(
                `http://localhost:8000/api/put/cnpj/${id}`,cnpj, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            }
            ).then((e)=>{
                if(e.status===200){
                    toast.success('Editado com sucesso!',{
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                 }) 
                 set(false)
                 func()
                }else if(e.response.status === 400){
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


    function Masck(value){
        return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2') 
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') 
        }



    useEffect(()=>{
        if(show === true)
            GetDados()   
    },[show ])

    return (

        <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar de CNPJ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={put}>
            <Form.Group className="mb-3">
              <Form.Label>Ativo</Form.Label>
              <Form.Select className="w-50"
              value={ativos}
              onChange={e=>setAtivos(e.target.value)}
              
              >
                <option value="Ativo" defaultValue={'Ativo'}>Ativo</option>
                <option value="Inativo">Inativo</option>

              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3"
            >
              <Form.Label>CPNJ</Form.Label>
              <Form.Control
                value={Masck(cnpj_empresa)}
                onChange={(e)=>setCnpj(e.target.value)}
                type="text"
                placeholder="Digite o CNPJ"
                maxLength={18}
                minLength={18}
                required
              />
            </Form.Group>


            <Form.Group
              className="mb-3"
            >
              <Form.Label>Nome</Form.Label>
              <Form.Control
                value={nome}
                onChange={(e)=>setNome(e.target.value)}
                type="text"
                placeholder="Digite o Nome"
                required

              />
            </Form.Group>

                    <div className="d-flex justify-content-end">

                    <Button type="submit"  variant="primary">
                        Editar
                    </Button>
                    </div>
          </Form>
        </Modal.Body>
<ToastContainer/>
      </Modal>
    </>
    )
}