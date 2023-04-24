export default function SectionTitle({
  title,
  children,
}: {
  title: string;
  children?: any;
}) {
  return (
    <div className="flex mb-8 w-full justify-between items-center">
      <div className="text-4xl  font-bold capitalize">{title}</div>
      <div>{children}</div>
    </div>
  );
}
