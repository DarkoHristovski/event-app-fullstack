import { useEffect, useState } from "react";
import axios from '../axiosinstances'

const Home = () =>{
    const[users, setUsers]= useState([]);

    useEffect(()=>{
        axios.get(`api/users`)
        .then(res=>setUsers(res.data))
        .catch(e=>console.log(e))

    },[])

    return(
       <main>
        {users.map(user=>{
            return(
    <div className="card" key={user._id} style={{ width: "18rem" }}>
  <img src="https://cdn-icons-png.flaticon.com/512/21/21104.png" className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">User:{user.username}</h5>
    <p className="card-text">
      Email:{user.email}
    </p>
    <a href="#" className="btn btn-primary">
      Go somewhere
    </a>
  </div>
</div>

            )
        })}
       </main>
    )
}

export default Home;