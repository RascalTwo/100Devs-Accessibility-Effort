import { generateChangelogLIs } from '../../functions';
import type { CommitsByIsoDate } from '../../types';
import { generateFullChangelogHTML, generateHTMLForDateAndCommits } from './functions';

/**
 * Generates the HTML for the changelog based on the provided commits grouped by ISO day.
 *
 * @param commitsByIsoDay - The commits grouped by ISO day.
 * @returns The generated changelog HTML.
 */
export default function generateChangelogHTML(commitsByIsoDay: CommitsByIsoDate) {
	const lis = generateChangelogLIs(commitsByIsoDay, generateHTMLForDateAndCommits);
	return generateFullChangelogHTML(lis.join('\n\n'));
}
