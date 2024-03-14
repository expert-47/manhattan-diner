import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
import { Box } from "@mui/material";
import Dashboard from "./components/Dashboard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Box>
        <Dashboard />
      </Box>
    </>
  );
}
