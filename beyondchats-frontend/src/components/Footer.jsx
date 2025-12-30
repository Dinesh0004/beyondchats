import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gray-100 mt-16"
    >
      <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BeyondChats · AI-Enhanced Articles  
      </div>
    </motion.footer>
  );
}
