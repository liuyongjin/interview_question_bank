"use client";
import { createContext } from "react";
import { IUserPayload } from "./AllowedAccess";

export interface PermissionAuthContext {
	setUser: (user: IUserPayload) => void;
	isAuthorized: (
		roleNames?: any[],
		permissionsNames?: any[]
	) => Promise<boolean>;
	isLoading: boolean;
}

const noUser = (): never => {
	throw new Error("You didn't set User!");
};

export const PermissionContext = createContext<PermissionAuthContext>({
	setUser: noUser,
	isAuthorized: noUser,
	isLoading: false,
});
