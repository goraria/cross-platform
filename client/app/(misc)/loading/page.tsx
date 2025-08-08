import Link from 'next/link';
import Image from 'next/image';

export default function LoadingPage() {
	return (
		<>
			<form className="flex flex-col gap-6">
				<div className="flex flex-col items-center gap-2">
					<Link href="/" className="flex flex-col items-center gap-2 font-medium">
						<div className="flex size-24 items-center justify-center rounded-md">
							<Image src="/logos/logo.png" alt="Gorth Inc." width={96} height={96} />
						</div>
						<span className="sr-only">Gorth Inc.</span>
					</Link>
					<h1 className="text-xl font-bold">Welcome to Gorth Inc.</h1>
				</div>
				<div className="flex flex-col items-center gap-2 text-center">
					<h1 className="text-2xl font-bold">Loading</h1>
					<p className="text-muted-foreground text-sm text-balance">
						{/* We are preparing your dashboard. This may take a few seconds. */}
						We are directing you to the page shortly.
					</p>
				</div>
			</form>
		</>
	);
}
