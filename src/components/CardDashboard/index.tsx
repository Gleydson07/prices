import { Box, Flex, Icon, Link, LinkProps, Text } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { IconType } from 'react-icons/lib';

interface ICardDashboard  extends LinkProps{
    iconCard: IconType;
    title: string;
}

export function CardDashboard({iconCard, title, ...rest }:ICardDashboard){
    return (
        <Link
            bgColor="gray.800"
            border="1px solid"
            borderColor="gray.700"
            borderRadius="4"
            _hover={{bgColor: "gray.900", border:"none", borderColor:"gray.900"}}
            {...rest}
        >
            <Flex
                flexDir="column"
                borderRadius="4"
                minHeight="150px"
                align="center"
                justify="center"
                p="4"
            >
                <Icon
                    fontSize="50px"
                    my="2"
                    mx="auto"
                    fontWeight="bold"
                    as={iconCard}
                />

                <Text 
                    textAlign="center" 
                    fontWeight="bold"
                    textTransform="uppercase"
                    mt="2"
                >
                    {title}
                </Text>
            </Flex>
        </Link>
        
    )
}