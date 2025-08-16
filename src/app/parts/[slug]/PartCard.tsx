
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "../../../components/ui/badge";
import { getPart } from "@/actions/part.action";


type Part = Awaited<ReturnType<typeof getPart>>;

interface PartCardProps {
  part: Part;
}

export default function PlantCard({ part }: PartCardProps) {

    
  if (!part) {
    return <div>Plant data is not available.</div>;
  }


  return (
    <Card className="max-w">
      <div className="flex flex-row">
        <div className="basis-2/4">
          <CardHeader>
          {part?.userPart?.imageUrl && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={part?.userPart?.imageUrl}
                alt="Post content"
                className="w-full h-auto object-cover"
              />
            </div>
          )}

           
          </CardHeader>
        </div>
        <div className="basis-2/4 flex flex-col justify-between">
          <CardContent className="mt-8 space-y-3">
            <CardTitle className="text-5xl font-bold">{part?.userPart?.name}</CardTitle>
            <CardTitle className="text-3xl font-bold">${part?.userPart?.amount}</CardTitle>
            <Badge>{part?.userPart?.type}</Badge>
            <CardDescription className="text-white">
              {part?.userPart?.description}
            </CardDescription>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}