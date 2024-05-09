import { FC } from "react";
import JobForm from "../components/JobOferForm";
import StyledHeader from "../components/StyledHeader";

const CreateJobOfer: FC = () => {
  return (
    <>
      <StyledHeader></StyledHeader>
      <div>
        <JobForm />
      </div>
    </>
  );
};

export default CreateJobOfer;
