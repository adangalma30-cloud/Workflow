import NotFound from '@/pages/not-found';
import Home from '@/pages/Home';
import BusinessDetail from '@/pages/BusinessDetail';
import { SiteHeader } from '@/components/SiteHeader';
import { useSavedPlaces } from '@/hooks/useSavedPlaces';
import { Route, Switch, Router as WouterRouter } from 'wouter';

function Router() {
  const { savedIds, toggleSaved } = useSavedPlaces();
  return (
    <div className="app-shell paper-grain">
      <SiteHeader savedCount={savedIds.length} />
      <Switch>
        <Route path="/"><Home savedIds={savedIds} onToggleSaved={toggleSaved} /></Route>
        <Route path="/business/:id"><BusinessDetail savedIds={savedIds} onToggleSaved={toggleSaved} /></Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Router />
    </WouterRouter>
  );
}

export default App;
