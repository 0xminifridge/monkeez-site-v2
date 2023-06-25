import LoadingSpinner from "./LoadingSpinner";

export default function Loading() {
  return (
    <div class="w-screen h-[100vh] bg-mnkz-blue flex justify-center items-center">
      <div class="px-10 py-6 bg-white border-solid border-black border-4 rounded-lg">
        <LoadingSpinner />
      </div>
    </div>
  );
}
