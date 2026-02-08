import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Page from "./components/Dashboard.tsx";

import "./App.css";

const queryClient = new QueryClient();

function App() {
	
	return (
		<body>
			<QueryClientProvider client={queryClient}>
				<Page></Page>
			</QueryClientProvider>
		</body>
	);
}

export default App;
