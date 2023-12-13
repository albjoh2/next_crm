import { FC } from "react";
import NewOrderForm from "@/components/NewOrderForm";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <NewOrderForm />
    </div>
  );
};

export default page;
