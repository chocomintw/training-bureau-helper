import React from 'react';
import ToolCards from '../components/toolCards';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore and use all the available tools to boost your productivity
          </p>
        </div>
        <ToolCards />
      </div>
    </div>
  );
};

export default Dashboard;