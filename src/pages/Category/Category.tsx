import { useParams } from "react-router-dom";

export const Category = (props: any) => {
  const { name } = useParams();
  return <div>{name}</div>;
};
