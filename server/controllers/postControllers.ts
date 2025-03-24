import { NextFunction, Request, Response } from "express";
import Post from "../models/postModel";
import User from "../models/userModel";
import { userType } from "../utils/types";

/* CREATE */
export const createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user: any = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });
        await newPost.save();

        const post: any = await Post.find();
        res.status(201).json(post);
    } catch (error: any) {
        res.status(409).json({ message: error.message });
    }
};

/* READ */
export const getFeedPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const post: any = await Post.find();
        res.status(200).json(post);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = req.params;
        const post: any = await Post.find({ userId });
        res.status(200).json(post);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

/* UPDATE */
export const likePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post: any = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost: any = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};
