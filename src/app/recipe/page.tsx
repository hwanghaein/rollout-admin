import AuthenticatedRoute from "../../components/authenticated-route";

export default function Page() {
  return (
    <AuthenticatedRoute>
      <div className="px-4 md:w-full max-w-[1100px] mx-auto flex flex-col pt-7 pb-20">
        <span className="text-dark2 text-2xl mb-10">RECIPE</span>
      </div>
    </AuthenticatedRoute>
  );
}
