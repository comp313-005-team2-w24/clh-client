import { useForm } from "react-hook-form";
import { User } from "../../../interfaces/User";
import {
    FormContainer,
    FormTitle,
    FormController,
    FormLabel,
    FormInput,
    LinkContainer,
    ButtonContainer,
    Button,
    ErrorMessage,
    Alert,
    FormLink,
} from "../formStyle.styled";
import { useState } from "react";
import { login } from "../../../services/apis/AuthenticationAPI";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
    const [alert, setAlert] = useState("");
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<User>();
    const navigate = useNavigate();
    const validateEmail = (email: string) => {
        const regex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return regex.test(email);
    };
    const onSubmit = async (data: User) => {
        const { token, error } = await login(data);
        if (token) {
            localStorage.setItem("token", token);
            navigate("/");
        } else {
            setAlert(error || "Please try again !");
        }
    };
    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <FormTitle>Login to CodeLitHub</FormTitle>
            {alert && <Alert data-testid="alert">{alert}</Alert>}
            <FormController>
                <FormLabel>Email</FormLabel>
                <FormInput
                    type="text"
                    data-testid="email"
                    {...register("email", {
                        required: "Email is required",
                        validate: (value) => {
                            return validateEmail(value) || "Invalid Email";
                        },
                    })}
                />
                {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
            </FormController>
            <FormController>
                <FormLabel>Password</FormLabel>
                <FormInput
                    type="password"
                    data-testid="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: 6,
                    })}
                />
                {errors.password && (
                    <ErrorMessage>
                        {errors.password.type === "minLength"
                            ? "Password must be at least 6 characters"
                            : errors.password.message}
                    </ErrorMessage>
                )}
            </FormController>
            <LinkContainer>
                <span>
                    Not registered ?{" "}
                    <FormLink to={"/auth/register"}>Create an account</FormLink>
                </span>
            </LinkContainer>
            <ButtonContainer>
                <Button type="submit" data-testid="login-btn">
                    Login
                </Button>
            </ButtonContainer>
        </FormContainer>
    );
};

export default LoginForm;
