import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { firebaseApp } from '~/services/firebase'
import { userSchema } from '~/validation/user'
import { presentYupValidationError } from '~/presenters/yup'
import { ValidationError } from 'yup'
import { json } from '@remix-run/router'
import { createCookieSessionStorage, redirect } from '@remix-run/node'
import { FirebaseError } from '@firebase/app'

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
    throw new Error('SESSION_SECRET must be set')
}

const storage = createCookieSessionStorage({
    cookie: {
        name: 'goals_session',
        secure: process.env.NODE_ENV === 'production',
        secrets: [sessionSecret],
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
    },
})

export const getSession = (request: Request) => {
    return storage.getSession(request.headers.get('Cookie'))
}

export const getUid = async (request: Request) => {
    const session = await getSession(request)

    const uid = session.get('uid')
    if (!uid || typeof uid !== 'string') {
        return null
    }

    return uid
}

export const isUserSignedIn = async (request: Request) => {
    return !!(await getUid(request))
}

export const createSession = async (uid: string, redirectTo: string) => {
    const session = await storage.getSession()
    session.set('uid', uid)
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        },
    })
}

const _auth = async (
    email: string,
    password: string,
    authFunction:
        | typeof createUserWithEmailAndPassword
        | typeof signInWithEmailAndPassword
) => {
    try {
        const validated = await userSchema.validate(
            { email, password },
            { abortEarly: false }
        )

        const userCredential = await authFunction(
            getAuth(firebaseApp),
            validated.email,
            validated.password
        )

        return createSession(userCredential.user.uid, '/dashboard')
    } catch (error) {
        if (error instanceof ValidationError) {
            return json(presentYupValidationError(error), 422)
        }

        if (error instanceof FirebaseError) {
            return json({ _e: error.code }, 422)
        }

        return null
    }
}

export const signup = async (email: string, password: string) => {
    return await _auth(email, password, createUserWithEmailAndPassword)
}

export const login = async (email: string, password: string) => {
    return await _auth(email, password, signInWithEmailAndPassword)
}

export const logout = async (request: Request) => {
    const session = await getSession(request)
    return redirect('/login', {
        headers: {
            'Set-Cookie': await storage.destroySession(session),
        },
    })
}
