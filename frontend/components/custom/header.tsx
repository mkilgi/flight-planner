import Link from "next/link";

export default function Header() {
	return (
		<div className="flex flex-row p-4">
			<Link href={"/"} className="p-1 text-3xl font-semibold">
				<span className="text-amber-800">Beans</span>
				<span className="">Airlines</span>
			</Link>
		</div>
	);
}
