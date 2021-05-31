import { extendTheme } from '@chakra-ui/react'

export const customTheme = extendTheme({
    styles: {
        global: {
            body: {
                display: 'flex',
                width: "100vw",
                height: "100vh",
                justifyContent: "center",
                fontFamily: "Roboto",
                bg: "gray.800",
                color: "gray.50",
            }
        }
    }
})