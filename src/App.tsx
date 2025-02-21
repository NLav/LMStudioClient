import { Chat } from "@/views";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.scss";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Chat />
      </div>
    </QueryClientProvider>
  );
}

export { App };
