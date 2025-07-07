import chromium from '@sparticuz/chromium-min';
import puppeteer from 'puppeteer-core';

export const maxDuration = 20;

export async function POST(request: Request) {
	const { siteUrl } = await request.json();

	const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;

	// TODO: Replace '<Your Chromium URL>' with the actual URL where your Chromium executable is hosted
	// This is necessary for the serverless environment to find the Chromium binary
	// Chromium executable can be hosted on a CDN or any accessible URL, potentially using a service like AWS S3, Google Cloud Storage, etc.
	// References:
	// Chromium version to be uploaded: https://github.com/Sparticuz/chromium/releases/tag/v126.0.0
	// Step by step guide on Puppeteer and Chromium setup:
	// https://spacejelly.dev/posts/build-a-web-scraper-with-puppeteer-next-js-api-routes

	// Locally, you can use the default Chromium executable path by setting the environment variable `CHROME_EXECUTABLE_PATH`
	// The correct path can be found by visiting `chrome://version/` in your Chrome browser and copying the "Executable Path".
	const browser = await puppeteer.launch({
		args: isLocal ? puppeteer.defaultArgs() : chromium.args,
		defaultViewport: chromium.defaultViewport,
		executablePath:
			process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath('<Your Chromium URL>')),
		headless: chromium.headless,
	});

	const page = await browser.newPage();
	await page.goto(siteUrl);
	const pageTitle = await page.title();
	await browser.close();

	return Response.json({
		siteUrl,
		pageTitle,
	});
}
