export default function FeedbackCard({ item, onRemove }) {
    return (
        <div className="card feedback-card">
            <div className="row">
                <strong>{item.name}</strong>
                <button className="delete-btn" onClick={() => onRemove(item.id)}>
                    Remove
                </button>
            </div>

            <p>{item.email}</p>

            <p>
                <span className="badge">{item.category}</span>{" "}
                <span className="badge priority">{item.priority}</span>
            </p>

            <p className="desc">{item.description}</p>

            {item.screenshot && (
                <a href={item.screenshot} target="_blank">View Screenshot</a>
            )}

            {item.steps.length > 0 && (
                <div>
                    <h4>Steps</h4>
                    <ul>
                        {item.steps.map((s, i) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                </div>
            )}

            {item.suggestions.length > 0 && (
                <div>
                    <h4>Suggestions</h4>
                    <ul>
                        {item.suggestions.map((s, i) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                </div>
            )}

            {item.notes && (
                <p><strong>Notes:</strong> {item.notes}</p>
            )}

            <small className="time">{item.createdAt}</small>
        </div>
    );
}
