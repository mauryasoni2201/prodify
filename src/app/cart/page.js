"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useCartStore } from "@/store/useCartStore";
import { getProductById } from "@/apis/products/product.api";
import { ShopLoader, ShopError } from "@/components/shop/ProductShopState";
import PageLayout from "@/components/common/PageLayout";
import Link from "next/link";
import Image from "next/image";
import SimpleEmptyState from "@/components/common/SimpleEmptyState";

export default function CartPage() {
  const { cartItems, updateCartQuantity, removeFromCart, clearCart } = useCartStore();
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cartItemIds = useMemo(
    () => cartItems.map((item) => item.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartItems.map((item) => item.id).join(",")]
  );

  const fetchProductsDetails = useCallback(async () => {
    if (cartItemIds.length === 0) {
      setProductsData([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const promises = cartItemIds.map(async (id) => {
        try {
          return await getProductById(id);
        } catch (err) {
          console.error(`Failed to fetch cart item ${id}:`, err);
          return null;
        }
      });
      const results = await Promise.all(promises);
      const validProducts = results.filter(Boolean);
      setProductsData(validProducts);
    } catch (err) {
      setError("Failed to synchronize your cart items.");
    } finally {
      setLoading(false);
    }
  }, [cartItemIds]);

  useEffect(() => {
    fetchProductsDetails();
  }, [fetchProductsDetails]);

  const mergedCart = useMemo(() => {
    return cartItems
      .map((item) => {
        const details = productsData.find((p) => p.id === item.id);
        return details ? { ...details, quantity: item.quantity } : null;
      })
      .filter(Boolean);
  }, [cartItems, productsData]);

  const subtotal = useMemo(() => {
    return mergedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [mergedCart]);

  const tax = subtotal * 0.1;
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + tax + shipping;

  if (loading)
    return (
      <div className="py-20" suppressHydrationWarning>
        <ShopLoader />
      </div>
    );
  if (error && mergedCart.length === 0)
    return (
      <div className="container py-20" suppressHydrationWarning>
        <ShopError error={error} onRetry={fetchProductsDetails} />
      </div>
    );

  return (
    <PageLayout breadcrumbItems={[{ label: "Shopping Bag" }]}>
      {mergedCart.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12" suppressHydrationWarning>
          <div className="xl:col-span-8">
            <div
              className="flex items-center justify-between border-b border-zinc-100 pb-6 mb-6"
              suppressHydrationWarning
            >
              <h1 className="text-3xl font-bold text-primary" suppressHydrationWarning>
                Shopping Cart ({mergedCart.length})
              </h1>
              <button
                onClick={clearCart}
                className="text-xs cursor-pointer font-bold text-red-500 hover:underline"
              >
                Clear Cart
              </button>
            </div>
            <div className="overflow-x-auto" suppressHydrationWarning>
              <table className="w-full text-left border-collapse" suppressHydrationWarning>
                <thead
                  className="border-b border-zinc-100 uppercase text-[10px] font-bold text-zinc-400"
                  suppressHydrationWarning
                >
                  <tr>
                    <th className="pb-4">Product</th>
                    <th className="pb-4 text-center">Qty</th>
                    <th className="pb-4 text-right">Price</th>
                    <th className="pb-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody suppressHydrationWarning>
                  {mergedCart.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-zinc-50 last:border-none"
                      suppressHydrationWarning
                    >
                      <td className="py-6 min-w-[300px]" suppressHydrationWarning>
                        <div className="flex items-center gap-4" suppressHydrationWarning>
                          <div
                            className="relative w-16 h-16 bg-zinc-50 rounded-lg p-2 border border-zinc-100"
                            suppressHydrationWarning
                          >
                            <Image
                              src={item.thumbnail}
                              alt={item.title}
                              fill
                              sizes="64px"
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="flex flex-col" suppressHydrationWarning>
                            <Link
                              href={`/products/${item.id}`}
                              className="text-sm font-bold text-primary hover:text-secondary transition-colors mb-0.5"
                            >
                              {item.title}
                            </Link>
                            <span className="text-[10px] text-zinc-400 uppercase font-medium">
                              {item.category}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id, item.title)}
                              className="text-[10px] cursor-pointer text-red-500 font-bold hover:underline mt-2 text-left"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-6" suppressHydrationWarning>
                        <div
                          className="flex items-center justify-center gap-3 border border-zinc-100 rounded-lg py-1 px-2 w-fit mx-auto"
                          suppressHydrationWarning
                        >
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity === 1}
                            className="text-lg px-1 text-primary hover:text-secondary cursor-pointer disabled:opacity-30"
                          >
                            –
                          </button>
                          <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="text-lg text-primary hover:text-secondary px-1 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-6 text-right" suppressHydrationWarning>
                        <span className="text-sm text-zinc-500">${item.price.toFixed(2)}</span>
                      </td>
                      <td className="py-6 text-right" suppressHydrationWarning>
                        <span className="text-sm font-bold text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="xl:col-span-4" suppressHydrationWarning>
            <div
              className="bg-zinc-50 border border-zinc-100 p-8 rounded-2xl sticky top-24"
              suppressHydrationWarning
            >
              <h2 className="text-xl font-bold mb-6 text-primary">Order Summary</h2>
              <div
                className="flex flex-col gap-4 border-b border-zinc-200 pb-6 mb-6 text-sm"
                suppressHydrationWarning
              >
                <div className="flex justify-between" suppressHydrationWarning>
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-bold text-primary">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between" suppressHydrationWarning>
                  <span className="text-zinc-500">Shipping</span>
                  <span className="font-bold text-emerald-600">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between" suppressHydrationWarning>
                  <span className="text-zinc-500">Taxes</span>
                  <span className="font-bold text-primary">${tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-8" suppressHydrationWarning>
                <span className="text-primary font-bold">Total</span>
                <span className="text-2xl font-black text-primary">${total.toFixed(2)}</span>
              </div>
              <button className="w-full btn primary !py-4 !text-sm !rounded-xl shadow-lg">
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <SimpleEmptyState
          icon="🛍️"
          title="Shopping Bag Empty"
          description="Your cart is waiting for some treasures. Explore our collections to find your first pick!"
          actionLabel="Start Discovery"
        />
      )}
    </PageLayout>
  );
}
