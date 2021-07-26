import React, { ReactNode } from 'react';
import { v4 } from 'uuid';
import _ from 'lodash';
import Classnames from 'classnames';
import { create as createJss, Jss } from 'jss';
import {
    jssPreset, ThemeOptions, withStyles, createStyles, WithStyles,
} from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import { addElementInteractListeners } from '@gamiphy/utils/interaction';
import Portal from './Portal';

const styles = createStyles({
    root: {
        border: 'none',
    },
});

interface Props extends WithStyles<typeof styles>{
    className?: string,
    stylesheets?: string[]
    theme?: ThemeOptions
}

class FramePortal extends React.Component<Props> {
    node?: HTMLIFrameElement;

    window?: Window;

    doc?: Document;

    jss?: Jss

    componentDidMount(): void {
        if (this.node) {
            this.node.addEventListener('load', this.handleLoad);
        }
    }

    handleLoad = (): void => {
        if (this.node?.contentDocument) {
            this.window = this.node.contentWindow ?? undefined;
            this.doc = this.node.contentDocument;
            addElementInteractListeners(this.node.contentDocument.body);

            if (this.doc) {
                this.jss = createJss({
                    plugins: [...jssPreset().plugins],
                    insertionPoint: this.doc.head,
                });
            }
        }

        this.forceUpdate();
    };

    componentWillUnmout(): void {
        if (this.node) {
            this.node.removeEventListener('load', this.handleLoad);
        }
    }

    render(): ReactNode {
        const {
            children, theme, className, classes, stylesheets,
        } = this.props;

        return (
            <iframe
                className={Classnames(classes.root, className)}
                title="main"
                srcDoc="<!DOCTYPE html>"
                ref={(node) => {
                    this.node = (node ?? undefined);
                }}
            >
                {
                    this.doc && ReactDOM.createPortal(
                        <Portal
                            key={v4()}
                            window={this.window ?? undefined}
                            document={this.doc}
                            jss={this.jss}
                            theme={theme}
                        >
                            {children}
                        </Portal>,
                        this.doc.body,
                    )
                }
                {
                    this.doc && ReactDOM.createPortal(
                        <>
                            {
                                _.map(stylesheets, (s) => (
                                    <link key={s} href={s} rel="stylesheet" type="text/css" />
                                ))
                            }
                        </>,
                        this.doc.head,
                    )
                }
            </iframe>
        );
    }
}

export default withStyles({
    root: {
        border: 'none',
    },
})(FramePortal);
