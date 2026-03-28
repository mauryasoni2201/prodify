import { create } from "zustand";
import { persist } from "zustand/middleware";
import { showToast } from "@/lib/toast";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (id, title, quantity = 1) => {
        const cartItems = get().cartItems;
        const exists = cartItems.find((item) => item.id === id);
        if (exists) {
          set({
            cartItems: cartItems.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + quantity } : item
            ),
          });
          showToast.success(`Updated ${title} quantity in cart!`);
        } else {
          set({ cartItems: [...cartItems, { id, quantity }] });
          showToast.success(`${title} added to cart!`);
        }
      },
      removeFromCart: (id, title) => {
        set({ cartItems: get().cartItems.filter((item) => item.id !== id) });
        if (title) showToast.remove(`${title} removed from cart.`);
      },
      updateCartQuantity: (id, quantity) => {
        if (quantity < 1) return;
        set({
          cartItems: get().cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
        });
      },
      clearCart: () => {
        set({ cartItems: [] });
        showToast.remove("Cart cleared.");
      },
      getCartCount: () => get().cartItems.reduce((acc, item) => acc + item.quantity, 0),
    }),
    {
      name: "prodify-cart-storage",
    }
  )
);
