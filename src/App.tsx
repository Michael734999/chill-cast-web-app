import { AppProvider } from '@providers/AppProvider/AppProvider.component';
import { RoutesProvider } from '@providers/RoutesProvider';

function App() {
  return (
    <AppProvider>
      <RoutesProvider />
    </AppProvider>
  );
}

export default App;
