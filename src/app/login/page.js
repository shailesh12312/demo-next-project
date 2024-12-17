"use client";
import {Typography} from "@mui/material";
import {Card, SignInContainer} from "@/styled/login";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        Hello
        <Typography
          component="h1"
          variant="h4"
        >
          Sign in
        </Typography>
        <LoginForm/>
      </Card>
    </SignInContainer>
  );
}
