import { motion } from "framer-motion";
import Container from "../common/Container";
import Button from "../ui/Buttons";
import ProductPreview from "./ProductPreview";
import { LuArrowRight, LuSparkles } from "react-icons/lu";
import { Link } from "react-router-dom";



export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />
      </div>

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
          >
            <LuSparkles size={16} />
            Built for modern teams
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl md:text-7xl"
          >
            Run your business
            <span className="block text-blue-600">
              with clarity.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600"
          >
            Manage your workflow, customers, projects, and team from one
            powerful workspace built to keep your business moving.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link to="/signup">
              <Button className="flex items-center gap-2">
                Get Started
                <LuArrowRight size={18} />
              </Button>
            </Link>

            <a href="#features">
              <Button variant="secondary">
                View Features
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: "easeOut",
            }}
            className="relative mt-16"
          >
            {/* dashboard glow */}
            <div className="absolute inset-x-16 bottom-0 top-16 -z-10 rounded-full bg-blue-200/50 blur-3xl" />

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ProductPreview />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}