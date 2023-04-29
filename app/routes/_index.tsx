import { Box, Button, Heading } from '@chakra-ui/react'
import { Link } from '@remix-run/react'

const Index = () => {
    return (
        <Box maxW="32rem">
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
        </Box>
    )
}

export default Index
