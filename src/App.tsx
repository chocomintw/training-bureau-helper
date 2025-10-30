import Sidebar from './components/sidebar';
import ToolCards from './components/toolCards';
import Header from './components/header';

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64"> {/* ml-64 to account for sidebar width */}
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome to the Training Bureau Helper!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Explore and use all the available tools to stop slacking with paperwork!
              </p>
            </div>
            <ToolCards />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;