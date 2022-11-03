import React from 'react';
import { Link } from 'react-router-dom';
import login from '../../assets/images/login/login.svg'

const Login = () => {
    const handleLogin = event =>{
        event.preventDefault();
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