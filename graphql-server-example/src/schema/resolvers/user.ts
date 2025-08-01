import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { IUser, User } from '../../models/User';
import { StatusCodes } from 'http-status-codes';

dotenv.config({ path: '.env.local', quiet: true });
const JWT_SECRET = process.env.JWT_SECRET!;

export const userResolvers = {
  Query: {
    users: async () => await User.find(),
    me: async (_: any, __: any, context: { user: IUser | null }) => {
      return context.user;
    }
  },
  Mutation: {
    register: async (_: any, { name, email, password }: any) => {
      const existing = await User.findOne({ email });
      if (existing) {
        throw new GraphQLError('Email already exists', {
          extensions: { code: StatusCodes.CONFLICT }
        });
      }

      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashed });
      return user;
    },

    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ email, status: true });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new GraphQLError('Invalid credentials', {
          extensions: { code: StatusCodes.UNAUTHORIZED }
        });
      }

      const token = jwt.sign({ id: user._id, email }, JWT_SECRET, { expiresIn: '1h' });
      return { token, user };
    }
  }
};
