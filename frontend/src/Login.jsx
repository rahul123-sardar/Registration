import {useState} from "react";
import axios from "axios";
import "./Login.css";


export default function Login(){
    

   let [form, setForm]=useState({email:"", password:""});
   
   const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/login",
      form
    );

    // ✅ SUCCESS MESSAGE
    alert(res.data.message);

  } catch (err) {
  
    alert(err.response.data.message);
  }
};


   return (
     <form onSubmit={handleSubmit} className="formClass">
       <label htmlFor="email">Email Address</label>
       <input
         id="email"
         name="email"
         type="email"
         onChange={handleChange}
         value={form.email}
         className="inputClass"
       /><br/><br/>
       <label htmlFor="password">Password</label>
       <input
         id="password"
         name="password"
         type="password"
         onChange={handleChange}
         value={form.password}
         className="inputClass"
       /><br />
       <button className="buttonClass">Submit</button>
     </form>
   );
}