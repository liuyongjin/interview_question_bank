"use client";
import * as React from "react";
import { useEffect, useState, PropsWithChildren } from "react";
import { LOCAL_STORAGE_KEY_USER } from "./constant";

export interface IUserPayload {
	// id: any;
	permissions: any[];
}

export interface HasAccessProps {
	permissions?: any[];
	isLoading?: React.ReactElement;
	renderAuthFailed?: React.ReactElement;
	children?: any;
}

export const AllowedAccess = ({
	permissions,
	renderAuthFailed,
	isLoading,
	children,
}: PropsWithChildren<HasAccessProps>) => {
	const [allowedAccess, setAllowedAccess] = useState(false);
	const [checking, setChecking] = useState(false);

	useEffect(() => {
		const localStorageUser = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
		let storedUser = null;
		if (localStorageUser) {
			storedUser = JSON.parse(localStorageUser);
		}
		if (!storedUser) {
			console.log(
				"There is no user provided for permission! You should set user to perfom the access check"
			);
			return;
		}

		setChecking(true);

		// check the permission here
		if (
			permissions &&
			storedUser.permissions &&
			storedUser.permissions.length > 0
		) {
			const intersection = storedUser.permissions.filter((permission: any) =>
				permissions.includes(permission)
			);
			if (intersection.length > 0) setAllowedAccess(true);
		}

		setChecking(false);
	}, [permissions]);

	if (!allowedAccess && checking) {
		return isLoading;
	}

	if (allowedAccess) {
		return (
			// Render the children prop directly
			children
		);
	}

	if (renderAuthFailed) {
		return renderAuthFailed;
	}

	return null;
};
