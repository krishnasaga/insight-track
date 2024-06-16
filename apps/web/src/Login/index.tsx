import React from 'react';
import { Box, Button, Checkbox, Container, Flex, Heading, Input, Link, Stack, Text, VStack } from '@chakra-ui/react';
import { FaGithub, FaGoogle, FaMicrosoft, FaApple, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import loginImage from './login.webp';

const LoginPage = () => {
  return (
    <Flex
      h="100vh"
      alignItems="center"
      justifyContent="center"
      background="linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)"
    >
      <Container maxW="container.lg" boxShadow="xl" p={0} bg="rgba(255, 255, 255, 0.8)" borderRadius="md">
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Box p={8} flex={1} backgroundImage={loginImage} bgSize={'cover'} bgPos={'center'}>
            
          </Box>
          <Box p={8} flex={1} bg="gray.100">
            <VStack align="flex-start" spacing={6}>
              <Heading as="h3">Log In</Heading>
              <Input placeholder="Email Address" />
              <Input placeholder="Password" type="password" />
              <Checkbox>Remember Me</Checkbox>
              <Button colorScheme="orange" w="full">Log In Now</Button>
              <Link alignSelf="flex-start">Lost your password?</Link>
              <Text fontSize="sm" textAlign="center" w="full">
                By clicking on "Log In Now" you agree to our <Link>Terms of Service</Link> and <Link>Privacy Policy</Link>.
              </Text>
              <Stack direction="row" spacing={4} justify="center" w="full">
                <Button leftIcon={<FaGoogle />} colorScheme="red" onClick={() => alert('Log In with Google')}>Google</Button>
                <Button leftIcon={<FaGithub />} colorScheme="gray" onClick={() => alert('Log In with GitHub')}>GitHub</Button>
                <Button leftIcon={<FaMicrosoft />} colorScheme="blue" onClick={() => alert('Log In with Microsoft')}>Microsoft</Button>
                <Button leftIcon={<FaApple />} colorScheme="blackAlpha" onClick={() => alert('Log In with Apple ID')}>Apple</Button>
              </Stack>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
};

export default LoginPage;
