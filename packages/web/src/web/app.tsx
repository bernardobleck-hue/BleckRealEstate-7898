import { Route, Switch } from "wouter";
import Index from "./pages/index";
import GuidePage from "./pages/guide";
import { Provider } from "./components/provider";
import { LanguageProvider } from "./lib/i18n";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

function App() {
  return (
    <Provider>
      <LanguageProvider>
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/guide" component={GuidePage} />
        </Switch>
      </LanguageProvider>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
