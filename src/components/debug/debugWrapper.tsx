import React from 'react';
import { debug } from '@/utils/debug';
import RouteDebugger from './routeDebugger';

interface DebugWrapperProps {
  children: React.ReactNode;
  componentName?: string;
}

const DebugWrapper: React.FC<DebugWrapperProps> = ({ children, componentName }) => {
  // Log component mounting
  React.useEffect(() => {
    if (componentName && debug.isEnabled('components')) {
      debug.log('components', `Component mounted: ${componentName}`);
      
      return () => {
        debug.log('components', `Component unmounted: ${componentName}`);
      };
    }
  }, [componentName]);

  return (
    <>
      {children}
      {debug.render('routing', <RouteDebugger />)}
    </>
  );
};

export default DebugWrapper;