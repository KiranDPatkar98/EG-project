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
                   <h1>Something went wrong please contact Administrator</h1>
                    <div className="button">
                       <button onClick={()=>window.location.href}>Refresh</button>
                    </div>
                </div>
            );
        }

        return children;
    }
}

export default ErrorBoundary;
