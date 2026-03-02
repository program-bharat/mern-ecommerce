import styled from "styled-components"
import AOS from "aos";
import { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FiMenu, FiSearch, FiUser, FiHeart, FiX, FiShoppingCart, FiTruck } from "react-icons/fi";
import { getCartCount } from "../utils/cart";
const NavBar = () => {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const [user, setUser] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();
    const profileRef = useRef(null);
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };
    // AOS animation
    useEffect(() => {
        AOS.init({
            duration: 600,
            once: true,
            easing: "ease-in-out",
        });
    }, []);

    useEffect(() => {
        // initial count
        setCartCount(getCartCount());
        const updateCart = () => {
            setCartCount(getCartCount());
        };
        window.addEventListener("cartUpdated", updateCart);
        return () => {
            window.removeEventListener("cartUpdated", updateCart);
        };
    }, [location]);

    useEffect(() => {
        setIsProfileOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Profile data
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    }, [location]);
    // Edit Profile
    const handleEditProfile = () => {
        setIsProfileOpen(false);
        // Role-based navigation
        if (user.role === "seller") {
            navigate("/seller/profile");
        } else {
            navigate("/edit-profile");
        }
    };
    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsProfileOpen(false);
        navigate("/");
    };
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);
    return (
        <>
            <Nav>
                <LeftSection data-aos="fade-down" onClick={toggleMenu}><FiMenu size={22} /></LeftSection>
                <Logo data-aos="fade-down"><Link to={"/"} style={{ textDecoration: "none", color: "black" }}>BHaRaT</Link ></Logo>
                <RightSection data-aos="fade-down">
                    <SearchContainer>
                        <FiSearch size={22} />
                        <SearchInput
                            type="text"
                            placeholder='Search " BaggyFit"'
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                    </SearchContainer>
                    <ProfileWrapper ref={profileRef}>
                        <IconWrapper onClick={toggleProfile}>
                            <FiUser size={22} />
                        </IconWrapper>
                        {isProfileOpen && (
                            <ProfileDropdown>
                                {user ? (
                                    <>
                                        <DropdownItem style={{ fontWeight: "600", cursor: "default" }}>
                                            Hi, {user.name}
                                        </DropdownItem>

                                        <DropdownItem onClick={handleEditProfile}>
                                            Edit Profile
                                        </DropdownItem>

                                        <DropdownItem onClick={handleLogout}>
                                            Logout
                                        </DropdownItem>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            style={{ textDecoration: "none", color: "black" }}
                                        >
                                            <DropdownItem>Login</DropdownItem>
                                        </Link>

                                        <Link
                                            to="/register"
                                            style={{ textDecoration: "none", color: "black" }}
                                        >
                                            <DropdownItem>Register</DropdownItem>
                                        </Link>
                                    </>
                                )}
                            </ProfileDropdown>
                        )}
                    </ProfileWrapper>
                    {user?.role === "buyer" && (
                        <IconWrapper onClick={() => navigate("/wishlist")}>
                            <FiHeart size={22} />
                        </IconWrapper>
                    )}
                    {user?.role === "buyer" && (
                        <IconWrapper onClick={() => navigate("/orders")}>
                            <FiTruck size={22} />
                        </IconWrapper>
                    )}
                    {user?.role === "buyer" && (
                        <CartWrapper onClick={() => navigate("/cart")}>
                            <FiShoppingCart size={22} />
                            {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
                        </CartWrapper>
                    )}
                </RightSection>
                {/* SideBar */}
                <SideBar $isOpen={isOpen}>
                    <CloseButton>
                        <FiX size={22} onClick={toggleMenu} style={{ cursor: "pointer" }} />
                    </CloseButton>
                    {user?.role === "buyer" && (
                        <>
                            <MenuHeading>Shop</MenuHeading>
                            <MenuItem onClick={() => navigate("/")}>Shop All</MenuItem>
                            <MenuItem onClick={() => navigate("/category/jackets")}>Jackets</MenuItem>
                            <MenuItem onClick={() => navigate("/category/trousers")}>Trousers</MenuItem>
                            <MenuItem onClick={() => navigate("/category/shirts")}>Shirts</MenuItem>
                            <MenuItem onClick={() => navigate("/category/jeans")}>Jeans</MenuItem>
                            <MenuItem onClick={() => navigate("/category/polos")}>Polos</MenuItem>
                            <MenuItem onClick={() => navigate("/category/cargos")}>Cargos</MenuItem>
                            <MenuItem onClick={() => navigate("/category/overshirts")}>Overshirts</MenuItem>
                            <MenuItem onClick={() => navigate("/category/shoes")}>Shoes</MenuItem>
                            <MenuItem onClick={() => navigate("/category/sunglasses")}>Sunglasses</MenuItem>
                            <MenuItem onClick={() => navigate("/category/bags")}>Bags</MenuItem>
                            <MenuDivider />
                            <MenuHeading>Support</MenuHeading>
                            <MenuItem onClick={() => navigate("/contact")}>Contact Us</MenuItem>
                            <MenuItem onClick={() => navigate("/about")}>About Us</MenuItem>
                        </>
                    )}
                    {user?.role === "seller" && (
                        <>
                            <MenuHeading>Seller Panel</MenuHeading>
                            <MenuItem onClick={() => navigate("/seller/dashboard")}>
                                Dashboard
                            </MenuItem>
                            <MenuItem onClick={() => navigate("/seller/addproducts")}>
                                Add Product
                            </MenuItem>
                            <MenuItem onClick={() => navigate("/seller/products")}>
                                My Products
                            </MenuItem>
                            <MenuItem onClick={() => navigate("/seller/orders")}>
                                Orders
                            </MenuItem>
                            <MenuItem onClick={() => navigate("/seller/profile")}>
                                Profile
                            </MenuItem>
                        </>
                    )}
                    {!user && (
                        <>
                            <MenuHeading>Explore</MenuHeading>
                            <MenuItem onClick={() => navigate("/contact")}>Contact</MenuItem>
                            <MenuItem onClick={() => navigate("/about")}>About</MenuItem>
                            <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
                        </>
                    )}
                </SideBar>
            </Nav >
        </>
    )
}

export default NavBar;

// Styled Components
const Nav = styled.nav`
    width: 100%;
    height: 70px;
    background-color: #f3f7fa;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    /* left: 0; */
    z-index: 100;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const LeftSection = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const Logo = styled.h1`
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 4px;
    padding-left: 260px;
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
`;
const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    background: white;
    height: 30px;
    padding: 6px 12px;
    border: 1px solid black;
    /* border-radius: 4px; */
    gap: 8px;
`;

const SearchInput = styled.input`
    border: none;
    outline: none;
    font-size: 14px;
    width: 180px;
`;

const IconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const SideBar = styled.div`
    position: fixed;
    top: 0;
    left: ${({ $isOpen }) => ($isOpen ? "0" : "-300px")};
    width: 200px;
    height: 100vh;
    background: white;
    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
    padding: 30px;
    transition: left 0.3s ease-in-out;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
const CloseButton = styled.div`
    align-self: flex-start;
    cursor: pointer;
    margin-bottom: 30px;
`;
const MenuItem = styled.div`
    font-size: 18px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        color: gray;
    }
`;

const ProfileWrapper = styled.div`
    position: relative;
`;
const ProfileDropdown = styled.div`
    position: absolute;
    top: 50px;
    right: 0px;
    width: 150px;
    background: white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    border-radius: 4px;
    padding: 10px 0;
    transition: opacity 0.2s ease, transform 0.2s ease;
`;
const DropdownItem = styled.div`
    padding: 10px 15px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
        background: #f5f5f5;
    }
`;

const CartWrapper = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const CartBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -10px;
  background: red;
  color: white;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 50%;
  font-weight: 600;
`;

const MenuHeading = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: gray;
    margin-top: 10px;
    text-transform: uppercase;
`;

const MenuDivider = styled.div`
    height: 1px;
    background: #eee;
    margin: 10px 0;
`;