import jwt from 'jsonwebtoken';

export const getUsernameFromToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, 'xxxxxx');
        return decodedToken.username;
    } catch (error) {
        return null;
    }
};
