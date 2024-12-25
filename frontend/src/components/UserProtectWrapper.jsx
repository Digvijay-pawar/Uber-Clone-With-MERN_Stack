import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userProfile } from '../redux/auth/user/userAuthActions';
import { useDispatch } from 'react-redux';

function UserProtectWrapper({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userProfile(navigate));
    }, [navigate]);
    
    return ( 
        <>
            {children}
        </>
     );
}

export default UserProtectWrapper;