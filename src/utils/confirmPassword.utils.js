export const verifyPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return false;
    }
    return password;
}