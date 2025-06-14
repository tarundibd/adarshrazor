import { useCallback } from 'react';
import { useRazorpayStore } from '@/store/razorpayStore';
import type { RazorpayResponse } from '@/types/razorpay';

interface UsePaymentProps {
  onSuccess?: (response: RazorpayResponse) => void;
  onError?: (error: Error) => void;
}

export const usePayment = ({ onSuccess, onError }: UsePaymentProps = {}) => {
  const { 
    initiatePayment, 
    createOrder, 
    isLoading, 
    error, 
    resetError 
  } = useRazorpayStore();

  const handlePayment = useCallback(async (
    amount: number,
    productName: string,
    description?: string
  ) => {
    try {
      // Create order first
      const { orderId, amount: orderAmount } = await createOrder(amount);

      // Initiate payment
      const response = await initiatePayment({
        amount: orderAmount,
        currency: "INR",
        name: "Your Store Name",
        description: description || `Payment for ${productName}`,
        order_id: orderId,
        prefill: {
          name: "Customer",
          email: "",
          contact: "",
        },
        theme: {
          color: "#3399cc",
        },
      });

      onSuccess?.(response);
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed';
      onError?.(new Error(errorMessage));
      throw error;
    }
  }, [createOrder, initiatePayment, onSuccess, onError]);

  return {
    handlePayment,
    isLoading,
    error,
    resetError,
  };
};
