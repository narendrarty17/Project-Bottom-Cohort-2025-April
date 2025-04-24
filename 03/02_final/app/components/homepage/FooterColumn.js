export default function FooterColumn({ title, items }) {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        {typeof items === 'string' ? (
          <p className="text-sm text-gray-400">{items}</p>
        ) : (
          <ul className="space-y-2 text-sm text-gray-300">
            {items.map((item, index) => (
              <li key={index}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
}
  