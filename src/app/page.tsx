"use client";
import { BaseForm } from "@/component";
import { AllowedAccess, usePermission } from "@/component/allowed-access";

const shcema = {
	properties: {
		NAME: {
			label: "123",
			widget: {
				component: "OutlinedInput",
			},
			// default: ''
		},
	},
	ui: {},
};

export default function Home() {
	const { setUser } = usePermission();
	setUser({
		permissions: ["test"],
	});

	return (
		<main className="min-h-screen">
			<AllowedAccess
				permissions={["test"]}
				renderAuthFailed={<p>Not Allowed to see this!</p>}
				isLoading={<div>Spinner</div>}
			>
				<BaseForm shcema={shcema} />
			</AllowedAccess>
		</main>
	);
}
