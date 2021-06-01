import { Divider, Flex, Grid, Icon, Link, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import {AiOutlineArrowLeft} from 'react-icons/ai'
import {GiChicken} from 'react-icons/gi'
import {ImExit} from 'react-icons/im'
import {MdPersonPin, MdBusinessCenter} from 'react-icons/md'
import { CardDashboard } from '../CardDashboard';

export function Header(){
    const router = useRouter();
    const path = router.asPath;
    return (
        <Flex
            flexDir="column"
            width="100%"
        >
            <Flex 
                height="24"
                py="4"
                my="4"
                width="100%"
                justify={path === '/dashboard' ? "flex-end" : "space-between"}
            >   
                {path != '/dashboard' && (
                    <Link
                        my="auto"
                        color="gray.200"
                        _hover={{color:"gray.400"}}
                        onClick={() => router.push('/dashboard')}
                    >
                        <Icon 
                            as={AiOutlineArrowLeft}
                            fontSize="2xl"
                        />
                    </Link>
                )}

                <Flex>
                    <Flex 
                        flexDir="column"
                        mr="8"
                        textAlign="right"
                        justify="center"
                        color="gray.50"
                    >
                        <Text>Gleydson Albuquerque da Silva Santos</Text>
                        <Text fontSize="sm" color="gray.400">Entregador</Text>
                    </Flex>

                    <Divider 
                        orientation="vertical"
                        borderColor="gray.400"
                    />

                    <Link
                        mx="8"
                        my="auto"
                        color="gray.200"
                        onClick={() => router.push('/')}
                        _hover={{color:"gray.400"}}
                    >
                        <Icon 
                            fontSize="2xl"
                            as={ImExit}
                        />
                    </Link>
                </Flex>
                
            </Flex>
        
            <Grid
                templateColumns="repeat(3, 1fr)"
                gap="4"
            >
                <CardDashboard 
                    iconCard={MdPersonPin} 
                    title="Clientes"
                    onClick={() => router.push('/clients')}
                />
            
                <CardDashboard 
                    iconCard={MdBusinessCenter} 
                    title="Funcionários"
                    onClick={() => router.push('/employees')}
                />
            
                <CardDashboard 
                    iconCard={GiChicken} 
                    title="Produtos"
                    onClick={() => router.push('/products')}
                />
            
            </Grid>
        </Flex>
        
    )
}