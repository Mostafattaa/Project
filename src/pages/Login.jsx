import { useState } from 'react';
import {
  Card, CardHeader, CardBody, CardFooter,
  Typography, Input, Button
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const Login = ({ validateUser, loginError, setLoginError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email.length < 5 || !email.includes("@")) {
      setLoginError("Invalid email format");
    } else if (password.length < 6) {
      setLoginError("Password must be at least 6 characters");
    } else {
      setLoginError("");
      validateUser(email, password);
    }
  };

  return (
    <div
      className=" relative flex justify-center items-center h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `url('/288727.jpg')`, // Replace with your preferred movie image
      }}
    >
      {/* Semi-transparent overlay for better contrast */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Login Card */}
      <div className="relative z-10">
        <Card className="w-80 md:w-96 bg-gray-700 bg-opacity-40 backdrop-blur-md">
          <CardHeader
            variant="gradient"
            className="m-4 grid p-3 place-items-center bg-gradient-to-tr dark:from-purple-700 dark:to-black from-red-900 to-black"
          >
            <Typography variant="h4" color="white">
              Log In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 text-white">
            {loginError && (
              <Typography variant="small" color="red" className="text-center">
                {loginError}
              </Typography>
            )}
            <Input onChange={(e) => setEmail(e.target.value)} type="email" label="Email" color="white" />
            <Input onChange={(e) => setPassword(e.target.value)} type="password" label="Password" color="white" />
          </CardBody>
          <CardFooter>
            <Button
              onClick={handleLogin}
              variant="gradient"
              fullWidth
              className="bg-gradient-to-tr dark:from-purple-700 dark:to-black from-red-900 to-black"
            >
              Log In
            </Button>
            <Typography variant="small" color="white" className="mt-4 text-center">
              Don’t have an account?
              <Typography
                as={Link}
                to="/sign-up"
                variant="small"
                color="blue"
                className="ml-1 font-bold hover:text-red-500 inline-block"
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
