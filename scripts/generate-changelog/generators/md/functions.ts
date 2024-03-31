import { REPOSITORY_URL } from '../../../constants';
import type { CommitInfo } from '../../types';

/**
 * Generates Markdown markup for a specific date and its associated commits.
 *
 * @param day - The date for which the Markdown markup is generated.
 * @param commits - An array of commit information.
 * @returns The generated Markdown markup.
 */
export function generateMarkdownForDateAndCommits(day: string, commits: CommitInfo[]): string {
	const formattedDate = new Date(day).toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	const formattedCommits = (commits as CommitInfo[])
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.map((commit) => `- [${commit.shortDescription}](${REPOSITORY_URL}/commit/${commit.shortHash})`);
	return `## ${formattedDate}\n\n${formattedCommits.join('\n')}`;
}

/**
 * Generates a full changelog Markdown document.
 *
 * @param sections - The list of changes to include in the changelog.
 * @returns The generated Markdown document as a string.
 */
export function generateFullChangelogMarkdown(sections: string) {
	return `# Changelog

This document lists all changes made to the repository, grouped by date.

***

${sections}
`;
}
