import { describe, expect, it } from '@jest/globals';
import { parseGitLog, getGitLog, groupCommitInfoByIsoDay, generateChangelogLIs } from './functions';
import { execSync } from 'node:child_process';
import { GIT_LOG_OUTPUT, GIT_COMMIT_INFOS, COMMITS_BY_ISO_DAY } from './test-data';

jest.mock('node:child_process');

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

		expect(groupedCommits).toEqual(COMMITS_BY_ISO_DAY);
	});
});

describe('generateChangelogLIs', () => {
	it('should generate changelog content LIs', () => {
		const transform = jest.fn((day, commits) => `${day} - ${commits.length}`);

		const changelogContentLIs = generateChangelogLIs(COMMITS_BY_ISO_DAY, transform);

		expect(transform).toHaveBeenCalledTimes(2);
		expect(changelogContentLIs).toEqual(['2024-03-17 - 2', '2024-03-15 - 1']);
	});
});
