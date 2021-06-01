import { Box, Flex, Icon, Input, Text, Table, TableCaption, Tbody, Th, Thead, Tr, Td, Link, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { AiOutlineSearch, AiFillEdit, AiFillDelete, AiOutlinePlus } from 'react-icons/ai'
import { Header } from '../components/Header';
import { api } from '../services/api';

interface IEmployeeData {
    id: number;
    name: string;
    cpf: string;
    office: string;
}

const dateFormatted = new Intl.NumberFormat('pt-BR',{
    style: 'currency',
    currency: 'BRL'
})

export default function Employees(){
    const [employees, setEmployees] = useState<IEmployeeData[]>([])
    const [filteredEmployees, setFilteredEmployees] = useState<IEmployeeData[]>([])
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function getProduct(){
            const data = await api.get('employees')
            .then(response => response.data)

            const dataOrdered:IEmployeeData[] = data.sort(function (a,b) {
                    if(a.name < b.name) { return -1}
                    if(a.name > b.name) { return 1}
                    return 0
                }
            )

            const result = dataOrdered.map((employee:IEmployeeData) => {
                return {
                    id: employee.id,
                    name: employee.name,
                    cpf: employee.cpf,
                    office: employee.office, 
                }               
            })
            setEmployees(result);
            setFilteredEmployees(result)
        }        
        getProduct();

    }, [])

    useEffect(() => {
        let dataFiltered = [];
            employees.filter(employee => {
                if(employee.name.toLowerCase().includes(search.toLowerCase())){
                    dataFiltered.push(employee)
                }
            })
            setFilteredEmployees(dataFiltered)

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
                            Funcionários
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
                            (filteredEmployees.length > 0 && search.length > 0)
                                ? `Sua busca resultou em ${filteredEmployees.length} de ${employees.length} employeees`
                                : `Total de employeees listados: ${filteredEmployees.length}`
                        }
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th >CPF</Th>
                            <Th >Perfil</Th>
                            <Th isNumeric>Opções</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {filteredEmployees.map(employee => {
                        return (
                            <Tr key={employee.id} _hover={{color: "gray.400"}}>
                                <Td>{employee.name}</Td>
                                <Td>{employee.cpf}</Td>
                                <Td>{employee.office}</Td>
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