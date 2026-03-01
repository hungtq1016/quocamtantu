type Props = {
  variant: "am" | "duong";
  children: React.ReactNode;
};

export default function CornerFrame({ variant, children }: Props) {
  const corner =
    "absolute w-3 h-3 border-2 border-black";

  if (variant === "am") {
    // góc vuông
    return (
      <div className="relative inline-block p-6">
        {/* 4 góc */}
        <span className={`${corner} top-0 left-0 border-r-0 border-b-0`} />
        <span className={`${corner} top-0 right-0 border-l-0 border-b-0`} />
        <span className={`${corner} bottom-0 left-0 border-r-0 border-t-0`} />
        <span className={`${corner} bottom-0 right-0 border-l-0 border-t-0`} />

        {children}
      </div>
    );
  }

  // dương → tròn
  return (
    <div className="relative inline-block p-6">
      <span className="absolute top-0 left-0 w-3 h-3 border-2 rounded-full border-black" />
      <span className="absolute top-0 right-0 w-3 h-3 border-2 rounded-full border-black" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-2 rounded-full border-black" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-2 rounded-full border-black" />

      {children}
    </div>
  );
}
