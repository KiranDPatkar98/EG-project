import React from 'react';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
}
class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    override render(): React.ReactNode {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return (
                <div className="error-container vertical-alignment">
                    <img src="/assets/errorBoundary.png" className="pagenotfound" alt="error-container" />
                    <div className="pagenotfound">
                        <strong>
                            Something went wrong
                        </strong>
                    </div>
                    <div className="pagenotfound">
                      Please contact administrator
                    </div>
                    <div className="button">
                       <button>Refresh</button>
                    </div>
                </div>
            );
        }

        return children;
    }
}

export default ErrorBoundary;
