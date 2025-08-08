import { Request, Response, NextFunction, RequestHandler } from "express";
import User from "@models/userModel";
import prisma from "@config/prisma";
import { updateProfileSchema } from "@schemas/authSchemas";
import { ValidationError, UnauthorizedError } from "@/lib/errors";
import { AuthRequest } from "@middlewares/authRequire";

export const getUsers: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const user: any = await User.findById(id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserFriends = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const user: any = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id: any) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const addRemoveFriend = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, friendId } = req.params;
    const user: any = await User.findById(id);
    const friend: any = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id: any) => id !== friendId);
      friend.friends = friend.friends.filter((id: any) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id: any) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// PATCH /users/me - update profile (prisma users table)
export const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) throw new UnauthorizedError('Not authenticated');
    // Remove empty string fields (treat as undefined) before parsing
    const cleaned: Record<string, any> = {};
    for (const [k, v] of Object.entries(req.body || {})) {
      if (v === '') continue; // skip empty strings
      cleaned[k] = v;
    }
    const parsed = updateProfileSchema.safeParse(cleaned);
    if (!parsed.success) {
      console.warn('updateProfile validation failed:', {
        body: req.body,
        cleaned,
        issues: parsed.error.issues
      });
      return res.status(422).json({
        message: 'Validation error',
        errors: parsed.error.format(),
      });
    }
  const data = parsed.data;
    // Map allowed fields
    const updateData: any = {};
    const allowed = [
      'first_name','last_name','username','email','phone_number','phone_code','bio','avatar_url','cover_url'
    ];
    for (const k of allowed) {
      if (k in data && (data as any)[k] !== undefined) updateData[k] = (data as any)[k];
    }
    // Normalize Vietnam phone: keep national leading 0 form internally, force phone_code '+84'
    if (updateData.phone_number !== undefined) {
      let raw: string = String(updateData.phone_number);
      raw = raw.replace(/[^\d+]/g, '');
      if (raw.startsWith('+84')) raw = '0' + raw.slice(3);
      else if (raw.startsWith('84')) raw = '0' + raw.slice(2);
      if (!raw.startsWith('0')) raw = '0' + raw; // ensure leading 0
      updateData.phone_number = raw;
      updateData.phone_code = '+84';
    }
    if (Object.keys(updateData).length === 0) {
      return res.json({ success: true, message: 'No changes', data: null });
    }
    updateData.full_name = updateData.first_name && updateData.last_name ? `${updateData.first_name} ${updateData.last_name}` : undefined;
    const updated = await prisma.users.update({
      where: { id: req.userId },
      data: updateData,
      select: {
        id: true, email: true, username: true, first_name: true, last_name: true, full_name: true,
        phone_number: true, phone_code: true, avatar_url: true, cover_url: true, bio: true, role: true, status: true
      }
    });
    res.json({ success: true, message: 'Profile updated', data: updated });
  } catch (err) {
    next(err);
  }
};
