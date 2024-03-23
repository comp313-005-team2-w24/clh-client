import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import styled from "styled-components";
import {
    Alert,
    Button,
    ButtonContainer,
    FormContainer,
    FormTitle,
} from "../../components/Form/formStyle.styled";
const PaymentFormContainer = styled(FormContainer)`
    margin: 1rem;
`;
const PaymentButtonContainer = styled(ButtonContainer)`
    margin-top: 1rem;
`
const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/success`,
            },
        });
        if (error.message) {
            setErrorMessage(error.message);
        }
    };
    return (
        <PaymentFormContainer onSubmit={handleSubmit}>
            <FormTitle>Checkout</FormTitle>
            {errorMessage && <Alert>{errorMessage}</Alert>}
            <PaymentElement options={{}}/>
            <PaymentButtonContainer>
                <Button type="submit">Checkout</Button>
            </PaymentButtonContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;
