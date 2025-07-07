'use client';

import { useState } from 'react';

export default function Home() {
	const [results, setResults] = useState<object>();

	async function handleOnClick() {
		const _results = await fetch('/api/scraper', {
			method: 'POST',
			body: JSON.stringify({
				siteUrl: 'https://spacejelly.dev',
			}),
		}).then((r) => r.json());

		setResults(_results);
	}

	return (
		<div className="p-8">
			<div className="max-w-xl">
				<h1 className="mb-8 text-5xl font-bold">Let&apos;s scrape something!</h1>
				<p className="mb-2">Click the button to test out your new scraper.</p>

				<p className="mb-6 text-sm text-zinc-400 italic">
					Psst. Make sure you{' '}
					<a className="text-blue-500 underline" href="https://spacejelly.dev" target="_blank">
						build it first
					</a>
					!
				</p>

				<p className="mb-6">
					<button
						className="rounded bg-gray-50 px-3 py-2 font-semibold text-black"
						onClick={handleOnClick}
					>
						Get Started
					</button>
				</p>

				{results && (
					<div className="grid">
						<pre className="overflow-x-scroll rounded bg-zinc-700 px-5 py-4 text-left">
							<code>{JSON.stringify(results, undefined, 2)}</code>
						</pre>
					</div>
				)}
			</div>
		</div>
	);
}
