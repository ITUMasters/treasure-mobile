import { Loading } from "../pages/Loading";
import { useDownloadedImage } from "../react-query/hooks";
import { StateSetter } from "../ui/StateSetter";

export type ImageDownloaderProps = {
  imageName: string;
  setState: (e: string) => void;
};
const setFunctionState = (e: string, setState: (element: string) => void) => {
  if (e === "") return;
  setState(e);
};
export const ImageDownloader = ({
  imageName,
  setState,
}: ImageDownloaderProps) => {
  if (imageName === "") {
    return <></>;
  }
  const { image, isFetching } = useDownloadedImage(imageName);

  if (isFetching) {
    return <Loading />;
  }

  const fileReaderInstance = new FileReader();
  fileReaderInstance.readAsDataURL(image);
  return (
    <StateSetter
      setSpecificState={() => {
        fileReaderInstance.onload = () => {
          setFunctionState(fileReaderInstance.result.toString(), setState);
        };
        //setFunctionState(base64data, setState);
      }} //setFunctionState(imageUri, setState)}}
    />
  );
};
