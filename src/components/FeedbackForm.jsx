import { useState, useRef } from "react";
import DynamicList from "./DynamicList";

const init = {
    name: "",
    email: "",
    category: "Bug",
    priority: "Low",
    description: "",
};

export default function FeedbackForm({ onSubmit }) {
    const [form, setForm] = useState(init);
    const [errors, setErrors] = useState({});
    const [steps, setSteps] = useState([""]);
    const [suggestions, setSuggestions] = useState([""]);

    const screenshotRef = useRef();
    const notesRef = useRef();

    const validate = (v = form) => {
        const e = {};
        if (!v.name.trim()) e.name = "Required";
        if (!/\S+@\S+\.\S+/.test(v.email)) e.email = "Invalid email";
        if (!v.description.trim() || v.description.trim().length < 10)
            e.description = "Min 10 characters";
        return e;
    };

    const handle = (ev) => {
        const { name, value } = ev.target;
        setForm((p) => {
            const n = { ...p, [name]: value };
            setErrors(validate(n));
            return n;
        });
    };

    const canSubmit = Object.keys(validate()).length === 0;

    const clear = () => {
        setForm(init);
        setSteps([""]);
        setSuggestions([""]);
        setErrors({});
        if (screenshotRef.current) screenshotRef.current.value = "";
        if (notesRef.current) notesRef.current.value = "";
    };

    const submit = (ev) => {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length !== 0) return;

        const data = {
            ...form,
            steps: steps.filter((x) => x.trim()),
            suggestions: suggestions.filter((x) => x.trim()),
            screenshot: screenshotRef.current.value.trim(),
            notes: notesRef.current.value.trim(),
        };

        onSubmit(data);
        clear();
    };

    return (
        <form className="card" onSubmit={submit}>
            <h2 className="sub-title">Submit Feedback</h2>

            <label>Full Name *</label>
            <input name="name" value={form.name} onChange={handle} />
            {errors.name && <p className="error">{errors.name}</p>}

            <label>Email *</label>
            <input name="email" value={form.email} onChange={handle} />
            {errors.email && <p className="error">{errors.email}</p>}

            <label>Category</label>
            <select name="category" value={form.category} onChange={handle}>
                <option>Bug</option>
                <option>Suggestion</option>
                <option>Complaint</option>
                <option>Other</option>
            </select>

            <label>Priority</label>
            <select name="priority" value={form.priority} onChange={handle}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>

            <label>Description *</label>
            <textarea
                name="description"
                rows={3}
                value={form.description}
                onChange={handle}
            />
            {errors.description && <p className="error">{errors.description}</p>}

            <DynamicList title="Steps to Reproduce" items={steps} setItems={setSteps} />
            <DynamicList title="Suggested Improvements" items={suggestions} setItems={setSuggestions} />

            <label>Screenshot URL</label>
            <input ref={screenshotRef} />

            <label>Additional Notes</label>
            <textarea ref={notesRef} rows={2} />

            <button disabled={!canSubmit} className="btn">
                Submit
            </button>
        </form>
    );
}
