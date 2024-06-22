import { AuthDashboard } from "@/components/blocks/AuthDashboard";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AuthDashboard page="signup" />
    </div>
  );
};

export default page;
