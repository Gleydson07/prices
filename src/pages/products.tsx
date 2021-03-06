import { Box, Flex, Icon, Input, Text, Table, TableCaption, Tbody, Th, Thead, Tr, Td, Link, HStack, Spinner, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { AiOutlineSearch, AiFillEdit, AiFillDelete, AiOutlinePlus } from 'react-icons/ai'
import { Header } from '../components/Header';
import { api } from '../services/api';

interface IProductData {
    id: number;
    description: string;
    metric: string;
    price: number;
}

const dateFormatted = new Intl.NumberFormat('pt-BR',{
    style: 'currency',
    currency: 'BRL'
})

export default function Products(){
    const [products, setProducts] = useState<IProductData[]>([])
    const [filteredProducts, setFilteredProducts] = useState<IProductData[]>([])
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function getProduct(){
            const data = await api.get('products')
            .then(response => response.data)

            const dataOrdered:IProductData[] = data.sort(function (a,b) {
                    if(a.description < b.description) { return -1}
                    if(a.description > b.description) { return 1}
                    return 0
                }
            )

            const result = dataOrdered.map((product:IProductData) => {
                return {
                    id: product.id,
                    description: product.description,
                    metric: product.metric,
                    price: dateFormatted.format(product.price), 
                }               
            })
            
            setProducts(result);
            setFilteredProducts(result)
        }        
        getProduct();

    }, [])

    useEffect(() => {
        let dataFiltered = [];
            products.filter(product => {
                if(product.description.toLowerCase().includes(search.toLowerCase())){
                    dataFiltered.push(product)
                }
            })
            setFilteredProducts(dataFiltered)

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
                            (filteredProducts.length > 0 && search.length > 0)
                                ? `Sua busca resultou em ${filteredProducts.length} de ${products.length} produtos`
                                : `Total de produtos listados: ${filteredProducts.length}`
                        }
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Descri????o</Th>
                            <Th isNumeric>Pre??o</Th>
                            <Th isNumeric>Unidade</Th>
                            <Th isNumeric>Op????es</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {filteredProducts.map(product => {
                        return (
                            <Tr key={product.id} _hover={{color: "gray.400"}}>
                                <Td>{product.description}</Td>
                                <Td isNumeric>{product.price}</Td>
                                <Td isNumeric>{product.metric}</Td>
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