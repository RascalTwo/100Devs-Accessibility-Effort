export interface CommitInfo {
	/** The short hash of the commit. */
	shortHash: string;
	/** The author of the commit. */
	author: string;
	/** The date when the commit was made. */
	date: Date;
	/** A short description of the commit. */
	shortDescription: string;
}
