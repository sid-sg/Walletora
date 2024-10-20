export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="p-4 text-white text-3xl text-center rounded-xl border-2">
      <h1>
        {title} 
      </h1>
      {children}
    </div>
  );
}
