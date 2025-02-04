// import { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { MessageCircle, Loader2, Brain, Sparkles, FlaskConical } from 'lucide-react';

// const ModelDemo = () => {
//   const [selectedModel, setSelectedModel] = useState('');
//   const [userInput, setUserInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   interface Chat {
//     timestamp: string;
//     prompt: string;
//     response: string;
//     model: string;
//     usage: {
//       total_tokens: number;
//       prompt_tokens: number;
//       completion_tokens: number;
//     };
//   }
  
//   const [chatHistory, setChatHistory] = useState<Chat[]>([]);

//   const models = [
//     { 
//       id: 'deepseek', 
//       name: 'DeepSeek', 
//       description: 'Advanced reasoning and problem-solving capabilities',
//       icon: Brain,
//       color: 'bg-purple-100'
//     },
//     { 
//       id: 'gpt4', 
//       name: 'GPT-4', 
//       description: 'Powerful model for complex tasks and reasoning',
//       icon: Sparkles,
//       color: 'bg-blue-100'
//     },
//     { 
//       id: 'phi', 
//       name: 'Phi-3', 
//       description: 'Efficient model for general tasks',
//       icon: FlaskConical,
//       color: 'bg-green-100'
//     }
//   ];

//   const getModelInfo = (modelId: string) => models.find(m => m.id === modelId);

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     setError('');
    
//     try {
//       const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/generate`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: selectedModel,
//           prompt: userInput,
//           parameters: {
//             temperature: 0.7,
//             max_tokens: 800
//           }
//         }),
//       });
      
//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }

//       const data = await response.json();
      
//       // Add new interaction to chat history
//       setChatHistory(prev => [...prev, {
//         timestamp: new Date().toISOString(),
//         prompt: userInput,
//         response: data.response,
//         model: selectedModel,
//         usage: data.usage
//       }]);

//       setUserInput('');
//     } catch (error) {
//       if (error instanceof Error) {
//         setError(error.message);
//       } else {
//         setError('An unknown error occurred');
//       }
//     }
    
//     setIsLoading(false);
//   };

//   // Keep only last 5 interactions
//   const recentChats = chatHistory.slice(-5).reverse();

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6 flex flex-col items-center">
//     <img src="/logo2.png" alt="Logo2" className="mb-4 w-1/6 h-auto"/>
//     <img src="/logo1.png" alt="Logo1" className="mb-4 w-1/4 h-auto"/>
//       <Card>
//         <CardHeader>
//           <CardTitle>Azure AI Foundry Serverless Models</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-2">Select Model</label>
//             <Select value={selectedModel} onValueChange={setSelectedModel}>
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Choose a model" />
//               </SelectTrigger>
//               <SelectContent>
//                 {models.map(model => (
//                   <SelectItem key={model.id} value={model.id}>
//                     <div className="flex items-center gap-2">
//                       <model.icon className="h-4 w-4" />
//                       <div className="flex flex-col">
//                         <span className="font-medium">{model.name}</span>
//                         <span className="text-sm text-white-500">{model.description}</span>
//                       </div>
//                     </div>
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Your Prompt</label>
//             <Textarea
//               value={userInput}
//               onChange={(e) => setUserInput(e.target.value)}
//               placeholder="Enter your prompt here..."
//               className="min-h-32"
//             />
//           </div>

//           <Button
//             onClick={handleSubmit}
//             disabled={!selectedModel || !userInput || isLoading}
//             className="w-full"
//           >
//             {isLoading ? (
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             ) : (
//               <MessageCircle className="mr-2 h-4 w-4" />
//             )}
//             Generate Response
//           </Button>

//           {error && (
//             <div className="p-4 bg-red-50 text-red-600 rounded-lg">
//               {error}
//             </div>
//           )}

//           {recentChats.length > 0 && (
//             <div className="mt-8 space-y-4">
//               <h3 className="font-medium">Recent Interactions</h3>
//               {recentChats.map((chat) => {
//                 const modelInfo = getModelInfo(chat.model);
//                 return (
//                   <div 
//                     key={chat.timestamp} 
//                     className={`p-4 rounded-lg ${modelInfo?.color || ''} border border-gray-200`}
//                   >
//                     <div className="flex items-center gap-2 mb-2">
//                       {modelInfo && <modelInfo.icon className="h-5 w-5" />}
//                       {modelInfo && <span className="font-medium">{modelInfo.name}</span>}
//                       {chat.usage && (
//                         <span className="text-xs text-gray-500">
//                           Tokens: {chat.usage.total_tokens}
//                         </span>
//                       )}
//                     </div>
//                     <div className="text-sm text-gray-600 mb-2">
//                       Prompt: {chat.prompt}
//                     </div>
//                     <div className="text-sm bg-white p-3 rounded">
//                       {chat.response}
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ModelDemo;

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Loader2, Brain, Sparkles, FlaskConical, Clock, Zap } from 'lucide-react';

const ModelDemo = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  interface Chat {
    timestamp: string;
    prompt: string;
    response: string;
    model: string;
    usage: {
      total_tokens: number;
      prompt_tokens: number;
      completion_tokens: number;
    };
    responseTime: string;
    tokensPerSecond: string;
  }
  
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);

  const models = [
    { 
      id: 'deepseek', 
      name: 'DeepSeek', 
      description: 'Advanced reasoning and problem-solving capabilities',
      icon: Brain,
      color: 'bg-purple-100',
      borderColor: 'border-purple-200'
    },
    { 
      id: 'gpt4', 
      name: 'GPT-4', 
      description: 'Powerful model for complex tasks and reasoning',
      icon: Sparkles,
      color: 'bg-blue-100',
      borderColor: 'border-blue-200'
    },
    { 
      id: 'phi', 
      name: 'Phi-3', 
      description: 'Efficient model for general tasks',
      icon: FlaskConical,
      color: 'bg-green-100',
      borderColor: 'border-green-200'
    }
  ];

  const getModelInfo = (modelId: string) => models.find(m => m.id === modelId);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    const startTime = Date.now();
    
    try {
      const response = await fetch('/api/v1/generate', {
      // const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          prompt: userInput,
          parameters: {
            temperature: 0.7,
            max_tokens: 800
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      const responseTime = ((Date.now() - startTime) / 1000).toFixed(2);
      
      setChatHistory(prev => [...prev, {
        timestamp: new Date().toISOString(),
        prompt: userInput,
        response: data.response,
        model: selectedModel,
        usage: data.usage,
        responseTime,
        tokensPerSecond: (data.usage.total_tokens / parseFloat(responseTime)).toFixed(1)
      }]);

      setUserInput('');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
    
    setIsLoading(false);
  };

  // Keep only last 5 interactions
  const recentChats = chatHistory.slice(-5).reverse();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 flex flex-col items-center">
      <img src="/logo2.png" alt="Logo2" className="mb-4 w-1/6 h-auto"/>
      <img src="/logo1.png" alt="Logo1" className="mb-4 w-1/4 h-auto"/>
      <Card>
        <CardHeader>
          <CardTitle>Azure AI Foundry Serverless Models</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Model</label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a model" />
              </SelectTrigger>
              <SelectContent>
                {models.map(model => (
                  <SelectItem key={model.id} value={model.id}>
                    <div className="flex items-center gap-2">
                      <model.icon className="h-4 w-4" />
                      <div className="flex flex-col">
                        <span className="font-medium">{model.name}</span>
                        <span className="text-sm text-white-500">{model.description}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your Prompt</label>
            <Textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your prompt here..."
              className="min-h-32"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!selectedModel || !userInput || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <MessageCircle className="mr-2 h-4 w-4" />
            )}
            Generate Response
          </Button>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {recentChats.length > 0 && (
            <div className="mt-8 space-y-4">
              <h3 className="font-medium">Recent Interactions</h3>
              {recentChats.map((chat) => {
                const modelInfo = getModelInfo(chat.model);
                return (
                  <div 
                    key={chat.timestamp} 
                    className={`p-4 rounded-lg ${modelInfo?.color || ''} ${modelInfo?.borderColor || ''} border`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {modelInfo && <modelInfo.icon className="h-5 w-5" />}
                        {modelInfo && <span className="font-medium">{modelInfo.name}</span>}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1" title="Response Time">
                          <Clock className="h-3 w-3" />
                          {chat.responseTime}s
                        </div>
                        <div className="flex items-center gap-1" title="Tokens per Second">
                          <Zap className="h-3 w-3" />
                          {chat.tokensPerSecond} t/s
                        </div>
                        <div title="Total Tokens">
                          {chat.usage.total_tokens} tokens
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Prompt: {chat.prompt}
                    </div>
                    <div className="text-sm bg-white p-3 rounded">
                      {chat.response}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelDemo;