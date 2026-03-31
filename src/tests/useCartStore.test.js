import { useCartStore } from "@/store/useCartStore";

jest.mock("@/lib/toast", () => ({
  showToast: {
    success: jest.fn(),
    remove: jest.fn(),
  },
}));

describe("useCartStore", () => {
  beforeEach(() => {
    useCartStore.setState({ cartItems: [] });
  });

  test("cart is empty at the start", () => {
    const { cartItems } = useCartStore.getState();
    expect(cartItems).toEqual([]);
  });

  test("add a new item to cart", () => {
    useCartStore.getState().addToCart(1, "Apple");
    const { cartItems } = useCartStore.getState();
    expect(cartItems).toHaveLength(1);
    expect(cartItems[0]).toEqual({ id: 1, quantity: 1 });
  });

  test("adding the same item again increases quantity", () => {
    useCartStore.getState().addToCart(1, "Apple");
    useCartStore.getState().addToCart(1, "Apple");
    const { cartItems } = useCartStore.getState();
    expect(cartItems[0].quantity).toBe(2);
  });

  test("remove an item from cart", () => {
    useCartStore.getState().addToCart(1, "Apple");
    useCartStore.getState().removeFromCart(1, "Apple");
    const { cartItems } = useCartStore.getState();
    expect(cartItems).toHaveLength(0);
  });

  test("clear cart removes all items", () => {
    useCartStore.getState().addToCart(1, "Apple");
    useCartStore.getState().addToCart(2, "Banana");
    useCartStore.getState().clearCart();
    const { cartItems } = useCartStore.getState();
    expect(cartItems).toHaveLength(0);
  });

  test("getCartCount returns total quantity of all items", () => {
    useCartStore.getState().addToCart(1, "Apple", 2);
    useCartStore.getState().addToCart(2, "Banana", 3);
    const count = useCartStore.getState().getCartCount();
    expect(count).toBe(5);
  });
});
