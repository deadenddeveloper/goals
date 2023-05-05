import { isUserSignedIn } from '~/services/auth'
import { redirect } from '@remix-run/node'

export const authMiddleware = async (
    request: Request,
    redirectTo: string,
    shouldBeLoggedIn = true
) => {
    if ((await isUserSignedIn(request)) === shouldBeLoggedIn) {
        return redirect(redirectTo)
    }

    return null
}
