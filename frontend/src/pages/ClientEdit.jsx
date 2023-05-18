// Import the react JS packages
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { CardCnpj } from "../componets/CardCnpj";
import axios from "axios";


// Define the Login function.
export const ClientEdit = () => {
    const [empresa, setEmpresa] = useState()
    const [ativo, setAtivo] = useState()
    const [nome, setNome] = useState()
    const [cnpj_, setCnpj] = useState('')
    const [ativos, setAtivos] = useState('Ativo')
    const [dados, setDados] = useState()

    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let id = window.location.href.replace('http://localhost:3000/cliente/', '')

    function Masck(value){
        return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2') 
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') 
        }



    const client = {
        empresa: empresa,
        ativo: ativo
    }
    const cnpj = {
        status: ativos,
        id:id,
        cnpj: cnpj_,
        nome: nome
    }
    async function GetEmpresas(){
        
        await axios.get(
            `http://localhost:8000/api/get/empresa/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        }
        ).then((e) => {
            setDados(e.data)

        });
    }


    async function CadastroCNPJ(e){
        e.preventDefault()

        await axios.post(
            'http://localhost:8000/api/cadastro/cnpj', cnpj,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        }
        ).then((e)=>{


            if(e.status===200){
                toast.success('CNPJ criado com sucesso!',{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
             }) 
             setShow(false)
             GetEmpresas()
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


   async function put(e){
    e.preventDefault()
        let id = window.location.href.replace('http://localhost:3000/cliente/', '')
        await axios.put(
            `http://localhost:8000/api/put/client/${id}`,client, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        }
        ).then((e)=>{
            if(e.status===200){
                toast.success('Cliente editado com sucesso!',{
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
             }) 
             setTimeout(()=>{
                 window.location.assign(`/`)
             }, 1000)

            }
        })
    }


   async function delete_cliente(e){
       e.preventDefault()
       let id = window.location.href.replace('http://localhost:3000/cliente/', '')
        await axios.delete(
            `http://localhost:8000/api/delete/client/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        }
        ).then((e)=>{
            if(e.status===200){
                toast.success('Deletado com sucesso!',{
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
             }) 
             setTimeout(()=>{
                 window.location.assign(`/`)
             }, 1000)

            }
        })
    }

    useEffect(() => {

        (async () => {
            await axios.get(
                `http://localhost:8000/api/get/edit/client/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            }
            ).then((e) => {
                setEmpresa(e.data[0].empresa)
                setAtivo(e.data[0].status)
                GetEmpresas()
            });
        })()
    }, []);


    return <div className="form-signin mt-5 text-center d-flex align-items-center justify-content-center flex-column gap-5">
        <div className="h-50 w-50 border p-5 bg-white bg-white rounded shadow row">
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
                    <option value='ativo' defaultValue={ativo}>Ativo</option>
                    <option value='inativo' >Inativo</option>
                </select>
            </div>

        </div>

        <div className="h-50 w-50 border bg-white bg-white rounded shadow row">
            <div className="d-flex justify-content-end bg-light p-4 rounded-top">
                <input type="button" value="+ Novo" className="btn btn-primary btn-lg" onClick={handleShow}/>

            </div>
            <div className="">
                {dados && dados.map((e)=>(
                    <CardCnpj key={e.id} nome={e.nome} cnpj={e.cnpj_empresa} id={e.id} status={e.status} func={GetEmpresas}/>

                ))}
            </div>
        </div>


        <form onSubmit={put} className="h-50 w-50 d-flex justify-content-between">
            <input type="button" value="Excluir" onClick={delete_cliente} className="btn btn-outline-danger btn-lg" />
            
            <input type="submit" value="Salvar" className="btn btn-outline-primary btn-lg" />


        </form>




        <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de CNPJ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={CadastroCNPJ}>
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
                value={Masck(cnpj_)}
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
                        Cadastrar
                    </Button>
                    </div>
          </Form>
        </Modal.Body>

      </Modal>
    </>
<ToastContainer/>
    </div>
}