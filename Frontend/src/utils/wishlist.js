// Generate unique key
const getWishlistKey = () => {
    try {
        const userStr = localStorage.getItem("user");
        if (!userStr) return "wishlist_guest";
        const user = JSON.parse(userStr);
        const userId = user?._id || user?.id;
        if (userId) {
            return `wishlist_${userId}`;
        }
        return "wishlist_guest";
    } catch (err) {
        return "wishlist_guest";
    }
};

// getWishList
export const getWishlist = () => {
    const key = getWishlistKey();
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

// toggleWishlist
export const toggleWishlist = (productId) => {
    const key = getWishlistKey();
    let wishlist = getWishlist();
    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
    } else {
        wishlist.push(productId);
    }
    localStorage.setItem(key, JSON.stringify(wishlist));
};

// check if product in wishlist
export const isInWishlist = (productId) => {
    const wishlist = getWishlist();
    return wishlist.includes(productId);
};