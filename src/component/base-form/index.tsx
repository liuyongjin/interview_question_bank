"use client";
import { OutlinedInput, FormLabel, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { generateFormItems } from "./util";
import { useMemo } from "react";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
	NAME: string;
};

export function BaseForm(props: any) {
	const { shcema } = props;
	const formItems = useMemo(() => generateFormItems(shcema), []);

	// const formSchema = zfd.formData({
	// 	NAME: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
	// });

	const formSchema = z
		.object({
			NAME: z.string().nonempty("username cannot be empty")
            // z.string().superRefine((val, ctx) => {
			// 	if (val.length === 0) {
			// 		ctx.addIssue({
			// 			code: z.ZodIssueCode.invalid_type,
			// 			expected: "string",
			// 			received: "string",
			// 			message: "required",
			// 			// fatal: true,
			// 		});
			// 		return z.NEVER;
			// 	}
			// }),
			// .refine((val) => val.length >= 1, {
			// 	message: "required",
			// }),
		})
	// 	.required({
	// 		NAME: true,
	// 	});

	const {
		formState: { isValid, errors },
		register,
		control,
		handleSubmit,
		reset,
		setFocus,
		watch,
	} = useForm({
		// mode: "onChange",
		// mode: "all",
		resolver: zodResolver(formSchema),
	});

	console.log(errors);
	const onSubmit = (data: any) => {
		console.log("data", data);
		console.log("errors", errors);
	};

	// console.log(watch("NAME"));
	const RenderFormItems = () => {
		return formItems.map((item) => {
			return (
				<Controller
					key={item.label}
					name={item.label}
					control={control}
					defaultValue={item.value}
					// rules={{ required: true }}
					render={({ field }) => {
						return (
							<>
								<FormLabel>{item.label}</FormLabel>
								{/* <OutlinedInput {...field} /> */}
								{/* effective */}
								<OutlinedInput {...register(field.name)} />
							</>
						);
					}}
				/>
			);
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<RenderFormItems />
			{/* <Button
				onClick={() => {
					// reset();
					setFocus("NAME");
				}}
			>
				test
			</Button> */}
			{/* <input type="submit" /> */}
			<Button onClick={handleSubmit(onSubmit)}>Submit</Button>
		</form>
	);
}
