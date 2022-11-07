import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import login from '../../assets/images/login/login.svg'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Login = () => {
    const {loginUser} = useContext(AuthContext); 

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        loginUser(email, password)
        .then(result =>{
            const user = result.user;
            const currentUser = {
                email: user.email
            }
            fetch('http://localhost:5000/jwt', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // Local storage is the easiest but not the best place to store jwt token
                localStorage.setItem('genius-token', data.token);
                navigate(from, {replace: true})
            })
            console.log(user);
            
        })
        .then(error => console.error(error))
    }
    return (
        <section className="hero">
            <div className="hero-content grid md:grid-cols-2 gap-20 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img className='w-3/4' src={login} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
                    <h1 className="text-5xl font-bold text-center">Login</h1>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name='email' placeholder="Email" className="input input-bordered" required/>
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name='password' placeholder="Password" className="input input-bordered" required/>
                        </div>
                        <div className="form-control mt-6">
                        <input type='submit' className="btn btn-primary" value='Login'/>
                        </div>
                    </form>
                    <p className='mx-auto'>New to Genius Car <Link to='/signup' className='text-warning font-bold'>Sign Up</Link></p>
                </div>
            </div>
        </section>
    );
};

export default Login;