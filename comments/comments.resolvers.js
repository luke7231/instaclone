export default {
    Comments: {
        isMine: ({ userId }, arg, { loggedUser }) => {
            if (!loggedUser) {
                return false
            }
            return userId === loggedUser.id
        }
    }
}