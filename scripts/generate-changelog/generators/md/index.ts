import { generateChangelogLIs } from '../../functions';
import type { CommitsByIsoDate } from '../../types';
import { generateFullChangelogMarkdown, generateMarkdownForDateAndCommits } from './functions';

/**
 * Generates the Markdown for the changelog based on the provided commits grouped by ISO day.
 *
 * @param commitsByIsoDay - The commits grouped by ISO day.
 * @returns The generated changelog Markdown.
 */
export default function generateChangelogMarkdown(commitsByIsoDay: CommitsByIsoDate) {
	const lis = generateChangelogLIs(commitsByIsoDay, generateMarkdownForDateAndCommits);
	return generateFullChangelogMarkdown(lis.join('\n\n'));
}
