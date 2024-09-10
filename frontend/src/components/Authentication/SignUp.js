
import React, { useState } from 'react';
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { VStack } from "@chakra-ui/layout";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [pic, setPic] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dqbrebg9v");
      
      fetch("https://api.cloudinary.com/v1_1/dqbrebg9v/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("/api/user", { name, email, password, pic }, config);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>User name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm your password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;


/*
import React from 'react'
import { FormControl,FormLabel} from "@chakra-ui/form-control";
import {VStack} from "@chakra-ui/layout";
import {Input,InputGroup,InputRightElement} from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

const SignUp = () => {
    const [show, setShow] = useState(false);
    const [name,setName] = useState();
    const toast = useToast();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [confirmpassword,setConfirmpassword] = useState('');
    const [pic,setPic] = useState();
    const [loading,setLoading] = useState(false);
    const history = useHistory();

    const handleClick = () =>setShow(!show);


    const postDetails =(pics) =>{
      setLoading(true);
      if(pics === undefined){
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }  
      console.log(pics);
      if(pics.type === "image/jpeg" || pics.type === "image/png"){
        const data = new FormData();
        data.append("file",pics);
        data.append("upload_preset","chat-app");
        data.append("cloud_name","dqbrebg9v");
        fetch("https://api.cloudinary.com/v1_1/dqbrebg9v/image/upload",{
          method: "post",
          body : data,
        }).then((res)=> res.json())  
          .then(data =>{
            setPic(data.url.toString());
            console.log(data.secure_url.toString());
            setLoading(false);

        })
        .catch((err) =>{
          console.log(err);
          setLoading(false);
        });
        
      }else{
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;

      }


    };

    const submitHandler = async() =>{
      setLoading(true);
      if(!name || !email || !password || !confirmpassword){
        toast({
          title: "please fill all the fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }

      if(password !== confirmpassword){
        toast({
          title: "passwords do not match",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",

        });
        return;

      }
      console.log(name, email, password, pic);


      try{
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        
        
      const {data} = await axios.post("/api/user",{name,email,password,pic},config);
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "Success",
        duration: 5000,
        isClosable: true,
        position: "bottom",   
      });
      localStorage.setItem("userInfo",JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
      }catch(error){
        toast({
          title: "Error Occured",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    };
  
  return(<VStack spacing='5px'>
    <FormControl id="first-name" isRequired>
        <FormLabel>User name</FormLabel>
        <Input
        placeholder='Enter your name'
        onChange={(e)=>setName(e.target.value)}/>

    </FormControl>
    <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
        placeholder='Enter your email'
        onChange={(e)=>setEmail(e.target.value)}/>

    </FormControl>
    <FormControl id="password" >
        <FormLabel>password</FormLabel>
        <InputGroup>   
        <Input
        type= {show? "text":"password"}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide": "Show"}
        </Button>

        </InputRightElement>
        </InputGroup>

    </FormControl>
    <FormControl id="confirm-password" isRequired>
        <FormLabel>ConfirmPassword</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
    </FormControl>
    <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
        type = "file"
        p={.5}
        accept="image/*"
        onChange={(e) => postDetails(e.target.files[0])}
        />



    </FormControl>
    <Button
        colorScheme = "blue"
        width ="100%"
        style ={{marginTop: 15}}
        onClick ={submitHandler}
        isLoading = {loading}>
            Sign Up

    </Button>
  </VStack>
  );



 
};

export default SignUp;

*/
