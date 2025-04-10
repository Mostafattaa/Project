
import React from "react";

const Contactus = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <form className="w-full max-w-lg bg-gray-800 p-6 rounded-2xl shadow-xl space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Full Name</label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white outline-none"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white outline-none"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Message</label>
          <textarea
            rows="5"
            placeholder="Your message"
            className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white outline-none"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-xl font-semibold transition duration-200"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contactus;
