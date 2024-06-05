import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import axios from "axios";

export const OrderTotal = () => {
    const [orderResponse, setOrderResponse] = useState(null);
    const accessToken = window.token; // Assuming this is set correctly
    const user = window.customer; // Assuming this is set correctly

    let token = accessToken.replace(/^"(.*)"$/, '$1');

    console.log(user);

    useEffect(() => {
        const fetchOrderData = async () => {
            const authorisation = "Bearer " + token
            //const authorisation2 =  `Bearer ${accessToken}`


            console.log("Order ID:", user);

            if (!accessToken || !user) {
                console.error("Missing token or orderId");
                return;
            }

            try {
                const response = await axios.post(
                    'http://localhost:9001/api/ping', {user} ,
                    {
                        headers: {
                            Authorization: authorisation,
                            "Content-Type": "application/json"
                        }
                    }
                );
                console.log("Response data:", response.data);
                setOrderResponse(JSON.parse(response.data));
            } catch (error) {
                console.error('Error placing order:', error);
                if (error.response) {
                    console.error('Error response:', error.response);
                }
            }
        };

        fetchOrderData();
    }, [token, user]);

    return (
        <div style={{borderStyle: "solid", borderWidth: 1, borderRadius: 0.5, padding: 10, maxWidth: 350, marginTop: 5}} >
            <h3>Order Bill from SPA: <span>{orderResponse} Dhs</span> </h3>


        </div>
    );
};



{/*
    export default

    function App() {
        return (
            <BrowserRouter>

                <div>hello</div>
                <Link to="/api/orderConfirmation">here</Link>

                <Routes>
                    <Route path="/api/orderConfirmation" element={<OrderTotal/>}/>
                </Routes>


            </BrowserRouter>
        );
    }
*/}

