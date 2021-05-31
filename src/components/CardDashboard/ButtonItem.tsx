import { Center, Icon, Link, LinkProps, Placement, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';

interface IButtonItem extends LinkProps{
    label: string;
    tooltipPosition: Placement;
    icon: IconType;
}

export function ButtonItem({label, tooltipPosition, icon, ...rest}: IButtonItem){
    return (
        <Link 
            width="100%"
            height="100%"
            bgColor="gray.700"
            fontSize="xl"
            borderRadius="4"
            _hover={{
                bgColor:"gray.600",
            }}
            {...rest}
        >
            <Center my="2">
                <Icon as={icon}/>
            </Center>
        </Link>
    )
}