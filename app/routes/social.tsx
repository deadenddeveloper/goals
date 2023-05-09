import type { ActionArgs } from '@remix-run/node'

import { socialAuth } from '~/services/auth'
import { redirect } from '@remix-run/node'

export const action = async ({ request }: ActionArgs) => {
    const form = await request.formData()
    const uid = form.get('uid') as string

    return socialAuth(uid)
}

export const loader = () => {
    return redirect('/')
}
