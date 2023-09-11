import jwt from 'jsonwebtoken';

export const getUsernameFromToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, 'egeqwcyyp036ju027d7faj0919rw6mcp');
        return decodedToken.username;
    } catch (error) {
        return null;
    }
};
