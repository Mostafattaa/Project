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

const Login = () => {
  return (
    <div className="flex justify-center items-center  bg-cyan-100 dark:bg-gray-900 w-full ">
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
        <Input label="Email" color="white" size="md" />
        <Input label="Password" color="white" size="md" />
        <div className="-ml-2.5 text-white">
          <Checkbox label="Remember Me" />
        </div>
      </CardBody>
      <CardFooter className="pt-0" >
        <Button variant="gradient" fullWidth  className="bg-gradient-to-tr   from-blue-900   to-black">
          Log In
        </Button>
        <Typography variant="small" color="white" className="mt-6 flex justify-center">
          Don&apos;t have an account?
          <Typography
            as="a"
            href="#signup"
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