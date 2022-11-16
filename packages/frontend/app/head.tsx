interface Props {
  params?: {
    title?: string;
  }
 }

export default async function Head({ params }: Props) {
  const pageTitle = params?.title ? `${params?.title} | ` : "";
  const baseTitle =  "AwAs - Awesome Assets"
  return (
    <>
      <title>{pageTitle + baseTitle}</title>
    </>
  );
}
