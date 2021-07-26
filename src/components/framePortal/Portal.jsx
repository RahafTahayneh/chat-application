import React from 'react';
import {
    makeStyles,
    StylesProvider,
    createTheme,
    ThemeProvider,
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { AuiProvider } from "../../context";

const useStyles = makeStyles({
    '@global': {
        html: {
            width: '100%',
            height: '100%',
        },
        body: {
            width: '100%',
            height: '100%',
            margin: 0,
            overflow: 'hidden',
            padding: '0 !important',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
    },
});

const Content = ({ children }) => {
    useStyles();

    return (
        <>
            <CssBaseline />
            {children}
        </>
    );
};


const Portal= ({
    children, window, document, jss, theme,
}) => (
    <AuiProvider
        value={{
            window,
            container: document.body,
        }}
    >
        {
            jss && (
                <StylesProvider jss={jss}>
                    <ThemeProvider
                        theme={createTheme(theme)}
                    >
                        <Content>
                            {children}
                        </Content>
                    </ThemeProvider>
                </StylesProvider>
            )
        }
    </AuiProvider>
);

export default Portal;
