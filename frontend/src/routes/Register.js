import { VStack, Heading, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../context/useAuth"


const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [Cpassword, setCPassword] = useState('')
    const { register_user } = useAuth();

    const handle_register = () => {
        register_user(username, email, password, Cpassword)
    }
    return (
        <VStack>
            <Heading> Register User Page</Heading>
            <FormControl>
                <FormLabel>Username</FormLabel>
                <Input type='text' onChange={(e) => setUsername(e.target.value)} value={username}/>
            </FormControl>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
            </FormControl>
            <FormControl>
                <FormLabel>Comfirm Password</FormLabel>
                <Input type='password' onChange={(e) => setCPassword(e.target.value)} value={Cpassword}/>
            </FormControl>
            <Button onClick={handle_register}> Submit </Button>
            <p>already have an account? <a href="/login">login</a></p>
        </VStack>
    )
}

export default Register