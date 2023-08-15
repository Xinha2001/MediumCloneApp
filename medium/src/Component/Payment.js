import React from 'react';
import './Payment.css';
import { loadScript } from './utils.js'; 

const Payment = () => {
  const initializeRazorpay = async (planAmount) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Failed to load Razorpay. Please check your internet connection.');
      return;
    }
    
    const options = {
      key: 'rzp_test_TyMlIksISvdnnn', 
      amount: planAmount * 100,
      currency: 'USD',
      name: 'MEDIUM_CLONE_TEST',
      description: 'Payment for subscription',
      prefill: {
        name: 'Saurabh',
        email: 'saurabhsinha1420@gmail.com',
        contact: '9127231383'
      },
      notes: {
        address: 'Razorpay Corporate office'
      },
      theme: {
        color: '#3399cc'
      }
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const plans = [
    { title: 'Get grinding, 3 posts for $3', amount: 3 },
    { title: 'Roll on! 5 posts for $5', amount: 5 },
    { title: 'Legend! 10 posts for $10', amount: 10 }
  ];

  return (
    <div className="payment-container">
      {plans.map((plan, index) => (
        <div className="payment-card" key={index}>
          <h2 className="payment-card-title">{plan.title}</h2>
          <p className="payment-amount">${plan.amount}</p>
          <button className="pay-button" onClick={() => initializeRazorpay(plan.amount)}>
            Pay Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default Payment;