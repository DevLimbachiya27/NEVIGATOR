import { useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import "./index.css";

export default function App() {
  const [records, setRecords] = useState([]);

  const addRecord = (formData) => {
    const newEntry = {
      uid: Date.now(),
      time: new Date().toLocaleString(),
      ...formData,
    };
    setRecords((oldList) => [newEntry, ...oldList]);
  };

  const deleteRecord = (uid) => {
    setRecords((oldList) => oldList.filter((item) => item.uid !== uid));
  };

  return (
    <section className="app-wrapper">
      <h1 className="main-heading">Customer Feedback & Issue Log</h1>

      <div className="grid-box">
        <aside className="form-panel">
          <FeedbackForm onSubmit={addRecord} />
        </aside>

        <main className="list-panel">
          <h2 className="panel-title">Feedback Overview ({records.length})</h2>
          <FeedbackList items={records} onRemove={deleteRecord} />
        </main>
      </div>
    </section>
  );
}
