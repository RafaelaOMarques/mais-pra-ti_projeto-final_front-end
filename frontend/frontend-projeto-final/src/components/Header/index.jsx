// Header.js
import { useState, useContext } from 'react';
import styled, { ThemeProvider } from "styled-components";
import { FaSun, FaMoon, FaUserCircle } from 'react-icons/fa';
import { DarkModeContext } from "../../context/DarkModeContext";

// Styled components
const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.textColor};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;

  img {
    height: 80px;
    margin-right: 10px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.searchBackground};
  border-radius: 10px;
  padding: 5px 10px;
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  padding: 5px;
  color: ${({ theme }) => theme.textColor};
`;

const SearchIcon = styled.button`
  background: transparent;
  border: none;
  border-left: 1px solid #3333;

  svg {
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => theme.textColor};
  }
`;

const ThemeSwitcher = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-right: 10px;
  color: ${({ theme }) => theme.textColor};
`;

const LoginButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground};
  border: none;
  color: ${({ theme }) => theme.buttonTextColor};
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHoverBackground};
  }
`;

const Header = ({ theme }) => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <ThemeProvider theme={isDarkMode ? theme.darkTheme : theme.lightTheme}>
      <HeaderContainer>
        <Logo>
          <img src="https://raw.githubusercontent.com/adarshaacharya/ApiHub/main/assets/logo.png" alt="Logo" />
          <span>API HUB BRASIL</span>
        </Logo>
        <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <ThemeSwitcher onClick={toggleDarkMode}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </ThemeSwitcher>
          <LoginButton>
            <FaUserCircle style={{ marginRight: '5px' }} />
            Entrar
          </LoginButton>
        </div>
        <SearchContainer>
            <SearchInput type="text" placeholder="O que você procura?" />
            <SearchIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M10 2a8 8 0 105.29 14.71l5 5a1 1 0 001.42-1.42l-5-5A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
              </svg>
            </SearchIcon>
          </SearchContainer>

        </div>
      </HeaderContainer>
    </ThemeProvider>
  );
};

export default Header;
