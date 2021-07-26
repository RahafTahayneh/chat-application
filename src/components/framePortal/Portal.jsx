import React from 'react';
import {
    createMuiTheme,
    makeStyles,
    StylesProvider,
    ThemeOptions,
    ThemeProvider,
} from '@material-ui/core/styles';
import { Jss } from 'jss';
import { CssBaseline } from '@material-ui/core';
import { GamixProvider } from '@gamiphy/gamix-web/context';

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

const Content: React.FC = ({ children }) => {
    useStyles();

    return (
        <>
            <CssBaseline />
            {children}
        </>
    );
};

type Props = {
    window?: Window,
    document: Document
    jss?: Jss,
    theme?: ThemeOptions,
}

const Portal: React.FC<Props> = ({
    children, window, document, jss, theme,
}) => (
    <GamixProvider
        value={{
            window,
            container: document.body,
        }}
    >
        {
            jss && (
                <StylesProvider jss={jss}>
                    <ThemeProvider
                        theme={createMuiTheme(theme)}
                    >
                        <Content>
                            {children}
                        </Content>
                    </ThemeProvider>
                </StylesProvider>
            )
        }
    </GamixProvider>
);

export default Portal;
