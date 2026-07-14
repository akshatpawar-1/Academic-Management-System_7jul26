import { useState } from "react";
import { login } from "../services/authService";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const hUsername=(event)=>{setUsername(event.target.value)}
    const hPassword=(event)=>{setPassword(event.target.value)}

    const loginUser = async(event)=>{
	event.preventDefault();

	try{
		const data={
			username,
			password
		};
		
		const res= await login(data);

		console.log(res.data);
		setUsername("");
		setPassword("");
	}
	catch(error){

    		if(error.response)
        		console.log(error.response.data.message);

    		else
        		console.log("Server Not Running");

	}
    };

    return (

        <>
	<div className="page">
            <h1>Login</h1>
            <form onSubmit={loginUser}>

                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={hUsername}
		    required
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={hPassword}
		    required
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>
            </form>
	</div>
        </>

    );
}
export default Login;