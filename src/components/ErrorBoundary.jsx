import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Model Error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          backgroundColor: '#0a0a0a',
          color: '#d4af37',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Failed to Load 3D Model
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'rgba(212, 175, 55, 0.8)' }}>
            The 3D campus model could not be loaded. Please try again later.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '0.8rem 2rem',
              fontSize: '1rem',
              backgroundColor: '#d4af37',
              color: '#0a0a0a',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f4e5a8'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#d4af37'}
          >
            Reload Page
          </button>
          {this.state.error && (
            <details style={{ marginTop: '2rem', maxWidth: '600px' }}>
              <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
                Technical Details
              </summary>
              <pre style={{ 
                textAlign: 'left', 
                backgroundColor: 'rgba(0,0,0,0.3)',
                padding: '1rem',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '0.85rem'
              }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
