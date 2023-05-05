import type { LoaderArgs } from '@remix-run/node'

import { Box, Button, Container, Heading } from '@chakra-ui/react'
import { Form, Outlet } from '@remix-run/react'
import { authMiddleware } from '~/middleware/auth'

export const loader = async ({ request }: LoaderArgs) =>
    authMiddleware(request, '/login', false)

const Dashboard = () => {
    return (
        <Box>
            <Heading>Dashboard</Heading>

            <Container maxW="container.lg">
                <Outlet />
            </Container>

            <Form action="/logout" method="post">
                <Button type="submit">Logout</Button>
            </Form>
        </Box>
    )
}

export default Dashboard
