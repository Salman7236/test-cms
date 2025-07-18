export const registerComplaintLogController = (complaint, data) => {
    if (!complaint) return { error: 'Complaint not found', status: 404 }
    
    try {
        complaint.complaintLogs.unshift(data)

        return { message: `Complaint log saved`, status: 201 }
    } catch (err) {
        if (err.name === 'ValidationError') return { error : 'Fields missing', status: 422 }

        return { error: 'Something went wrong' }
    }
}