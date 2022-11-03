import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const ProtectedRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return  <div className='flex h-screen w-screen items-center justify-center'>
                    <button type='button' className='flex items-center rounded-lg bg-slate-600 px-4 py-2 text-white' disabled>
                        <svg className="mr-3 h-5 w-5 animate-spin zinc-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="font-medium"> Loading... </span>
                    </button>
                </div>
    }
    if(user && user.uid){
        return children;
    }
    return <Navigate state={{from: location}} replace/>;
};

export default ProtectedRoute;