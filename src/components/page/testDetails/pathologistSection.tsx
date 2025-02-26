import { Button } from "@/components/ui/button";
import GraySection from "./grayPortion";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const PathologistSection = ({ test }) => {
  return (
    <section className="grid gap-8">
      <h1 className="text-2xl font-medium text-primary">
        Pathologist Section:
      </h1>
      {/*  Final Microscopic Diagnosis */}
      <GraySection>
        <div className="flex justify-between items-center gap-4">
          <h1 className="text-xl font-medium">Final Microscopic Diagnosis:</h1>
          <p className="flex gap-2 text-sm text-zinc-400">
            {Object.entries(
              test.pathologist_section.final_microscopic_diagnosis
            ).map(([key, value]) => (
              <span key={key}>
                {capitalizeSentence(key)} {value as string}
              </span>
            ))}
          </p>
        </div>

        {test.pathologist_section.samples.map((item, idx) => (
          <div key={idx} className="grid gap-5">
            <div className="flex justify-between items-center gap-4 px-1">
              <p>
                {idx + 1}. Sample taken from{" "}
                <span className="text-primary font-medium">
                  ({item.abbreviation}) {item.location}
                </span>{" "}
                <span className="text-red-500 capitalize">{item.side}</span>{" "}
                Side
              </p>
              <p className="text-sm text-zinc-400">
                Specimen Id: {item.specimen_id}
              </p>
            </div>
            <Input
              placeholder="Choose Canned Dx...."
              className="bg-white w-4/5 md:w-2/5"
            />
            <Textarea
              placeholder={item.diagnosis}
              className="bg-white"
              rows={6}
            />
          </div>
        ))}
      </GraySection>

      {/*Microscopic Examination */}
      <GraySection>
        <div className="">
          <h1 className="text-xl font-medium">Microscopic Examination:</h1>
        </div>

        {test.pathologist_section.microscopic_examination.map((item, idx) => (
          <div key={idx} className="grid gap-5">
            <div className="flex justify-between items-center gap-4 px-1">
              <p>
                {idx + 1}. Sample taken from{" "}
                <span className="text-primary font-medium">
                  ({item.abbreviation}) {item.location}
                </span>{" "}
                <span className="text-red-500 capitalize">{item.side}</span>{" "}
                Side
              </p>
              <p className="text-sm text-zinc-400">
                Specimen Id: {item.specimen_id}
              </p>
            </div>
            <Textarea
              placeholder={item.diagnosis}
              className="bg-white"
              rows={6}
            />
          </div>
        ))}
      </GraySection>

      {/* Gross Description */}
      <GraySection>
        <div className="">
          <h1 className="text-xl font-medium">Gross Description:</h1>
        </div>

        {test.pathologist_section.gross_description.map((item, idx) => (
          <div key={idx} className="grid gap-5">
            <div className="flex justify-between items-center gap-4 px-1">
              <p>
                {idx + 1}. Sample taken from{" "}
                <span className="text-primary font-medium">
                  ({item.abbreviation}) {item.location}
                </span>{" "}
                <span className="text-red-500 capitalize">{item.side}</span>{" "}
                Side
              </p>
              <p className="text-sm text-zinc-400">
                Specimen Id: {item.specimen_id}
              </p>
            </div>
            <Textarea
              placeholder={item.diagnosis}
              className="bg-white"
              rows={6}
            />
          </div>
        ))}
      </GraySection>

      {/* Comments */}
      <GraySection>
        <div className="">
          <h1 className="text-xl font-medium">Comment</h1>
        </div>

        {test.pathologist_section.comments.map((item, idx) => (
          <div key={idx} className="grid gap-5">
            <div className="flex justify-between items-center gap-4 px-1">
              <p>
                {idx + 1}. Sample taken from{" "}
                <span className="text-primary font-medium">
                  ({item.abbreviation}) {item.location}
                </span>{" "}
                <span className="text-red-500 capitalize">{item.side}</span>{" "}
                Side
              </p>
              <p className="text-sm text-zinc-400">
                Specimen Id: {item.specimen_id}
              </p>
            </div>
            <Textarea
              placeholder={item.comment}
              className="bg-white"
              rows={6}
            />
          </div>
        ))}
      </GraySection>

      {/* Fill out the following */}
      <GraySection>
        <div className="">
          <h1 className="text-xl font-medium">Fill out the following</h1>
        </div>
        <div className="grid gap-3">
          <Label>The biopsies demonstrate</Label>
          <Input className="bg-white" placeholder="Number of fibers" />
        </div>

        <div className="grid gap-3">
          <Label>Nerve fibber density consistent with</Label>
          <Select>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Choose one of the following" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Option 1">Option 1</SelectItem>
              <SelectItem value="Option 2">Option 2</SelectItem>
              <SelectItem value="Option 3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="length" />
            <label
              htmlFor="length"
              className="text-sm text-zinc-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Length- dependent neuropathy
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="non-length" />
            <label
              htmlFor="non-length"
              className="text-sm text-zinc-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Non Length- dependent neuropathy
            </label>
          </div>
        </div>

        <div className="grid justify-end">
          <Button className="px-16">Confirm</Button>
        </div>
      </GraySection>
    </section>
  );
};

export default PathologistSection;
