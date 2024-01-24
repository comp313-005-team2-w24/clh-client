import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { keyframes } from "styled-components";
import { devices } from "../../config/devices";
import { NavLink as DomNavLink } from "react-router-dom";
import { useState } from "react";
const fadeLeftIn = keyframes`
  from{
    opacity: 0;
    transform: translateX(100px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;
const Nav = styled.nav`
    display: block;
    padding: 0 5%;
    background-color: rgb(157, 196, 212);
    box-shadow: rgba(96, 96, 96, 0.04) 0px 2px 4px;
    @media screen and (${devices.tablets}) {
        padding: 0 10%;
    }
`;
const NavHeading = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 20%;
`;
const NavLinksContainer = styled.div<{ $show: boolean }>`
    display: ${(props) => (props.$show ? "flex" : "none")};
    position: fixed;
    flex-direction: column;
    right: 0;
    height: 85%;
    gap: 1rem;
    background-color: #ffffff;
    width: clamp(12rem, 15rem, 70%);
    padding: 1rem;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    overflow-y: auto;
    animation: ${fadeLeftIn} 0.3s linear;
    @media screen and (${devices.tablets}) {
        display: flex;
        flex-direction: row;
        gap: 5%;
        margin-top: 1rem;
        position: inherit;
        width: 100%;
        background-color: inherit;
        animation: none;
        border-radius: none;
        padding: 0;
        padding-bottom: 1rem;
    }
`;
const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    min-height: 15%;
    max-height: 20%;
`;
const Logo = styled.img`
    width: 15%;
    max-width: 800px;
`;
const CompanyName = styled.div`
    font-size: inherit;
    font-weight: bold;
    color: #31718c;
    letter-spacing: 1px;
`;
const Hamburger = styled.button<{ $isShowNav: boolean }>`
    background-color: #6d94a4;
    padding: 7px 10px;
    height: max-content;
    border-radius: 50%;
    transition: all 0.2s linear;
    border: none;
    transform: rotate(${(props) => (props.$isShowNav ? "90deg" : "0")});
    &:hover {
        cursor: pointer;
        background-color: #31718c;
    }
    @media screen and (${devices.tablets}) {
        display: none;
    }
`;
const NavLink = styled(DomNavLink)`
    text-decoration: none;
    border-bottom: 1px solid gray;
    font-weight: 500;
    color: #000000;
    &.active {
        color: #0087c2;
    }
    &:hover {
        cursor: pointer;
        color: #0087c2;
    }
    @media screen and (${devices.tablets}){
      border-bottom: none;
    }
`;
const Navbar = () => {
    //state for small devices
    const [showNav, setShowNav] = useState(false);
    return (
        <Nav>
            <NavHeading>
                <LogoContainer>
                    <Logo src="icon.png" role="logo" />
                    <CompanyName>CodeLitHub</CompanyName>
                </LogoContainer>
                <Hamburger
                    onClick={() => {
                        setShowNav(!showNav);
                    }}
                    $isShowNav={showNav}
                >
                    <FontAwesomeIcon icon={faBars} size="lg" color="#ffffff" />
                </Hamburger>
            </NavHeading>
            <NavLinksContainer $show={showNav}>
                <NavLink role="test" to={"/"} reloadDocument>
                    Home
                </NavLink>
                <NavLink to={"/books"}>
                    Books
                </NavLink>
                <NavLink to={"/subjects"}>
                    Subjects
                </NavLink>
                <NavLink to={"/collections"}>
                    Collections
                </NavLink>
                <NavLink to={"/bestsellers"}>
                    Bestsellers
                </NavLink>
            </NavLinksContainer>
        </Nav>
    );
};

export default Navbar;
