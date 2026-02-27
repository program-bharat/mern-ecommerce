// user-wise cart key
const getCartKey = () => {
    try {
        const userStr = localStorage.getItem("user");
        if (!userStr) return "cart_guest";

        const user = JSON.parse(userStr);
        const userId = user?._id || user?.id;

        return userId ? `cart_${userId}` : "cart_guest";
    } catch {
        return "cart_guest";
    }
};

// get cart
export const getCart = () => {
    const key = getCartKey();
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

// add to cart
export const addToCart = (item) => {
    const key = getCartKey();
    let cart = getCart();
    // check if same product + size already exists
    const existingIndex = cart.findIndex(
        p => p.productId === item.productId && p.size === item.size
    );

    if (existingIndex !== -1) {
        cart[existingIndex].quantity += item.quantity;
    } else {
        cart.push(item);
    }
    localStorage.setItem(key, JSON.stringify(cart));
    // notify navbar
    window.dispatchEvent(new Event("cartUpdated"));
};

// get total cart count
export const getCartCount = () => {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
};