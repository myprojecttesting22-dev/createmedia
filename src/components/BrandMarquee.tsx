const BrandMarquee = () => {
  const clients = [
    "Ambika Group",
    "ACTIVE LANES",
    "AMG Realty",
    "Universal Infratech",
  ];

  return (
    <div className="w-full overflow-hidden py-12">
      <div className="relative flex">
        <div className="flex animate-marquee whitespace-nowrap">
          {clients.map((client, index) => (
            <span
              key={`first-${index}`}
              className="mx-8 text-2xl md:text-3xl font-semibold text-primary"
            >
              {client}
            </span>
          ))}
        </div>
        <div className="flex absolute top-0 animate-marquee2 whitespace-nowrap">
          {clients.map((client, index) => (
            <span
              key={`second-${index}`}
              className="mx-8 text-2xl md:text-3xl font-semibold text-primary"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandMarquee;
