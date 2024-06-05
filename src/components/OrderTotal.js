import * as React from 'react';


import { useLocation } from 'react-router-dom';

 function OrderTotal() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get('orderId');
    const total = searchParams.get('total');

    return (
        <div>
            <h2>Order Confirmation</h2>
            {orderId && total ?
                (
                <div>
                    <p>Thank
                        jsx
                        Copier le code
                        <p>Thank you for your order! Your order ID is: {orderId}</p>
                        <p>Your order total is: ${total}</p>
                    </p>
                </div>
                ) : (
                <p>Loading...</p>
                )}
        </div>
    );
}
