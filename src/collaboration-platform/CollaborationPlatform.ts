import type {
  BranchName,
  Commit,
  PullRequestID,
  PullRequestInfo,
  CommitHash,
} from "../shared/types";

export interface CollaborationPlatform {
  /**
   * Get PR info for a particular commit.
   */
  getPRForCommit(commit: Commit): Promise<PullRequestInfo | null>;

  /**
   * Get PR info given a commit's hash and branch name.
   */
  getPRForCommitByBranchName(
    commitHash: CommitHash,
    branchName: BranchName,
  ): Promise<PullRequestInfo | null>;

  /**
   * Get PR info given a PR number.
   */
  getPR(prNumber: PullRequestID): Promise<PullRequestInfo | null>;

  /**
   * Create or update PRs for the given commit/branch pairs. The following
   * information should be updated:
   *
   * - PR title
   * - PR base branch
   *
   * The following should NOT be updated:
   *
   * - Description
   *
   * @param commitBranchPairs Pairs of commits and their Stack Attack branch names.
   * @see updatePRDescriptionsForCommitGraph
   */
  createOrUpdatePRForCommits(
    commitsWithMetadata: {
      commit: Commit;
      headBranch: BranchName;
      baseBranch: BranchName;
    }[],
  ): Promise<Commit[]>;

  /**
   * Update PR descriptions for all PRs in a complete commit graph.
   *
   * @param commitPrInfoPairs Pairs of commits and PR info for a complete
   * commit graph. `commit` may be undefined if it has been landed, but its PR
   * info will be present.
   */
  updatePRDescriptionsForCommitGraph(
    commitPrInfoPairs: { commit?: Commit; prInfo: PullRequestInfo }[],
  ): Promise<void>;
}
