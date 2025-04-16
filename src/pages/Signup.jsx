import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Button } from '@material-tailwind/react'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'


const Signup = ({registerNewUser, isLoggedIn, signError, setSignError}) => {
  const [signName,setSignName] = useState("")
  const [signEmail,setSignEmail] = useState("")
  const [signPass,setSignPass] = useState("")
  const [signCpass,setSignCpass] = useState("")
  const navigate = useNavigate()

  isLoggedIn && navigate("/")

  const handleName = (e) => {
    setSignName(e.target.value)
  }
  const handleEmail = (e) => {
    setSignEmail(e.target.value)
  }
  const handlePass = (e) => {
    setSignPass(e.target.value)
  }
  const handleCpass = (e) => {
    setSignCpass(e.target.value)
  }

  const formValidation = () => {
    if (signName.length < 3) {
      setSignError("Name must be at least 3 characters")
    } else if (!signEmail.includes("@")) {
      setSignError("Email is not valid")
    } else if (signEmail.length < 5) {
      setSignError("Email must be at least 5 characters")
    } else if (signPass.length < 6) {
      setSignError("Password must be at least 6 characters")
    } else if (signPass !== signCpass) {
      setSignError("Password does not match")
    } else {
      setSignError("")
      return true
    }
  }
  
  const handleSignup = () => {
    if (formValidation()) {
      if (signName && signEmail && signPass && signCpass) {
        registerNewUser(signName, signEmail, signPass)
      } else {
        setSignError("Please fill all fields")
      }
    }
  }
  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-300 dark:bg-gray-900 w-full ">
        <Card className="w-80 m-9 bg-gray-700">
          <CardHeader
            variant="gradient"
            className="m-4 grid p-3 place-items-center bg-gradient-to-tr   dark:from-purple-700 dark:to-black from-red-900   to-black"
          >
            <Typography variant="h4" color="white" className="">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 text-white">
            {signError && (
              <Typography variant="small" color="red" className="mt-6 flex justify-center">
                {signError}
              </Typography>
            )}
            <Typography variant="h4" color="white" className="">
              Create an account
            </Typography>
            <Input onChange={handleName} type="text" label="Full Name" color="white" size="md" />
            <Input onChange={handleEmail} type="email" label="Email" color="white" size="md" />
            <Input onChange={handlePass} type="password" label="Password" color="white" size="md" />
            <Input onChange={handleCpass} type="password" label="Confirm Password" color="white" size="md" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button onClick={handleSignup} variant="gradient" fullWidth className="bg-gradient-to-tr   dark:from-purple-700 dark:to-black from-red-900   to-black">
              Sign Up
            </Button>
            <Typography variant="small" color="white" className="mt-6 flex justify-center">
              Already have an account?
              <Typography
                as={Link}
                to="/login"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold hover:text-red-500"
                >
                Log in
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Signup