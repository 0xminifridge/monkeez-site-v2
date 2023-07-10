import LoadingSpinner from "../../LoadingSpinner";
import { ZOOGZ_THUMBNAIL_URL_LG } from "../../../utils/metadata";
import { ZOOG_STATS } from "../../../utils/collection-data";
import { setCurrentState } from "../../../reducers/popupReducer";
import { useSelector, useDispatch } from "react-redux";

export default function SelectZoogForCreate({
  handleNextScreen,
  isLoading,
  data,
  setSelectedZoogId,
}) {
  const dispatch = useDispatch();

  const nextState = useSelector((state) => state.zunglePopup.nextState);

  const selectZoog = (id) => {
    setSelectedZoogId(id);
    dispatch(setCurrentState(nextState));
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (
    data?.length === 0 ||
    data?.filter((item) => item?.energy > 0)?.length === 0
  ) {
    return (
      <div class="flex flex-col items-center justify-center bg-gray-300 my-1 rounded-lg w-full max-w-[500px] m-auto">
        <img
          src={`${process.env.PUBLIC_URL}/images/logos/logo-black.png`}
          class="h-40 aspect-square"
        />
        <span>No Zoogz Available</span>
      </div>
    );
  }
  return (
    <div class="flex flex-col">
      <h2 className="text-2xl font-bold mb-4 m-auto">Select Zoog for Battle</h2>
      <div
        class={`grid grid-rows-1 grid-flow-col gap-4 overflow-x-auto p-4 bg-gray-300 rounded-xl`}
      >
        {data?.map((item, index) => {
          return (
            <div key={index} class="flex" onClick={() => selectZoog(item?.id)}>
              <div class="overflow-hidden rounded-xl relative block border-4 border-solid border-black hover:border-mnkz-tan hover:cursor-pointer">
                <span class="absolute md:text-sm top-1 left-1 bg-gray-300/50 rounded-lg px-2 py-1">
                  {item?.id}
                </span>
                <div class="absolute top-1 right-1 bg-gray-300/50 rounded-lg px-2 py-1 flex flex-row justify-center items-center">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/zoogz/stats/energy.png`}
                    class="w-4 h-4 aspect-square"
                  />
                  <span>{item?.energy}</span>
                </div>

                <img
                  src={`${ZOOGZ_THUMBNAIL_URL_LG}/${item?.id}.png`}
                  class="w-full max-w-[150px] min-w-[150px] aspect-square"
                />
                <div class="flex flex-row justify-between items-center px-4 py-2 bg-black text-white">
                  {ZOOG_STATS?.map((stat, index) => {
                    return (
                      <div
                        key={index}
                        class="flex flex-col justify-center items-center"
                      >
                        <span>{item[stat?.toLowerCase()]}</span>
                        <img
                          src={`${
                            process.env.PUBLIC_URL
                          }/images/zoogz/stats/${stat?.toLowerCase()}.png`}
                          class="w-4 h-4 aspect-square"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* <span>{item?.id}</span> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
