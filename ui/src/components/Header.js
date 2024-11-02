import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const navbarStyle = {
        backgroundColor: '#343a40', // Dark background for a professional look
        height: '60px',
        borderBottom: '2px solid #007bff', // Distinct border
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
    };

    const logoStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const titleStyle = {
        marginLeft: '10px',
        fontSize: '1.5em',
        color: '#ffffff', // White for contrast
    };

    const menuListStyle = {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
    };

    const menuItemStyle = {
        marginLeft: '20px',
    };

    const linkStyle = {
        textDecoration: 'none',
        color: '#ffffff', // White for links
        transition: 'color 0.3s',
    };

    const hoverLinkStyle = {
        color: '#007bff', // Bootstrap primary color on hover
    };

    return (
        <Navbar style={navbarStyle} expand="lg">
            <Container>
                <div style={logoStyle}>
                    <FontAwesomeIcon icon={faBookOpen} size="2x" color="#007bff" />
                    <h2 style={titleStyle}>LastBenchCoder</h2>
                </div>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                    <ul style={menuListStyle}>
                        {['Home', 'About Us', 'Services', 'Blog', 'Contact Us'].map((item, index) => (
                            <li key={index} style={menuItemStyle}>
                                <Link 
                                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                                    style={linkStyle}
                                    onMouseOver={(e) => e.currentTarget.style.color = hoverLinkStyle.color}
                                    onMouseOut={(e) => e.currentTarget.style.color = linkStyle.color}
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
