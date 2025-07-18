export const accessComplaintPolicy = (user) => {
    const fullAccessVar = "full"

    const policyMap = {
        1: { key: 'complaintBy', value: user.userId },
        2: { key: 'complaintCategoryId', value: user.categoryId},
        3: fullAccessVar,
        4: fullAccessVar
    }
    const policy = policyMap[user.userLevel];
    
    if (policy === fullAccessVar) return { }
    if (!policy) return { _id: null }

    return { [policy.key] : policy.value }
}