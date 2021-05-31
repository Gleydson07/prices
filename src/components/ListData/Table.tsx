import { Table, TableCaption, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

export function Table(){
    return (
        <Table
            variant="striped"
            colorScheme="whiteAlpha"
        >
            <TableCaption>Lista de produtos - 5 cadastros localizados</TableCaption>
            <Thead>
                <Tr>
                    <Th>Descrição</Th>
                    <Th isNumeric>Preço</Th>
                    <Th>Unidade</Th>
                </Tr>
            </Thead>
            <Tbody>
                {}
                <Tr></Tr>
            </Tbody>
        </Table>
    )
}