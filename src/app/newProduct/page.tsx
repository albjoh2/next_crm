import { FC } from "react";
import NewProductForm from "@/components/NewProductForm";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <NewProductForm />
    </div>
  );
};

export default page;
