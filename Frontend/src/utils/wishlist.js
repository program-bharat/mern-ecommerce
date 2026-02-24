// Get wishlist from localStorage
export const getWishlist = () => {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
};

// Add or remove product from wishlist
export const toggleWishlist = (productId) => {
    let wishlist = getWishlist();
    // check if already exists
    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId); // remove
    } else {
        wishlist.push(productId); // add
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

// check if product is in wishlist
export const isInWishlist = (productId) => {
    const wishlist = getWishlist();
    return wishlist.includes(productId);
};