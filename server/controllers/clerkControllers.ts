import { Request, Response } from "express";
import { createClerkClient } from "@clerk/express";

export const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
});

export const updateUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { userId } = req.params;
    const userData = req.body;
    try {
        const user = await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                userType: userData.publicMetadata.userType,
                settings: userData.publicMetadata.settings,
            },
        });

        res.json({ message: "User updated successfully", data: user });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};
