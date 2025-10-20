const BrandMarquee = () => {
  const clients = [
    "Ambika Group",
    "Active Lanes",
    "AMG Realty",
    "Universal Infratech",
  ];

  return (
    <div className="brand-ticker">
      <div className="ticker-track">
        {clients.map((client, index) => (
          <span key={`first-${index}`} className="ticker-item">
            {client}
          </span>
        ))}
        {/* Duplicate for seamless loop - creates continuous effect */}
        {clients.map((client, index) => (
          <span key={`second-${index}`} className="ticker-item">
            {client}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BrandMarquee;
