import React from 'react'
import { Link } from 'gatsby'
import './header.css';

const menuItems = [
    { link: '/catalogue', label: 'Catalogue' },
    //{ link: '/calendar', label: 'Calendar' },
    { link: '/videos', label: 'Videos' },
    { link: '/about', label: 'About' }
]

const menu = menuItems.map(item =>
    <div key={item.link}>
        <Link to={item.link} activeClassName="active">{item.label}</Link>
    </div>);

const Header = ({ siteTitle }) => (
  <div
    style={{
      marginBottom: '0.5rem',
    }}
    className="header"
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
                {menu}
            </div>
        </div>
    </div>
  </div>
)

export default Header
