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
        <div style={{ marginTop: '0', display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem' }}>
            <div style={{ marginRight: '1rem' }}>
                <Link to="/albums">Albums</Link>
            </div>
            <div>
                <Link to="/concerts">Concerts</Link>
            </div>
        </div>
        <h1 style={{ margin: 0, textAlign: 'center' }} >
            <Link
              to="/"
              style={{ textDecoration: 'none' }}
            >
                {siteTitle}
            </Link>
        </h1>
    </div>
  </div>
)

export default Header
