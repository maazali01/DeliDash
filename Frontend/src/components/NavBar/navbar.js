import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cookie from 'js-cookie';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { CartContext } from '../HomePage/Cartcontext';
import './navbar.css';
import logoImage from './logoname.PNG'; 
import logo from './logo.png';

const Navbar = () => {
  const [logged, setLogged] = useState(false);
  const [searchopen, setSearchopen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    const token = Cookie.get('token');
    setLogged(!!token);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchopen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (logged) {
      Cookie.remove('token');
      setLogged(false);
      clearCart();
    }
  };

  const toggleSearch = () => {
    setSearchopen(prev => !prev);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term) {
      fetchSearchResults(term);
    } else {
      setSearchResults([]);
    }
  };

  const fetchSearchResults = async (term) => {
    try {
      const response = await axios.get('http://localhost:4000/user/restaurants', {
        params: { query: term }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleResultClick = (id) => {
    navigate(`/restaurants/${id}/products`); // Navigate to the restaurant's page
    setSearchTerm(''); // Clear the search term
    setSearchResults([]); // Clear the search results
    setSearchopen(false); // Close the search dropdown
  };

  return (
    <nav className="navBar">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <Link to="/">
          <img src={logoImage} alt="Logo" />
        </Link>
      </div>
      <ul className="links">
        <SearchContainer ref={searchRef} searchopen={searchopen}>
          <SearchIcon onClick={toggleSearch}>
            <FaSearch />
          </SearchIcon>
          {searchopen && (
            <>
              <SearchInput
                placeholder="Search for restaurants..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchTerm && searchResults.length > 0 && (
                <SearchResults>
                  {searchResults.map((restaurant) => (
                    <SearchResultItem key={restaurant._id} onClick={() => handleResultClick(restaurant._id)}>
                      <Link to={`/restaurants/${restaurant._id}/products`}>
                        {restaurant.name}
                      </Link>
                    </SearchResultItem>
                  ))}
                </SearchResults>
              )}
            </>
          )}
        </SearchContainer>
        <li className="link">
          {logged ? (
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link to="/Login">
              Login
            </Link>
          )}
        </li>
        {!logged && (
          <li className="link">
            <Link to="/Signup">Sign up</Link>
          </li>
        )}
        <li className="link">
          <Link to="/contact-us">Feedback</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

const SearchContainer = styled.div`
  position: relative;
  width: ${({ searchopen }) => (searchopen ? '300px' : '35px')};
  height: 35px;
  display: flex;
  align-items: center;
  transition: width 0.4s ease-in-out;
  margin-right: 15px;
  overflow: hidden;
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 0;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;

  & > svg {
    font-size: 20px;
    color: ${({ searchopen }) => (searchopen ? '#333' : '#F8F8EC')};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 35px 0 15px;
  border: none;
  border-radius: 20px;
  outline: none;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &:focus {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  z-index: 2;
`;

const SearchResultItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  a {
    text-decoration: none;
    color: #333;

    &:hover {
      color: #31C48D;
    }
  }
`;
