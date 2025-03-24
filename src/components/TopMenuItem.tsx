import Link from "next/link";

export default function TopMenuItem({
  title,
  pageRef,
}: {
  title: string;
  pageRef: string;
}) {
  return (
    <Link
      href={pageRef}
      className="w-[120px] flex items-center justify-center font-sans text-[10pt] text-white px-2"
    >
      {title}
    </Link>
  );
}
