"use client"

import {
    useEffect,
    useState
} from "react"
import { toast } from "sonner"
import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import {
    z
} from "zod"
import {
    cn
} from "@/lib/utils"
import {
    Button
} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Input
} from "@/components/ui/input"
import {
    Textarea
} from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { createPart } from "@/actions/part.action"
import { getCurrentUserId } from "@/actions/user.actions"

const formSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
    type: z.string(),
    brand: z.string().min(1),
    imageUrl: z.string().min(1),
    amount: z.float32().min(1),
});

type FormProp = {
    closeDialog: () => void
}

export default function AddProductForm({ closeDialog }: FormProp) {

    const userId = getCurrentUserId();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values);
            const res = await createPart({...values, userId: ""});
            toast("A part has been created.");
            closeDialog();
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""

                                    type=""
                                    {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder=""
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-12 gap-4">

                    <div className="col-span-6">

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="cpu">CPU</SelectItem>
                                            <SelectItem value="cpu cooler">CPU Cooler</SelectItem>
                                            <SelectItem value="motherboard">Motherboard</SelectItem>
                                            <SelectItem value="memory">Memory</SelectItem>
                                            <SelectItem value="storage">Storage</SelectItem>
                                            <SelectItem value="gpu">GPU</SelectItem>
                                            <SelectItem value="power supply">Power Supply</SelectItem>
                                            <SelectItem value="cases">Cases</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-6">

                        <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Brand</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder=""

                                            type="text"
                                            {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                </div>

                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""

                                    type="text"
                                    {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    type="number"
                                    step="0.01" // Allows decimal input
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Submit</Button>
            </form>
        </Form>
    )
}