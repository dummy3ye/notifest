import { Circles } from "./components/Circles";
import { Nav } from "./components/Nav";
import { SendForm } from "./components/SendForm";
import { EventLog } from "./components/EventLog";
import { Footer } from "./components/Footer";
import { useEventLog } from "./hooks/useEventLog";
import { useNotifications } from "./hooks/useNotifications";

export function App() {
  const { entries, add, clear } = useEventLog();
  const { permission, request, send } = useNotifications(add);

  return (
    <>
      <Circles />
      <main>
        <Nav />
        <div className="inset">
          <h1>does it<br />notify.</h1>
          <SendForm permission={permission} onRequest={request} onSend={send} />
          <EventLog entries={entries} onClear={clear} />
        </div>
        <Footer />
      </main>
    </>
  );
}
