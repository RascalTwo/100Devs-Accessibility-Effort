export const GIT_LOG_OUTPUT = [
	'latest-hash\tAuthor1\tFri Mar 18 00:00:00 2024 -0000\tLatest Commit',
	'third-hash\tAuthor3\tFri Mar 17 05:00:00 2024 -0000\tThird Commit',
	'second-hash\tAuthor2\tFri Mar 17 02:00:00 2024 -0000\tSecond Commit',
	'first-hash\tAuthor1\tFri Mar 15 14:13:59 2024 -0500\tFirst Commit',
].join('\n');

export const GIT_COMMIT_INFOS = [
	{
		shortHash: 'third-hash',
		author: 'Author3',
		date: new Date('Fri Mar 17 05:00:00 2024 -0000'),
		shortDescription: 'Third Commit',
	},
	{
		shortHash: 'second-hash',
		author: 'Author2',
		date: new Date('Fri Mar 17 02:00:00 2024 -0000'),
		shortDescription: 'Second Commit',
	},
	{
		shortHash: 'first-hash',
		author: 'Author1',
		date: new Date('Fri Mar 15 14:13:59 2024 -0500'),
		shortDescription: 'First Commit',
	},
];

export const SEVENTEENTH_COMMIT_INFOS = GIT_COMMIT_INFOS.slice(0, 2);
export const FIFTEENTH_COMMIT_INFOS = GIT_COMMIT_INFOS.slice(2);
