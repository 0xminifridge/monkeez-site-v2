import CollectionInfoCard from "./CollectionInfoCard";

export default function CollectionCards() {
  const collectionInfo = [
    {
      name: "Monkeez",
      image: `${process.env.PUBLIC_URL}/images/monkeez-logo-with-bg.png`,
      description: "Stakeable NFTs",
      link: "https://monkeez.gitbook.io/monkeez/monkeez/what-are-monkeez",
    },
    {
      name: "Zoogz",
      image: `${process.env.PUBLIC_URL}/images/zoogz/collection-image-zoogz.png`,
      description: "Upgradeable NFTs",
      link: "https://monkeez.gitbook.io/monkeez/zoogz/what-are-zoogz",
    },
    {
      name: "Landz",
      image: `${process.env.PUBLIC_URL}/images/landz/collection-image-land.png`,
      description: "Buildable NFTs",
      link: "https://monkeez.gitbook.io/monkeez/",
    },
  ];

  return (
    <>
      <div class="container m-auto flex flex-col justify-center items-center align-middle py-20">
        <div class="flex justify-center">
          <span class="my-2 text-white text-4xl md:text-5xl font-bold tracking-wider bg-mnkz-wobo rounded-full border-4 border-solid border-black py-2 px-4 box-shadow-custom">
            NFTs
          </span>
        </div>
        <div class=" flex flex-col sm:flex-row justify-between items-center">
          {collectionInfo?.map((item, index) => {
            return <CollectionInfoCard key={index} item={item} />;
          })}
        </div>
      </div>
    </>
  );
}
