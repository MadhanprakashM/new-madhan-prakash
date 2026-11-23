import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error inside portfolio applet:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    } catch (e) {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div 
          id="error-boundary-screen"
          className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 font-sans transition-colors duration-300"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:2rem_2rem]" />
          
          <div 
            id="error-boundary-card"
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-2xl p-8 sm:p-10 text-center space-y-6"
          >
            {/* Alarm Icon */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <ShieldAlert className="w-8 h-8 animate-bounce" />
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
                An Error Occurred
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                The application encountered an unexpected rendering anomaly. Click below to refresh your environment.
              </p>
            </div>

            {/* Error Detail (only shown for debug or safety, but in a clean collapsible layout) */}
            {this.state.error && (
              <details className="text-left bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800/40">
                <summary className="text-[10px] uppercase tracking-wider font-bold text-slate-400 cursor-pointer select-none outline-none">
                  Technical Diagnostics
                </summary>
                <p className="mt-2 text-xs font-mono text-red-600 dark:text-red-400 break-all leading-relaxed whitespace-pre-wrap">
                  {this.state.error.toString()}
                </p>
              </details>
            )}

            {/* Recovery Control Row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                id="error-reload-btn"
                onClick={() => window.location.reload()}
                className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-blue-900 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-sm focus:outline-none"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reload Page
              </button>

              <button
                id="error-reset-btn"
                onClick={this.handleReset}
                className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 font-bold rounded-xl text-xs transition-all shadow-xs focus:outline-none"
              >
                <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
                Clear State & Reset
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
