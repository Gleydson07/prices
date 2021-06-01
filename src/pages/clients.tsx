import { Box, Flex, Icon, Input, Text, Table, TableCaption, Tbody, Th, Thead, Tr, Td, Link, HStack, Spinner, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { AiOutlineSearch, AiFillEdit, AiFillDelete, AiOutlineEye, AiOutlinePlus } from 'react-icons/ai'
import { Header } from '../components/Header';
import { api } from '../services/api';

type PricePerProduct = {
    product: number;
    price: number;
}

type AddressData = {
    id: number;
    place: string;
    city: string;
    uf: string;
}

interface IClientData {
    id: number;
    name: string;
    address: AddressData[];
    prices: PricePerProduct[];
}

const dateFormatted = new Intl.NumberFormat('pt-BR',{
    style: 'currency',
    currency: 'BRL'
})

export default function Clients(){
    const [clients, setClients] = useState<IClientData[]>([])
    const [filteredClients, setFilteredClients] = useState<IClientData[]>([])
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function getProduct(){
            const data = await api.get<IClientData[]>('clients')
            .then(response => response.data)

            const dataOrdered:IClientData[]  = data.sort(function (a,b) {
                    if(a.name < b.name) { return -1}
                    if(a.name > b.name) { return 1}
                    return 0
                }
            )

            const result = dataOrdered.map((client:IClientData) => {
                return {
                    id: client.id,
                    name: client.name,
                    address: client.address,
                    prices: client.prices, 
                }               
            })
            setClients(result);
            setFilteredClients(result)
        }        
        getProduct();

    }, [])

    useEffect(() => {
        let dataFiltered = [];
            clients.filter(client => {
                if(client.name.toLowerCase().includes(search.toLowerCase())){
                    dataFiltered.push(client)
                }
            })
            setFilteredClients(dataFiltered)

    }, [search])


    return (
        <>
            <Header/>
            <Flex
                flexDir="column"
                width={900}
            >
                <Flex
                    width="100%"
                    justify='space-between'
                    mt="8" 
                    mb="4"
                >
                    <Box width="50%">
                        <Text 
                            fontSize="lg"
                            color="gray.50"
                        >
                            Clientes
                        </Text>
                        <Flex
                            position="relative"
                        >
                            <Input 
                                onChange={e => setSearch(e.target.value)}
                                value={search}
                                variant="flushed"
                                borderColor="gray.700"
                                placeholder="Nome"
                                my="2"
                                p="4"
                            />
                            <Icon 
                                position="absolute"
                                right="0"
                                top="50%"
                                transform="translate(-50%, -50%)"
                                fontSize="xl"
                                color="gray.100"
                                as={AiOutlineSearch}
                            />
                        </Flex>
                    </Box>

                    <Link
                        as={AiOutlinePlus}
                        alignSelf="flex-end"
                        bgColor="gray.700"
                        fontSize="xl"
                        borderRadius="4"
                        height="9"
                        width="16"
                        py="1"
                        my="2"
                        _hover={{
                            bgColor:"gray.600",
                        }}
                    />
                </Flex>
                    
                <Table
                    variant="striped"
                    colorScheme="whiteAlpha"
                >
                    <TableCaption>
                        {
                            (filteredClients.length > 0 && search.length > 0)
                                ? `Sua busca resultou em ${filteredClients.length} de ${clients.length} clientes`
                                : `Total de clientes listados: ${filteredClients.length}`
                        }
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th >Endereço</Th>
                            <Th >Preços</Th>
                            <Th isNumeric>Opções</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {filteredClients.map(client => {
                        return (
                            <Tr key={client.id} _hover={{color: "gray.400"}}>
                                <Td>{client.name}</Td>
                                <Td >
                                    {`${client.address[0].place}, 
                                    ${client.address[0].city} - 
                                    ${client.address[0].uf}`}
                                </Td>
                                <Td>
                                    <Link 
                                        as={AiOutlineEye} 
                                        fontSize="2xl"
                                        color="gray.400"
                                        _hover={{color:"gray.50"}}
                                    />
                                </Td>
                                <Td >
                                    <HStack 
                                        fontSize="2xl" 
                                        spacing="10"
                                        float="right"
                                    >
                                        <Link>
                                            <Icon 
                                                as={AiFillEdit} 
                                                color="cyan.700"
                                                _hover={{color: "cyan.900"}}
                                            />
                                        </Link>

                                        <Link>
                                            <Icon 
                                                as={AiFillDelete} 
                                                color="red.700"
                                                _hover={{color: "red.900"}}
                                            />
                                        </Link>
                                    </HStack>
                                </Td>
                            </Tr>
                        )})}
                    </Tbody>
                </Table>
            </Flex>     
        </>
        
    )
}