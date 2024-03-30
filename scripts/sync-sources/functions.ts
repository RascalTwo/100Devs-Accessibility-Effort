import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import inquirer from 'inquirer';
import type { AnchorInfo } from './types';

/**
 * Parses the entries from the website index.html file.
 * @returns An array of {@link AnchorInfo} objects
 */
export function parseEntries(): AnchorInfo[] {
	const dom = new JSDOM(fs.readFileSync('../website/index.html', 'utf-8'));
	return Array.from(dom.window.document.querySelectorAll('a')).map((a) => ({
		href: a.href,
		textContent: a.textContent ?? '',
		alt: a.getAttribute('alt') ?? undefined,
	}));
}

/**
 * Removes sources that are no longer present in the website.
 * @param records - The records object containing URLs as keys and corresponding values.
 * @param entries - An array of {@link AnchorInfo} objects representing the HTML content.
 */
export function removeExtraSources(records: Record<string, string>, entries: AnchorInfo[]) {
	const urls = new Set(entries.map(({ href }) => href));
	for (const url of Object.keys(records).filter((url) => !urls.has(url))) {
		delete records[url];
	}
}

/**
 * Prompts the user for missing sources and updates the records with the provided alternative text.
 *
 * @param records - The existing records of sources.
 * @param entries - The list of anchor information.
 * @returns A Promise that resolves when all missing sources have been prompted and updated.
 */
export async function promptMissingSources(records: Record<string, string>, entries: AnchorInfo[]) {
	const missing = entries.filter(({ href }) => !(href in records));
	for (const { href, textContent, alt } of missing) {
		await inquirer
			.prompt({
				type: 'input',
				name: 'alt',
				default: alt,
				message: `Alt of ${href}:${textContent ? ` "${textContent}"` : ''}`,
			})
			.then((answers) => {
				records[href] = answers.alt;
			});
	}
}
