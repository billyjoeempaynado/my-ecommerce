"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const products = [
  { id: 1, src: "/images/jordan1.png", alt: "Product 1" },
  { id: 2, src: "/images/jordan2.png", alt: "Product 2" },
  { id: 3, src: "/images/jordan3.png", alt: "Product 3" },
];

const Banner = () => {
  // Variants for staggered animation
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div>
      {/* Sale Banner */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex justify-center items-center mt-20"
      >
        <Image
          src="/images/sale-banner.png"
          alt="Sale Banner"
          width={900}
          height={300}
          priority
        />
      </motion.section>

      {/* Bestsellers */}
      <motion.section
        className="py-16"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="w-[92%] mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">BestSellers Products</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p) => (
              <motion.div
                key={p.id}
                variants={item}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Banner;