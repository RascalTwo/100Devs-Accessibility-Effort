import { execSync } from 'node:child_process';
import type { CommitInfo } from './types';
import { generateHTMLForDateAndCommits } from './html-generators';

/**
 * Converts an object into an array of key-value pairs, with type information.
 *
 * @param obj - The object to convert.
 * @returns An array of key-value pairs, where each pair is represented as a tuple.
 * The first element of the tuple is the key, and the second element is the value.
 * The type of the value is preserved in the tuple.
 * @template T - The type of the values in the object.
 */
const typedEntries = <T>(obj: Record<string, T>) => Object.entries(obj) as [string, T][];

/**
 * Retrieves the git log using the `git log` command and returns it as a string.
 * The log includes the commit hash, author name, commit date, and commit message separated by tabs.
 *
 * @returns The git log as a string.
 */
export function getGitLog() {
	return execSync('git log --pretty=format:"%h%x09%an%x09%ad%x09%s"').toString();
}

/**
 * Parses the git log and returns an array of {@link CommitInfo} objects.
 *
 * @param gitLog - The git log to parse.
 * @returns An array of {@link CommitInfo} objects.
 */
export function parseGitLog(gitLog: string): CommitInfo[] {
	return gitLog
		.trim()
		.split('\n')
		.slice(1)
		.map((line) => {
			const [shortHash, author, date, shortDescription] = line.split('\t');
			return { shortHash, author, date: new Date(date), shortDescription };
		});
}

/**
 * Groups an array of {@link CommitInfo} objects by ISO day.
 *
 * @param commits - An array of {@link CommitInfo} objects.
 * @returns An object where the keys are ISO days and the values are arrays of {@link CommitInfo} objects.
 */
export function groupCommitInfoByIsoDay(commits: CommitInfo[]) {
	return commits.reduce(
		(acc, commit) => {
			const day = commit.date.toISOString().split('T')[0];
			if (!acc[day]) acc[day] = [];
			acc[day].push(commit);
			return acc;
		},
		{} as Record<string, CommitInfo[]>,
	);
}

/**
 * Generates the content for the changelog as a list of HTML list items.
 *
 * @param commitsByIsoDay - The commits grouped by ISO day.
 * @returns The list of HTML list items representing the changelog content.
 */
export function generateChangelogContentLIs(commitsByIsoDay: ReturnType<typeof groupCommitInfoByIsoDay>) {
	return typedEntries(commitsByIsoDay)
		.sort((a, b) => b[0].localeCompare(a[0]))
		.map(([day, commits]) => generateHTMLForDateAndCommits(day, commits));
}
