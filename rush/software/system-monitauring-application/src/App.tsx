import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DashboardSystem from './components/Dashboard';

import "./App.css";

const queryClient = new QueryClient();

function App() {
	
	return (
		<body>
			<QueryClientProvider client={queryClient}>
				<DashboardSystem />
			</QueryClientProvider>
		</body>
	);
}

export default App;
