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
} from "../formStyle";
import { useState } from "react";
import { login } from "../../../services/apis/AuthenticationAPI";
import { AxiosError } from "axios";
const LoginForm = () => {
    const [alert, setAlert] = useState("");
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<User>();
    const validateEmail = (email: string) => {
        const regex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return regex.test(email);
    };
    const onSubmit = async (data: User) => {
        try {
            const { token } = await login(data);
            localStorage.setItem("token", token);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 500) {
                    setAlert("Something went wrong with server");
                }
                if (error.response?.status === 401) {
                    const errorMessage = error.response.data.error as string;
                    setAlert(
                        errorMessage[0]
                            .toUpperCase()
                            .concat(errorMessage.slice(1))
                    );
                }
            }
        }
    };
    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <FormTitle>Login to CodeLitHub</FormTitle>
            {alert && <Alert>{alert}</Alert>}
            <FormController>
                <FormLabel>Email</FormLabel>
                <FormInput
                    type="text"
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
                <Button type="submit">Login</Button>
            </ButtonContainer>
        </FormContainer>
    );
};

export default LoginForm;
