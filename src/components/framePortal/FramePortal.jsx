import React  from 'react';
import { v4 } from 'uuid';
import Classnames from 'classnames';
import { create as createJss } from 'jss';
import {
    jssPreset, withStyles,
} from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import Portal from './Portal';


class FramePortal extends React.Component {
    componentDidMount() {
        if (this.node) {
            this.node.addEventListener('load', this.handleLoad);
        }
    }

    handleLoad = ()=> {
        if (this.node?.contentDocument) {
            this.window = this.node.contentWindow ?? undefined;
            this.doc = this.node.contentDocument;
            if (this.doc) {
                this.jss = createJss({
                    plugins: [...jssPreset().plugins],
                    insertionPoint: this.doc.head,
                });
            }
        }

        this.forceUpdate();
    };

    componentWillUnmout() {
        if (this.node) {
            this.node.removeEventListener('load', this.handleLoad);
        }
    }

    render() {
        const {
            children, theme, className, classes,
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
                            <link href={'https://fonts.googleapis.com/css?family=Roboto'} rel="stylesheet" type="text/css" />
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
