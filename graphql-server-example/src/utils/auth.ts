import jwt from 'jsonwebtoken';
import { User } from '../models/User';
const JWT_SECRET = process.env.JWT_SECRET!;

export const getUserFromToken = async (token: string) => {
    try {
        if (token?.startsWith('Bearer ')) {
            token = token.slice(7);
        }
        const decoded: any = jwt.verify(token, JWT_SECRET);
        return await User.findById(decoded.id);
    } catch (error) {
        return null;
    }
}
