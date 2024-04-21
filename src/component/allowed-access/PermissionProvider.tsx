"use client";
import React, { PropsWithChildren, useCallback, useState } from "react";
import { LOCAL_STORAGE_KEY_USER } from "./constant";
import { IUserPayload } from "./AllowedAccess";

//context
import { PermissionContext } from "./PermissionContext";

export const PermissionProvider = ({ children }: PropsWithChildren) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const updateUser = (newUser: IUserPayload) => {
		localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(newUser));
	};

	const isAuthorized = useCallback(
		async (permissionNames?: any[]): Promise<boolean> => {
			let hasAuthorization: boolean = false;
			const localStorageUser = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
			let storedUser = null;
			if (localStorageUser) {
				storedUser = JSON.parse(localStorageUser);
			}

			setIsLoading(true);
			if (storedUser) {
				hasAuthorization = await CheckUserHasRolesOrPermissions(
					storedUser,
					permissionNames
				);
			}
			setIsLoading(false);

			return hasAuthorization;
		},
		[]
	);

	const CheckUserHasRolesOrPermissions = async (
		storedUser: IUserPayload,
		permissionNames?: any[]
	): Promise<boolean> => {
		let hasRoles: boolean = false;
		let hasPermissions: boolean = false;

		// permission checking
		if (
			storedUser.permissions &&
			permissionNames &&
			storedUser.permissions.length > 0
		) {
			const userPermissions = storedUser.permissions;

			const intersection = userPermissions.filter((permission: any) =>
				permissionNames.includes(permission)
			);
			hasPermissions = intersection.length > 0;
		}

		return hasRoles || hasPermissions;
	};

	return (
		<PermissionContext.Provider
			value={{
				setUser: updateUser,
				isAuthorized,
				isLoading,
			}}
		>
			{children}
		</PermissionContext.Provider>
	);
};
