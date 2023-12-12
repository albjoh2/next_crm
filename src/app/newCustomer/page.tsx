import { FC } from "react";
import NewCustomerForm from "@/components/NewCustomerForm";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <NewCustomerForm />
    </div>
  );
};

export default page;
