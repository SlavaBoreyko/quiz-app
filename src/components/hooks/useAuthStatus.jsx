import {useEffect, useState, useRef} from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../features/user/userSlice'

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)
    const isMounted = useRef(true)
    const dispatch = useDispatch();

    useEffect(() => {
        if(isMounted) {
            const auth = getAuth()
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    setLoggedIn(true)
                    dispatch(setCurrentUser());
                }
                setCheckingStatus(false)
            })
        }

        return () => {
            isMounted.current = false
        }
    }, [isMounted])

  return { loggedIn, checkingStatus }
}
