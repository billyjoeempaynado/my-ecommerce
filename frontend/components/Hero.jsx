"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="text-white py-10 md:py-20">
      <div className="container flex flex-col-reverse md:flex-row items-center justify-between w-[92%] mx-auto gap-8 md:px-15">

        {/* Left side: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-left max-w-full md:max-w-lg"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-snug">
            NEW SPORTS <br />
            <span className="text-2xl sm:text-3xl font-extrabold tracking-widest">
              COLLECTION
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-lg">
            Fresh arrivals for the new season
          </p>

          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-gray-600 text-white px-6 py-3 font-bold rounded hover:bg-gray-500 transition text-sm sm:text-base"
            >
              SHOP NOW
            </motion.button>
          </Link>
        </motion.div>

        {/* Right side: Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full sm:w-[400px] md:w-[600px] h-[200px] sm:h-[400px] md:h-[500px]"
        >
          <Image
            src="/images/jordan.png"
            alt="Hero Banner"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}