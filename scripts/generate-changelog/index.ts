import fs from 'node:fs';
import { getGitLog, groupCommitInfoByIsoDay, parseGitLog } from './functions';
import generateChangelogHTML from './generators/html';
import generateChangelogMarkdown from './generators/md';

/**
 * Generates a changelog by retrieving git log, parsing the commits, grouping them by ISO day,
 * generating changelog content list items, and writing the full changelog HTML to a file.
 */
export function main() {
	const gitLog = getGitLog();
	const commits = parseGitLog(gitLog);
	const commitsByIsoDay = groupCommitInfoByIsoDay(commits);

	const fullChangelogHTML = generateChangelogHTML(commitsByIsoDay);
	fs.writeFileSync('../website/changelog.html', fullChangelogHTML);

	const fullChangelogMarkdown = generateChangelogMarkdown(commitsByIsoDay);
	fs.writeFileSync('../CHANGELOG.md', fullChangelogMarkdown);
}

if (require.main === module) {
	main();
}
