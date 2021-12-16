import { SearchProvider } from "./contexts/SearchContext";

import { Dashboard } from "./components/Dashboard";
import { Sidebar } from "./components/Sidebar";

import './styles.module.scss';

function App() {
  return (
    <SearchProvider>
      <main>
        <Sidebar />
        <Dashboard />
      </main>
    </SearchProvider>
  )
}

export default App;
