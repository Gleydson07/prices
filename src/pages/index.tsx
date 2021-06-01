import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Flex, VStack } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface IUserData {
    username: string,
    password: string
}

export default function Index(){
    const router = useRouter();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    return (
        <Flex
            width="100%"
            height="100%"
            align="center"
        >
            <Flex
                flexDir="column"
                py="24"
                px="10"
                boxShadow="inner"
                rounded="md"
                bgColor="gray.700"
            >
                <VStack 
                    spacing="4"
                    minWidth="250px"
                    width="100%"
                >
                    <Input 
                        id="username" 
                        name="username"
                        type="text" 
                        bgColor="gray.800"
                        variant="unstyled"
                        placeholder="CPF"
                        p="2"
                        value={username} 
                        onChange={e => setUsername(e.target.value)}
                    />

                    <Input 
                        id="password" 
                        name="password"
                        type="password" 
                        bgColor="gray.800"
                        variant="unstyled"
                        placeholder="Senha"
                        p="2"
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />

                </VStack>
                <Button
                    onClick={() => router.push('/dashboard')}
                    mt="12"
                    width="100%"
                    bgColor="pink.600"
                    _hover={{bgColor:"pink.700"}}
                >
                    Entrar
                </Button>
            </Flex>
            
        </Flex>
    )
}