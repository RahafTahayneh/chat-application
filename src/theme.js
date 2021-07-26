const theme = {
    palette: {
        primary: {
            main: '#192233',
            light: '#283142',
        },
        secondary: {
            main: '#4285f4',
            light: '#b5dbff',
        },
        error: {
            main: '#ff5c5c',
            light: 'rgba(246, 36, 89, 0.1)',
            dark: '#f62459',
        },
        success: {
            main: '#41d6a8',
            light: 'rgba(65, 214, 143,0.1)',
        },
        info: {
            main: '#4b7ccf',
        },
        warning: {
            main: '#ffb900',
            light: '#fff8e5',
        },
        grey: {
            500: '#e5e6e5',
            600: '#c4c4c4',
            700: '#8e929a',
        },
        background: {
            paper: '#fff',
        },
        text: {
            primary: '#192233',
            secondary: '#ffffff',
            disabled: '#c7c7c7',
        },
    },
    typography: {
        fontSize: 16,
        fontWeightLight: 500,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 900,
        fontFamily: [
            'Roboto',
        ]
    },
    overrides: {
        MuiButton: {
            root: {
                padding: '10px !important',
            },
            label: {
                fontSize: '1.2rem',
                textTransform: 'capitalize',
            },
            containedSecondary: {
                backgroundColor: 'rgb(244, 179, 47)'
            },
            outlined: {
                color: '#fff',
                '&:hover': {
                    backgroundColor: '#ffffff',
                    color: '#192233',
                },
                '& > span:last-child': {
                    border: '2px solid #fff',
                },
            },
            contained: {
                '&:disabled': {
                    color: 'rgb(121 121 121)',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                },
            },
        },
        MuiDialog: {
            paper: {
                padding: 0,
            },
            root: {
                padding: 0,
            },
        },
    }

};

export default theme;