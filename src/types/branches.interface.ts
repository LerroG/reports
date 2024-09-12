export interface IGroupBranches {
	BranchGroupId: number
	BranchGroupName: string
	branches: IBranch[]
}

export interface IBranch {
	BranchId: number
	BranchName: string
}
