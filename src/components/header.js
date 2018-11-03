import React from 'react'
import { Link } from 'gatsby'
import './header.css';

const Header = ({ siteTitle }) => (
  <div
    style={{
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
        <div style=
            {{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '2px solid black',
                paddingBottom: '16px'
            }}
            className="header"
        >
            <div style={{ }}>
                <h1 style={{ margin: 0 }} >
                    <Link
                      to="/"
                      style={{ textDecoration: 'none' }}
                    >
                        {siteTitle}
                    </Link>
                </h1>
            </div>
            <div className="menu">
                <div>
                    <Link to="/albums">Albums</Link>
                </div>
                <div>
                    <Link to="/concerts">Concerts</Link>
                </div>
                <div>
                    <Link to="/videos">Videos</Link>
                </div>
                <div>
                    <Link to="/press">Press</Link>
                </div>
                <div>
                    <Link to="/contact">Contact</Link>
                </div>
            </div>
        </div>
    </div>
  </div>
)

export default Header
