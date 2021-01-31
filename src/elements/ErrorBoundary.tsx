import React from 'react';
export type ErrorBoundaryState = {
  error: string;
  errorInfo: null | Error;
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component {
  state: ErrorBoundaryState = {
    error: '',
    errorInfo: null,
    hasError: false,
  };

  /**
   * @desc "Update state so the next render will show the fallback UI.""
   * @ref https://reactjs.org/docs/react-component.html#static-getderivedstatefromerror */
  static getDerivedStateFromError(error: Error): unknown {
    console.debug('getDerivedStateFromError', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown): void {
    console.debug('componentDidCatch', error, errorInfo);
    // Todo too much logic for a genuine error now that I understand these things better
    // const { userInput } = this.state;
    // if (userInput.length > MAX_USER_INPUT_LENGTH) {
    //   console.debug('setting', userInput.slice(MAX_USER_INPUT_LENGTH - 1));
    //   this.setState({ userInput: userInput.slice(MAX_USER_INPUT_LENGTH - 1) });
    // }
  }

  render(): React.ReactNode {
    const { hasError, errorInfo } = this.state;
    // todo add that ? babel thing
    if (hasError) {
      return (
        <div className="box error">
          <div className="header">
            <p>There was an error when loading this element. </p>
          </div>
          <div className="body">
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              Reload this page
            </button>
          </div>
          {errorInfo && (
            <div className="footer">
              <details>
                <summary>Click for additional error details</summary>
                {errorInfo.componentStack.toString() ||
                  (errorInfo.stack && errorInfo.stack.toString())}
              </details>
            </div>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
