import { BoxInfo } from "./BoxInfo";
import { Card } from "./Card/Card";

export const WoodBoxes = ({ boxesState = [] }) => {
  return (
    <div className="mx-auto flex flex-wrap justify-center gap-5">
      {boxesState.map(({ title, value, toFixed, cardType }) => (
        <Card 
          key={title}
          title={title}
          content={Number(value).toFixed(toFixed)}
          imageType={cardType}
        />
      ))}
    </div>
  );
};
