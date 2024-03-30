import { describe, expect, it } from '@jest/globals';
import { parseGitLog, getGitLog, groupCommitInfoByIsoDay, generateChangelogContentLIs } from './functions';
import { execSync } from 'node:child_process';
import { GIT_LOG_OUTPUT, GIT_COMMIT_INFOS, SEVENTEENTH_COMMIT_INFOS, FIFTEENTH_COMMIT_INFOS } from './test-data';
import { generateHTMLForDateAndCommits } from './html-generators'
jest.mock('node:child_process');
jest.mock('./html-generators')

describe('parseGitLog', () => {
	it('should skip latest commit and parse git log string into an array of CommitInfo objects', () => {
		const commits = parseGitLog(GIT_LOG_OUTPUT);

		expect(commits).toEqual(GIT_COMMIT_INFOS);
	});
});

describe('getGitLog', () => {
	it('should execute git log command and return the output', () => {
		jest.mocked(execSync).mockReturnValueOnce(GIT_LOG_OUTPUT);

		const gitLog = getGitLog();

		expect(gitLog).toEqual(GIT_LOG_OUTPUT);
	});
});

describe('groupCommitInfoByIsoDay', () => {
	it('should group commit info by ISO day', () => {
		const groupedCommits = groupCommitInfoByIsoDay(GIT_COMMIT_INFOS);

		expect(groupedCommits).toEqual({
			"2024-03-17": SEVENTEENTH_COMMIT_INFOS,
			"2024-03-15": FIFTEENTH_COMMIT_INFOS
		});
	});
});

describe('generateChangelogContentLIs', () => {
	it("should generate changelog content LIs", () => {
		const generateHTMLForDateAndCommitsMock = jest.mocked(generateHTMLForDateAndCommits).mockImplementation((day) => `<li>${day}</li>`);

		const commitsByIsoDay = {
			"2024-03-15": FIFTEENTH_COMMIT_INFOS,
			"2024-03-17": SEVENTEENTH_COMMIT_INFOS
		};

		const changelogContentLIs = generateChangelogContentLIs(commitsByIsoDay);

		expect(generateHTMLForDateAndCommitsMock).toHaveBeenCalledTimes(2);
		expect(changelogContentLIs).toEqual([
			'<li>2024-03-17</li>',
			'<li>2024-03-15</li>'
		]);
	});
});