import { Box, Container, Flex, HStack, Link, Text } from '@chakra-ui/react'
import { LangSwitcher } from '~/components/common/lang-switcher'

export const Footer = () => {
    return (
        <Box as="footer" py="2" boxShadow="base">
            <Container maxW="container.lg">
                <Flex justifyContent="space-between" alignItems="center">
                    <HStack>
                        <Text fontSize="sm">© 2023</Text>
                        <Link
                            href="https://romanmeyer.dev"
                            target="_blank"
                            rel="noreferrer"
                            fontSize="sm"
                        >
                            Roman Meyer
                        </Link>
                    </HStack>
                    <LangSwitcher></LangSwitcher>
                </Flex>
            </Container>
        </Box>
    )
}
