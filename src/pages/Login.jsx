import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = ({validateUser, isLoggedIn, loginError, setLoginError}) => {
  const [tempEmail, setTempEmail] = useState("")
  const [tempPassword, setTempPassword] = useState("")
  const navigate = useNavigate()

  isLoggedIn && navigate("/")

  const handleEmail = (e) => {
    setTempEmail(e.target.value)
  }
  const handlePass = (e) => {
    setTempPassword(e.target.value)
  }
  const handleLogin = () => {
    if (tempEmail.length < 5) {
      setLoginError("Pleae enter a valid email")
    } else if (tempPassword.length < 6) {
      setLoginError("Please enter a valid password")
    } else {
      setLoginError("")
      validateUser(tempEmail, tempPassword)
    }
    
  }

  return (
    <div className="flex justify-center items-center min-h-[100%] bg-cyan-100 dark:bg-gray-900 w-full ">
      <Card className="w-80 m-9 bg-gray-700">
      <CardHeader
        variant="gradient"
        className="m-4 grid p-3 place-items-center bg-gradient-to-tr   from-blue-900   to-black"
      >
        <Typography variant="h4" color="white" className="">
          Log In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4 text-white">
        {loginError && (
                      <Typography variant="small" color="red" className="mt-6 flex justify-center">
                        {loginError}
                      </Typography>
                    )}
        <Input onChange={handleEmail} label="Email" type="email" color="white" size="md" />
        <Input onChange={handlePass} label="Password" type="password" color="white" size="md" />
      </CardBody>
      <CardFooter className="pt-0" >
        <Button variant="gradient" fullWidth  className="bg-gradient-to-tr   from-blue-900   to-black " onClick={handleLogin}>
          Log In
        </Button>
        <Typography variant="small" color="white" className="mt-6 flex justify-center">
          Don't have an account?
          <Typography
            as={Link}
            to="/sign-up"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold hover:text-blue-500"
          >
            Sign up
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Login

