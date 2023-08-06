import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "../../../../lib/axios";
import Cookies from "js-cookie";

const FormContent = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async event => {
    event.preventDefault()

    // GETTING THE CSRF TOKEN FROM LARAVEL
    const csrfResponse = await axios.get('/sanctum/csrf-cookie').then(response => console.log(response)).catch(error => console.log(error));
    
    // Sendind the data given to the API Endpoint. If successful, setting a cookie valid for 2 days with the token, if not, alerting the error.
    axios.post('/api/login',{
      username: username,
      password: password
    }).then(response => {
      Cookies.set("token",response.data.token,{expires: 2});
      router.push("/dashboard");
    }).catch(error => console.log(error)); 
  }

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  }

  return (
    <div className="form-inner">
      <h3>Iniciar Sesión</h3>

      {/* <!--Login Form--> */}
      <form method="post" onSubmit={submitForm}>
        <div className="form-group">
          <label>Usuario</label>
          <input type="text" name="username" placeholder="Username" required onChange={onUsernameChange}/>
        </div>
        {/* username */}

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={onPasswordChange}
          />
        </div>
        {/* password */}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            name="log-in"
          >
            Iniciar sesión
          </button>
        </div>
        {/* login */}
      </form>
      {/* End form */}

    </div>
  );
};

export default FormContent;
