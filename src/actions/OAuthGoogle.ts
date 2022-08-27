import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const OAuthGoogle = async () => {
  const navigate = useNavigate();
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check for user
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    // If user, doesn't exist, create user 
    if(!docSnap.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        // timestamp: serverTimestamp()
      });
    }
    navigate('/profile');
  } catch (error) {
    toast.error('Could not authorize with Google');
  }
};

export default OAuthGoogle;