import { Helmet } from "react-helmet";

interface MetaDecoratorProps {
  title: string;
  description: string;
  type: string;
}

export const MetaDecorator = ({
  title,
  description,
  type,
}: MetaDecoratorProps) => (
  <Helmet>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta
      property="og:image"
      content={
        "https://res.cloudinary.com/dl4ooiriz/image/upload/v1672837860/checklists_cover_m1f4zm.png"
      }
    />
    <meta property="og:type" content={type} />
    <meta property="og:locale" content={"ru_Ru"} />
    {/* <meta
    property="og:url"
    content={metaDecorator.hostname + window.location.pathname + window.location.search}
  /> */}
  </Helmet>
);
