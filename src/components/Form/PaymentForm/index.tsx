import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import {PaymentElement} from '@stripe/react-stripe-js';

const pbKey = import.meta.env.VITE_STRIPE_PUBKEY as string;

const stripePromise = loadStripe(pbKey);

const CheckoutForm = () => {
    return (
        <form>
            <PaymentElement/>
            <button>Submit</button>
        </form>
    );
};

const PaymentForm = () => {
    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
    };

    return <>
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm/>
        </Elements>
    </>
}

export default PaymentForm;