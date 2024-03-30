/**
 * Represents information about an anchor element.
 */
export interface AnchorInfo {
	/** The URL of the anchor. */
	href: string;
	/** The text content of the anchor. */
	textContent: string;
	/** The alternative text for the anchor. */
	alt?: string;
}