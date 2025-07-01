import { create } from 'zustand';
import type { RazorpayOptions, RazorpayResponse } from '@/types/razorpay';

interface RazorpayState {
  isScriptLoaded: boolean;
  isLoading: boolean;
  error: string | null;
  // Actions
  loadRazorpayScript: () => Promise<void>;
  createOrder: (amount: number) => Promise<{ orderId: string; amount: number }>;
  initiatePayment: (options: Omit<RazorpayOptions, 'key' | 'handler'>) => Promise<RazorpayResponse>;
  resetError: () => void;
}

export const useRazorpayStore = create<RazorpayState>((set, get) => ({
  isScriptLoaded: false,
  isLoading: false,
  error: null,

  loadRazorpayScript: async () => {
    if (get().isScriptLoaded) return;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      
      script.onload = () => {
        set({ isScriptLoaded: true });
        resolve();
      };
      
      script.onerror = () => {
        set({ error: 'Failed to load Razorpay script' });
        reject(new Error('Failed to load Razorpay script'));
      };

      document.body.appendChild(script);
    });
  },

  createOrder: async (amount: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/razorpay/donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error('Failed to create order');
      }

      return {
        orderId: data.order.id,
        amount: data.order.amount,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create order';
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  initiatePayment: async (options) => {
    const { isScriptLoaded } = get();
    
    if (!isScriptLoaded) {
      await get().loadRazorpayScript();
    }

    const apiKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!apiKey) {
      throw new Error('Razorpay API key not found');
    }

    return new Promise<RazorpayResponse>((resolve, reject) => {
      const razorpayOptions: RazorpayOptions = {
        ...options,
        key: apiKey,
        handler: (response: RazorpayResponse) => {
          resolve(response);
        },
      };

      const razorpay = new window.Razorpay(razorpayOptions);

      razorpay.on('payment.failed', (error: unknown) => {
        const errorMessage = (error as { description?: string })?.description || 'Payment failed';
        set({ error: errorMessage });
        reject(new Error(errorMessage));
      });

      razorpay.open();
    });
  },

  resetError: () => set({ error: null }),
}));
