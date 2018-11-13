import Typography from "typography";

const typography = new Typography({
    googleFonts: [
        {
            name: 'Roboto Condensed',
            styles: [
                '400',
            ],
        },
        {
            name: 'Roboto Slab',
            styles: [
                '400',
                '700',
            ],
        },
    ],
    baseFontSize: '16px',
    headerFontFamily: [ 'Roboto Condensed' ],
    bodyFontFamily: [ 'Roboto Slab' ],
});

export default typography;
