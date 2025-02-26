import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

const NoteSection = () => {
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-medium text-primary">Note:</h1>
      <Textarea rows={8} placeholder="Write note here..." />
      <div className="grid justify-end">
        <Button>
          <Plus /> Add Note
        </Button>
      </div>
    </div>
  );
};

export default NoteSection;
