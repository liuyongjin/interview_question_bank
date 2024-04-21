"use client";
import { useContext } from "react";
import { PermissionContext } from "../PermissionContext";

export const usePermission = () => useContext(PermissionContext);
