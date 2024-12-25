import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { captainProfile } from '../redux/auth/captain/captainAuthActions';
import { useDispatch } from 'react-redux';

function CaptainProtectWrapper({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(captainProfile(navigate));
    }, [navigate]);
    
    return ( 
        <>
            {children}
        </>
     );
}

export default CaptainProtectWrapper;