import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { debug } from '@/utils/debug';

const RouteDebugger: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  // Log route changes
  React.useEffect(() => {
    debug.log('routing', 'Route changed', {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      params: params
    });
  }, [location, params]);

  if (!debug.isEnabled('routing')) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs z-50 max-w-sm border border-yellow-400/50">
      <div className="font-bold text-yellow-400 mb-2">🚀 Route Debugger</div>
      
      <div className="space-y-1">
        <div>
          <span className="text-gray-400">Path:</span> 
          <span className="ml-1 font-mono">{location.pathname}</span>
        </div>
        
        <div>
          <span className="text-gray-400">Params:</span> 
          <span className="ml-1 font-mono">{JSON.stringify(params)}</span>
        </div>
        
        {location.search && (
          <div>
            <span className="text-gray-400">Search:</span> 
            <span className="ml-1 font-mono">{location.search}</span>
          </div>
        )}
        
        {location.hash && (
          <div>
            <span className="text-gray-400">Hash:</span> 
            <span className="ml-1 font-mono">{location.hash}</span>
          </div>
        )}
      </div>

      <div className="mt-2 pt-2 border-t border-gray-600">
        <div className="text-gray-400 text-xs">Quick Nav:</div>
        <div className="flex flex-wrap gap-1 mt-1">
          <button
            onClick={() => navigate('/')}
            className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/tool/vpat-processor')}
            className="px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs"
          >
            VPAT
          </button>
          <button
            onClick={() => navigate('/tool/analytics')}
            className="px-2 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs"
          >
            Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteDebugger;