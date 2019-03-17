import React from "react";

export const Concert = ({ concert }) => {
    return (
        <div style={{display: 'flex', cursor: concert.eventURL ? 'pointer' : 'default'}}
            onClick={() => concert.eventURL ? window.open(concert.eventURL) : null}
        >
            <div style={{width: 150}}>
                <div itemProp="startDate" style={{fontSize: '1.2rem'}}>
                    {concert.date.replace(/T.*$/, '')}
                </div>
                <span itemProp="endDate" style={{display: 'none'}}>
                    {concert.date.replace(/T.*$/, '')}
                </span>
                <span itemProp="name" style={{display: 'none'}}>
                    Maria Due at {concert.venue}
                </span>
                <div itemProp="location" itemScope itemType="https://schema.org/Place"
                    style={{textTransform: 'uppercase', color: 'grey', fontSize: '0.85rem'}}
                >
                    <span itemProp="name" style={{display: 'none'}}>{concert.venue}</span>
                    <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                        <span itemProp="addressLocality">{concert.city}</span>
                        {', '}
                        <span itemProp="addressCountry">{concert.country}</span>
                    </span>
                </div>
            </div>
            <div>
                <h3 style={{marginBottom: '0.5rem', textDecoration: concert.eventURL ? 'underline' : 'none'}}>
                    {concert.venue}
                </h3>

                <p itemProp="description">{concert.description}</p>
            </div>
        </div>
    );
};

export default Concert;
