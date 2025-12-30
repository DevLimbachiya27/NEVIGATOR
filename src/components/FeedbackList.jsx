import FeedbackCard from "./FeedbackCard";

export default function FeedbackList({ items, onRemove }) {
    if (items.length === 0) {
        return <p>No feedback submitted yet.</p>;
    }

    return (
        <div className="list">
            {items.map((e) => (
                <FeedbackCard key={e.id} item={e} onRemove={onRemove} />
            ))}
        </div>
    );
}
