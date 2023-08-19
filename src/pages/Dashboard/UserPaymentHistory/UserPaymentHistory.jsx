import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';


const UserPaymentHistory = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [paymentHistory, setPaymentHistory] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/payments/history?email=${user.email}`)
                .then(res => {
                    setPaymentHistory(res.data);
                })
                .catch(error => {
                    console.error('Error fetching payment history:', error);
                });
        }
    }, [user?.email, axiosSecure]);

    return (
        <div>
            <h2 className='text-3xl font-semibold my-4 text-center'>Your Total Transaction is {paymentHistory.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-2xl font-semibold">#</th>
                            <th className="text-2xl font-semibold">Transaction ID</th>
                            <th className="text-2xl font-semibold">Email</th>
                            <th className="text-2xl font-semibold">Price</th>
                            <th className="text-2xl font-semibold">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.map((payment, index) => <tr key={payment._id}>
                            <th>{index + 1}</th>
                            <td>{payment.transactionId}</td>
                            <td>{payment.email}</td>
                            <td>${payment.price}</td>
                            <td>{payment.date}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default UserPaymentHistory;