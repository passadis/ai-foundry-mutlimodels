import ModelDemo from './components/ModelDemo';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col items-center">
      <div className="container flex justify-center">
        <div className="bg-blue-500 text-white p-4 rounded-md inline-block">
          <h1 className="text-3xl font-bold text-center">
            Azure AI Foundry Mutli Model Tool
          </h1>
        </div>
      </div>
      <ModelDemo />
    </div>
  );
}

export default App;
