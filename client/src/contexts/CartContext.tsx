import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  id: number;
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  image?: string;
}

interface Coupon {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  couponDiscount: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Mock coupon database
const AVAILABLE_COUPONS: Record<string, Coupon> = {
  SAVE10: {
    code: "SAVE10",
    discountType: "percentage",
    discountValue: 10,
  },
  WELCOME20: {
    code: "WELCOME20",
    discountType: "percentage",
    discountValue: 20,
  },
  FLAT500: {
    code: "FLAT500",
    discountType: "fixed",
    discountValue: 500,
  },
  SPECIAL15: {
    code: "SPECIAL15",
    discountType: "percentage",
    discountValue: 15,
  },
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const addToCart = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems;
      }
      return [...prevItems, item];
    });
  };

  const removeFromCart = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const upperCode = code.trim().toUpperCase();
    const coupon = AVAILABLE_COUPONS[upperCode];

    if (!coupon) {
      return { success: false, message: "Invalid coupon code" };
    }

    if (items.length === 0) {
      return { success: false, message: "Cart is empty" };
    }

    setAppliedCoupon(coupon);
    return { success: true, message: `Coupon ${coupon.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const itemCount = items.length;
  const total = items.reduce((sum, item) => sum + item.price, 0);

  // Calculate coupon discount
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "percentage") {
      couponDiscount = (total * appliedCoupon.discountValue) / 100;
    } else {
      couponDiscount = Math.min(appliedCoupon.discountValue, total);
    }
  }

  const finalTotal = Math.max(total - couponDiscount, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        itemCount,
        total,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        couponDiscount,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
