import { Flex } from '@chakra-ui/layout';
import React, {  } from 'react';
import { Header } from '../components/Header';

export default function Dashboard(){

    return (
        <Flex
            justify="center" 
            width={900} 
        >
            <Header />

        </Flex>
    )
}
