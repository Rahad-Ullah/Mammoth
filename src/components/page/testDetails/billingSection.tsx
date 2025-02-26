import { Input } from "@/components/ui/input";
import GraySection from "./grayPortion";
import { Button } from "@/components/ui/button";

const BillingSection = () => {
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-medium text-primary">Billing:</h1>
      <GraySection>
        <Input type="date" placeholder="Bill Date" className="bg-background" />
        <Input
          type="number"
          placeholder="Bill Amount"
          className="bg-background"
        />
        <div className="grid justify-end">
          <Button variant={"destructive"} className="px-10">
            Send to Billing
          </Button>
        </div>
      </GraySection>
    </div>
  );
};

export default BillingSection;
