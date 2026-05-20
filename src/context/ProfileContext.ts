import React from "react";

export type ProfileType = {
  name: string;
  email: string;
};

export type ProfileContextType = {
  profile: ProfileType | null;
  setProfile: React.Dispatch<React.SetStateAction<ProfileType | null>>;
} | null;

export const ProfileContext = React.createContext<ProfileContextType | null>(
  null,
);
