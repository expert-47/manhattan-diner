// import "@/styles/globals.css";
import "../styles/globals.css";
import { createNextApiHandler } from "next";
import { NextApiRequest, NextApiResponse } from "next";
import csurf from "csurf";
import { ThemeProvider } from "@mui/material";
import theme from "../styles/theme";
import { ToastContainer } from "react-toastify";
import { useHead, useEffect } from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <useHead>
        {typeof window !== "undefined" && (
          <meta name="csrf-token" content={window.csrfToken} key="csrf-token" />
        )}
      </useHead>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}
const csrfProtection = csurf({ cookie: true });

export const config = {
  api: {
    bodyParser: false,
  },
};
