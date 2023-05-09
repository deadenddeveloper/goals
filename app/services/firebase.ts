import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '~/config/firebase'
import { getAuth } from 'firebase/auth'

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
