import { AuthDashboard } from "@/components/blocks/AuthDashboard";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AuthDashboard page="signin"/>
    </div>
  );
};

export default page;
