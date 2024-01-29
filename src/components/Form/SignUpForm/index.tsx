import { useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "../../../interfaces/User";
import { createUser, login } from "../../../services/apis/AuthenticationAPI";
import {
    Alert,
    Button,
    ButtonContainer,
    ErrorMessage,
    FormContainer,
    FormController,
    FormInput,
    FormLabel,
    FormLink,
    FormTitle,
    LinkContainer,
} from "../formStyle.styled";
import { useNavigate } from "react-router-dom";
interface SignUpUser extends User {
    confirmPassword: string;
}
const SignUpForm = () => {
    const [alert, setAlert] = useState("");
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { errors },
        getValues,
    } = useForm<SignUpUser>();
    const validateEmail = (email: string) => {
        const regex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return regex.test(email);
    };
    const onSubmit = async (data: User) => {
        const { success, error } = await createUser(data);
        if (success) {
            const { token, error } = await login({ ...data, username: "" });
            if (token) {
                localStorage.setItem("token", token);
                navigate("/");
            }
            if (error) {
                setAlert(error);
            }
        } else {
            setAlert(error || "System Error !!!");
        }
    };
    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <FormTitle>Create new account</FormTitle>
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
            <FormController>
                <FormLabel>Confirm Password</FormLabel>
                <FormInput
                    type="password"
                    data-testid="confirmPassword"
                    {...register("confirmPassword", {
                        required: "Confirm password is required",
                        validate: (value) => {
                            const { password } = getValues();
                            return (
                                password === value || "Both password must match"
                            );
                        },
                    })}
                />
                {errors.confirmPassword && (
                    <ErrorMessage>
                        {errors.confirmPassword.message}
                    </ErrorMessage>
                )}
            </FormController>
            <FormController>
                <FormLabel>Username</FormLabel>
                <FormInput
                    type="text"
                    data-testid="username"
                    {...register("username", {
                        required: "User name is required",
                        minLength: 3,
                    })}
                />
                {errors.username && (
                    <ErrorMessage>
                        {errors.username.type === "minLength"
                            ? "User name must be more than 3 characters"
                            : errors.username.message}
                    </ErrorMessage>
                )}
            </FormController>
            <LinkContainer>
                <span>
                    Already have an account ?{" "}
                    <FormLink to={"/auth/login"}>Login</FormLink>
                </span>
            </LinkContainer>
            <ButtonContainer>
                <Button type="submit" data-testid="signUp-btn">
                    Sign Up
                </Button>
            </ButtonContainer>
        </FormContainer>
    );
};

export default SignUpForm;
