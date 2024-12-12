

type tParams = Promise<{ id: string }>;

export default async function Page(props: { params: tParams }) {
  const { id } = await props.params;


  return (
    <div className="md:w-full md:max-w-[1100px] sm:max-w-[100px] mx-auto flex md:flex-row flex-col gap-10 justify-center my-8 px-4 md:px-7">
id
      </div>

  );
}
