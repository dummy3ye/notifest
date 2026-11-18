import { Circles, EventLog, Footer, Nav, SendForm } from "./components";
import { useEventLog, useNotifications } from "./hooks";

export function App() {
  const { entries, add, clear } = useEventLog();
  const { permission, request, send } = useNotifications(add);

  return (
    <>
      <Circles />
      <main>
        <Nav />
        <div className="inset">
          <h1>
            does it
            <br />
            notify ?
          </h1>
          <SendForm permission={permission} onRequest={request} onSend={send} />
          <EventLog entries={entries} onClear={clear} />
        </div>
        <Footer />
      </main>
    </>
  );
}
