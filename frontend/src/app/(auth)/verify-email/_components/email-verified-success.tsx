import { CardContainer } from "@/app/_components/ui";
import { Button } from "@base-ui/react";
import { CircleCheckBig } from "lucide-react";

export const EmailVerifiedSuccess = () => {
  return (
    <div className="flex flex-col gap-6">
      <CardContainer className="items-center">
        <div className="p-3 bg-label-green flex justify-center items-center rounded-xl">
          <CircleCheckBig className="w-7 h-7 text-label-green-foreground" />
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-2xl font-semibold text-foreground">
            Email confirmed
          </h2>
          <p className="text-sm text-center text-muted-foreground">
            Your account is active. You can sign in now
          </p>
        </div>

        <Button className="w-full">Continue to sign in</Button>
      </CardContainer>
    </div>
  );
};
