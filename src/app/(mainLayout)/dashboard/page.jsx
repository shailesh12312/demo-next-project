import CustomizedTables from "@/components/Dashboard/CustomizedTable";
import {Typography} from "@mui/material";

const Page = () => {
  return (
    <div>
      <Typography mb={3} variant="h4">Dashboard</Typography>
      <CustomizedTables/>
    </div>
  );
};

export default Page;