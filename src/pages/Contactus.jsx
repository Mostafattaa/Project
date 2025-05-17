import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
  Button,
  Textarea,
} from "@material-tailwind/react";

const Contactus = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset(); 
  };

  return (
  <div
      className=" relative flex justify-center items-center h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `url('/288727.jpg')`, 
      }}
    >
      {/* Semi-transparent overlay for better contrast */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      <Card className="w-96 m-6 bg-gray-700 bg-opacity-40 backdrop-blur-md">
        <CardHeader
          variant="gradient"
          className="m-4 grid p-4 place-items-center bg-gradient-to-tr dark:from-purple-700 dark:to-black from-red-900 to-black"
        >
          <Typography variant="h4" color="white">
            Contact Us 🎬
          </Typography>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4 text-white">
            <Input
              type="text"
              name="name"
              label="Full Name"
              required
              color="white"
            />
            <Input
              type="email"
              name="email"
              label="Email"
              required
              color="white"
            />
            <Textarea
              name="message"
              label="Message"
              required
              color="white"
              rows={4}
            />
            {sent && (
              <Typography
                variant="small"
                color="green"
                className="text-center pt-1"
              >
                ✅ Your message has been sent!
              </Typography>
            )}
          </CardBody>

          <CardFooter className="pt-0">
            <Button
              type="submit"
              fullWidth
              className="bg-gradient-to-tr dark:from-purple-700 dark:to-black from-red-900 to-black"
            >
              Send Message
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Contactus;
