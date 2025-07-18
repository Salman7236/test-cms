export const registerActionLogController = (complaint, data) => {
    try {     
        if (!complaint) return { error: 'Complaint not found', status: 404 }

        complaint.actionLogs.unshift(data)

        return { message: `Action log saved`, status: 201 }
    } catch (err) {
        if (err.name === 'ValidationError') return { error : 'Fields missing', status: 422 }

        return { error: 'Something went wrong' }
    }
}