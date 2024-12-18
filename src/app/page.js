import {Card, SignInContainer} from "@/styled/login";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <h2 className="heading-2">
          Sign in
        </h2>
        <LoginForm/>
      </Card>
    </SignInContainer>
  );
}