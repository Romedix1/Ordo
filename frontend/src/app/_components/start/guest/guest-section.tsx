import { GuestSectionData } from "@/app/_components/start/guest/guest-page";
import { cn } from "cn";

interface GuestSectionProps {
  data: GuestSectionData;
}

const listStyles = "flex flex-col gap-6";
const rowHeaderStyles =
  "lg:w-50 w-fit lg:text-[15px] text-[22px] leading-[28px] lg:leading-5.5 font-medium shrink-0";
const rowTextStyles = "text-sm leading-5 text-muted-foreground";

const getRowStyles = (isLast: boolean) =>
  cn(
    "border-t border-border py-5 flex lg:flex-row flex-col gap-6",
    isLast && "border-y-2",
  );

export const GuestSection = ({ data }: GuestSectionProps) => {
  const lastIndex = data.list.length - 1;

  return (
    <section
      id={data.id}
      className={cn(
        "flex flex-col gap-4 items-start py-4 scroll-mt-32",
        "lg:flex-row lg:gap-16 lg:py-0",
      )}
    >
      <div className={cn("flex flex-col gap-1.5", "lg:w-95 lg:shrink-0")}>
        <h2 className="text-[24px] leading-8 font-semibold">{data.header}</h2>
        <p className="text-[14px] leading-5 text-muted-foreground">
          {data.paragraph}
        </p>
      </div>

      <div className="w-full">
        {!data.ordered ? (
          <dl className={listStyles}>
            {data.list.map((item, index) => {
              return (
                <div
                  key={`section-${data.header}-${item.text}-item`}
                  className={getRowStyles(index === lastIndex)}
                >
                  <dt className={rowHeaderStyles}>{item.text}</dt>
                  <dd className={rowTextStyles}>{item.value}</dd>
                </div>
              );
            })}
          </dl>
        ) : (
          <ol className={listStyles}>
            {data.list.map((item, index) => {
              return (
                <li
                  key={`section-${data.header}-${item.text}-item`}
                  className={getRowStyles(index === lastIndex)}
                >
                  <h3 className={rowHeaderStyles}>
                    {index + 1}. {item.text}
                  </h3>
                  <p className={rowTextStyles}>{item.value}</p>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </section>
  );
};
