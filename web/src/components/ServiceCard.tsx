
type ServiceCardProps = {
  title: string;
  description: string;
};

export default function ServiceCard({
  title,
  description
}: ServiceCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-3">
        {title}
      </h3>

      <p>{description}</p>
    </div>
  );
}
