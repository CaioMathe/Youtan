// Import the react JS packages
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../componets/CardEmpresa";
// Define the Login function.
export const Home = () => {

  const [data, setData] = useState('')


  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      window.location.href = '/login'
    }
    else {
      (async () => {
        try {
          await axios.get(
            'http://localhost:8000/api/get/client/', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
          }
          ).then((e)=>{
            setData(e.data)
          });
        } catch (e) {
        }
      })()
    };
  }, []);
  return <div className="form-signin mt-5 text-center d-flex align-items-center justify-content-center flex-column gap-2">
    <div className="w-50 d-flex justify-content-end">
        <a type="button" href="/cliente" className="btn btn-primary btn-lg">Novo</a>

    </div>
    <div className="h-50 w-50 border mt-4 p-4 bg-white bg-white rounded shadow">
          {data && data.map((e)=>{
            return <Card key={e.id} empresa={e.empresa} id={e.id} status={e.status}/>
          })}
    </div>

  </div>
}