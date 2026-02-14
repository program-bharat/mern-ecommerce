import styled from "styled-components"
import { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FiMenu, FiSearch, FiUser, FiHeart, FiX } from "react-icons/fi";
const NavBar = () => {
    const navigate = useNavigate();
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
        navigate("/edit-profile");
    };
    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsProfileOpen(false);
    };

    return (
        <>
            <Nav>
                <LeftSection onClick={toggleMenu}><FiMenu size={22} /></LeftSection>
                <Logo><Link to={"/"} style={{ textDecoration: "none", color: "black" }}>BHaRaT</Link ></Logo>
                <RightSection>
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
                    <IconWrapper>
                        <FiHeart size={22} />
                    </IconWrapper>
                </RightSection>
                {/* SideBar */}
                <SideBar $isOpen={isOpen}>
                    <CloseButton>
                        <FiX size={22} onClick={toggleMenu} style={{ cursor: "pointer" }} />
                    </CloseButton>
                    <MenuItem>Shop All</MenuItem>
                    <MenuItem>Best Sellers</MenuItem>
                    <MenuItem>Shirts</MenuItem>
                    <MenuItem>Polo T</MenuItem>
                    <MenuItem>Baggy Jeans</MenuItem>
                    <MenuItem>Wide Leg</MenuItem>
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