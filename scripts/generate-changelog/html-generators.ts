import { REPOSITORY_URL } from '../constants';
import type { CommitInfo } from './types';

/**
 * Generates HTML markup for a specific date and its associated commits.
 *
 * @param day - The date for which the HTML markup is generated.
 * @param commits - An array of commit information.
 * @returns The generated HTML markup.
 */
export function generateHTMLForDateAndCommits(day: string, commits: CommitInfo[]): string {
	const formattedDate = new Date(day).toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	const formattedCommits = (commits as CommitInfo[])
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.map(
			(commit) => `<li>
              <a href="${REPOSITORY_URL}/commit/${commit.shortHash}">${commit.shortDescription}</a>
            </li>`,
		);
	return `
        <li>
          <h2><time datetime="${day}">${formattedDate}</time></h2>

          <ul>
            ${formattedCommits.join('\n            ')}
          </ul>
        </li>
`.replace(/^\n+|\n+$/g, '');
}

/**
 * Generates a full changelog HTML document.
 *
 * @param lis - The list of changes to include in the changelog.
 * @returns The generated HTML document as a string.
 */
export function generateFullChangelogHTML(lis: string) {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>100Devs Accessability Effort - Changelog</title>
  </head>
  <body>
    <header>
      <h1>A list of all changes made to the repository</h1>
    </header>
    <main>
      <ul>
${lis}
      </ul>
    </main>
  </body>
</html>
`;
}
