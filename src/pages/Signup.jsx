import  { useState } from 'react';
import {
  Card, CardHeader, CardBody, CardFooter,
  Typography, Input, Button
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const Signup = ({ registerNewUser, signError, setSignError }) => {
  const [signName, setSignName] = useState("");
  const [signEmail, setSignEmail] = useState("");
  const [signPass, setSignPass] = useState("");
  const [signCpass, setSignCpass] = useState("");

  const handleSignup = () => {
    if (formValidation()) {
      registerNewUser(signName, signEmail, signPass);
    }
  };

  const formValidation = () => {
    if (signName.length < 3) {
      setSignError("Name must be at least 3 characters");
      return false;
    } else if (!signEmail.includes("@") || signEmail.length < 5) {
      setSignError("Email is not valid");
      return false;
    } else if (signPass.length < 6) {
      setSignError("Password must be at least 6 characters");
      return false;
    } else if (signPass !== signCpass) {
      setSignError("Passwords do not match");
      return false;
    } else {
      setSignError("");
      return true;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-300 dark:bg-gray-900 w-full">
      <Card className="w-80 m-9 bg-gray-700">
        <CardHeader
          variant="gradient"
          className="m-4 grid p-3 place-items-center bg-gradient-to-tr dark:from-purple-700 dark:to-black from-red-900 to-black"
        >
          <Typography variant="h4" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 text-white">
          {signError && (
            <Typography variant="small" color="red" className="mt-2 text-center">
              {signError}
            </Typography>
          )}
          <Input onChange={(e) => setSignName(e.target.value)} type="text" label="Full Name" color="white" />
          <Input onChange={(e) => setSignEmail(e.target.value)} type="email" label="Email" color="white" />
          <Input onChange={(e) => setSignPass(e.target.value)} type="password" label="Password" color="white" />
          <Input onChange={(e) => setSignCpass(e.target.value)} type="password" label="Confirm Password" color="white" />
        </CardBody>
        <CardFooter>
          <Button onClick={handleSignup} variant="gradient" fullWidth className="bg-gradient-to-tr dark:from-purple-700 dark:to-black from-red-900 to-black">
            Sign Up
          </Button>
          <Typography variant="small" color="white" className="mt-4 text-center">
            Already have an account?
            <Typography as={Link} to="/login" variant="small" color="blue-gray" className="ml-1 font-bold hover:text-red-500">
              Log in
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
