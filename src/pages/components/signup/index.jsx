import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CssBaseline,
  Avatar,
  TextField,
  Button,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";

import { notifyError, notifySuccess } from "../../../utils/toast";
import { useRouter } from "next/router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import "react-international-phone/style.css";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRF-TOKEN"; // Set header name if needed
axios.defaults.withCredentials = true;
const Signup = () => {
  const [formData, setFormData] = useState({});
  const [phone, setPhone] = useState("");
  const [response, setResponse] = useState(null);

  const router = useRouter();

  const schema = yup.object().shape({
    name: yup.string().label("Name").required("Name is required"),
    email: yup
      .string()
      .label("Email")
      .required("Email is required")
      .email("Invalid email address")
      .matches(/^\S+@\S+\.\S{2,}$/i, "Invalid Email Format"),
    password: yup.string().label("Password").required("Password is required"),
    // phone: yup
    //   .string()
    //   .required("Phone is required")
    //   .label("Phone")
    //   .min(10, "Phone must be at least 10 characters"),
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const onSubmit = async (data, e) => {
    if (e.key === "Enter") {
      setFormData(formData);
    }

    const data2 = {
      name: data?.name,
      email: data?.email,
      password: data?.password,
      phone: data?.phone || "",
    };

    try {
      const response = await axios.post(
        "https://api.circlescrm.net/api/register",
        data2,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("responseresponse", response);
      if (response?.data?.user) {
        const responseData = response.data;

        notifySuccess("Successfully Signup");
        setResponse(responseData);
        router.push("/");
      } else if (response?.data?.errors) {
        notifyError(response?.data?.message);
      }
    } catch (error) {
      notifyError(error?.response?.data?.message);

      console.error("Error registering user:", error);
    }
  };
  const validatePhoneNumber = (value) => {
    const phoneRegex = /^\+(\d{1,4})\s\d+$/;
    if (!phoneRegex.test(value)) {
      return "Invalid phone number format. Please use +country code followed by digits.";
    }

    const phoneNumberLength = value.length;
    if (phoneNumberLength < 10 || phoneNumberLength > 16) {
      // Adjust length range as needed
      return "Phone number must be between 10 and 16 characters.";
    }
  };

  const handleChangePhone = (event) => {
    const trimmedValue = event.target.value
      .trimStart()
      .trimEnd()
      .replace(/ +(?= )/g, "");

    setPhone(trimmedValue);
    setValue("phone", trimmedValue);

    if (trimmedValue !== "") {
      clearErrors("phone");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <form> */}
          <Box sx={{ mt: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  id="name"
                  fullWidth
                  autoFocus
                  label="Name"
                  margin="normal"
                  {...register("name")}
                />
                {errors?.name && (
                  <Typography color={"red"} fontSize={"13px"}>
                    Name is required
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="email"
                  id="email"
                  type="email"
                  margin="normal"
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  {...register("email")}
                />
                {errors.email && (
                  <Typography color={"red"} fontSize={"13px"}>
                    Email is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password")}
                  name="password"
                  id="password"
                  type="password"
                  margin="normal"
                  fullWidth
                  label="Password"
                  autoComplete="current-password"
                  // onChange={handleChange}
                  onChangeCapture={(e) => {
                    const trimmedValue = e.currentTarget.value
                      ?.trimStart()
                      ?.trimEnd()
                      ?.replace(/ +(?= )/g, "");

                    if (trimmedValue !== undefined) {
                      setValue("password", trimmedValue);
                    }
                  }}
                />
                {errors?.password && (
                  <Typography color={"red"} fontSize={"13px"}>
                    Password is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("phone", {
                    required: true,
                    validate: validatePhoneNumber,
                  })}
                  name="phone"
                  id="phone"
                  type="number"
                  margin="normal"
                  fullWidth
                  label="Phone number"
                  autoComplete="off"
                  value={phone}
                  onChange={handleChangePhone}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
                {/* <PhoneInput
                  name="phone"
                  id="phone"
                  defaultCountry="ua"
                  value={getValues("phone") || ""}
                  onChange={(phone) => {
                    setValue("phone", phone);
                    setPhone(phone);
                    const phoneNumberRegex = /^\+(\d{1,4})\s(.*)$/;

                    const matchCountry = phone.match(phoneNumberRegex);

                    let countryCode;
                    let remainingNumber;

                    if (matchCountry) {
                      countryCode = matchCountry[1];
                      remainingNumber = matchCountry[2];
                    } else {
                      console.log("No country code found.");
                    }

                    remainingNumber?.length > 1 && remainingNumber?.length < 6
                      ? setError("phone", {
                          message: "Phone must be at least 10 characters",
                        })
                      : clearErrors("phone");
                  }}
                  forceDialCode={true}
                  placeholder={"Enter your phone here"}
                  {...register("phone")}
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.27)",
                    "--react-international-phone-border-radius": 0,
                    "--react-international-phone-border-color": "none",
                    "--react-international-phone-dropdown-item-background-color":
                      "white",
                    "--react-international-phone-background-color":
                      "transparent",
                    "--react-international-phone-text-color": "black",
                    "--react-international-phone-selected-dropdown-item-background-color":
                      "transparent",
                    "--react-international-phone-selected-dropdown-zindex": "1",
                    "--react-international-phone-height": "55px",
                    "--react-international-phone-width": "100%",
                  }}
                /> */}

                {errors?.phone && (
                  <Typography color={"red"} fontSize={"13px"}>
                    {errors.phone.message}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onKeyDown={(e) => onSubmit(getValues, e)}
              disabled={Object.keys(errors).length > 0 ? true : false}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Already have an account ?{"   "}
                  <span style={{ color: "blue" }}>{"Sign in"}</span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
