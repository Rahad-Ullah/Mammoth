import GraySection from "./grayPortion";
import { File, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

const DocumentSection = ({ test }) => {
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-medium text-primary">Documents:</h1>
      <GraySection>
        <div className="grid gap-6">
          <ul className="text-zinc-500 grid gap-4 w-full">
            {test.documents.map((item, idx: number) => (
              <li
                key={idx}
                className="flex justify-between items-center gap-2 p-4 px-6 bg-white rounded-xl shadow"
              >
                <p className="flex items-center gap-2">
                  <File className="size-5" /> {item}
                </p>
                <Button variant={"ghost"} size={"icon"}>
                  <Trash className="size-5 text-red-500" />
                </Button>
              </li>
            ))}
          </ul>
          <div className="grid justify-end">
            <Button variant={"destructive"}>
              <Plus /> Add Document
            </Button>
          </div>
        </div>
      </GraySection>
    </div>
  );
};

export default DocumentSection;
