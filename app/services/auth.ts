import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import { auth as authService } from '~/services/firebase'
import { userSchema } from '~/validation/user'
import { createCookieSessionStorage, redirect } from '@remix-run/node'
import { wrapError } from '~/services/error'

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
    throw new Error('SESSION_SECRET must be set')
}

const LOGGED_IN_REDIRECT = '/dashboard'
const NOT_LOGGED_IN_REDIRECT = '/login'
const SESSION_EXPIRATION = 60 * 60 * 24 * 365

const storage = createCookieSessionStorage({
    cookie: {
        name: 'goals_session',
        secure: process.env.NODE_ENV === 'production',
        secrets: [sessionSecret],
        sameSite: 'lax',
        path: '/',
        maxAge: SESSION_EXPIRATION,
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
            authService,
            validated.email,
            validated.password
        )

        return createSession(userCredential.user.uid, LOGGED_IN_REDIRECT)
    } catch (error) {
        return wrapError(error as Error)
    }
}

export const signup = async (email: string, password: string) => {
    return await _auth(email, password, createUserWithEmailAndPassword)
}

export const login = async (email: string, password: string) => {
    return await _auth(email, password, signInWithEmailAndPassword)
}

export const logout = async (request: Request) => {
    await signOut(authService)
    const session = await getSession(request)
    return redirect(NOT_LOGGED_IN_REDIRECT, {
        headers: {
            'Set-Cookie': await storage.destroySession(session),
        },
    })
}

export const socialAuth = async (uid: string) => {
    return createSession(uid, LOGGED_IN_REDIRECT)
}
