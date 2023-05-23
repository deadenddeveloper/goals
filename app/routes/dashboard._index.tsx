import { json } from '@remix-run/router'
import { Goal } from '~/services/db'
import { useLoaderData } from '@remix-run/react'

export async function loader() {
    return json(await Goal.findAll())
}

const Dashboard = () => {
    const data = useLoaderData<typeof loader>()

    return <pre>{JSON.stringify(data)}</pre>
}

export default Dashboard
