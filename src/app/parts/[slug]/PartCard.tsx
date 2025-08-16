import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPart } from "@/actions/part.action";

type Part = Awaited<ReturnType<typeof getPart>>;

interface PartCardProps {
    part: Part;
}

export default function PartCard({ part }: PartCardProps) {
    if (!part?.userPart) {
        return (
            <Card className="p-6 text-center">
                <CardDescription>No description for this item yet.</CardDescription>
            </Card>
        );
    }

    const { imageUrl, name, amount, type, description } = part.userPart;

    return (
        <Card className="max-w-4xl mx-auto overflow-hidden shadow-lg px-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Image */}
                {imageUrl ? (
                    <div className="w-full h-64 md:h-auto">
                        <img
                            src={imageUrl}
                            alt={name}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center bg-muted h-64 rounded-l-lg">
                        <span className="text-sm text-muted-foreground">No image</span>
                    </div>
                )}

                {/* Right: Details */}
                <div className="flex flex-col p-6">
                    <CardHeader className="p-0">
                        <CardTitle className="text-3xl font-bold">{name}</CardTitle>
                        <p className="text-xl font-semibold text-primary">${amount}</p>
                    </CardHeader>

                    <CardContent className="p-0 mt-4 space-y-3">
                        <CardDescription className="flex flex-1 text-muted-foreground">
                            {description || "No description provided."}
                        </CardDescription>
                        <Badge variant="secondary" className="uppercase tracking-wide">
                            {type}
                        </Badge>
                    </CardContent>
                </div>
            </div>
        </Card>
    );
}
