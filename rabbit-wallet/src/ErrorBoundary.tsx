import React, { ErrorInfo } from "react";
export default class ErrorBoundary extends React.Component<
  {},
  { hasError: boolean }
> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {}
  render() {
    if (this.state.hasError) {
      return <h1 data-testid="errorboundary">Oops!. Something went wrong.</h1>;
    }
    // @ts-ignore
    return this.props.children;
  }
}
