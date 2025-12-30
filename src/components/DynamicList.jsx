export default function DynamicList({ title, items, setItems }) {
    const update = (value, idx) => {
        const copy = [...items];
        copy[idx] = value;
        setItems(copy);
    };

    const add = () => {
        setItems((p) => [...p, ""]);
    };

    const remove = (idx) => {
        setItems((p) => p.filter((_, i) => i !== idx));
    };

    return (
        <div className="dynamic-group">
            <label>{title}</label>

            {items.map((val, i) => (
                <div key={i} className="dynamic-row">
                    <input
                        value={val}
                        onChange={(e) => update(e.target.value, i)}
                    />
                    {i > 0 && (
                        <button type="button" className="remove-btn" onClick={() => remove(i)}>
                            -
                        </button>
                    )}
                </div>
            ))}

            <button type="button" className="add-btn" onClick={add}>
                + Add
            </button>
        </div>
    );
}
