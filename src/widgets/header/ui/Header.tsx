'use client';
import { Text, VStack } from '@chakra-ui/react';

export const Header = (): JSX.Element => {
  return (
    <VStack
      as={'header'}
      maxW={'1200px'}
      m={'0 auto'}
      bgColor={'red.100'}
      borderRadius={'4px'}
    >
      <Text as={'h2'} fontSize={'x-large'} fontWeight={'500'} color={'red.500'}>
        YouTube To Text
      </Text>
    </VStack>
  );
};
