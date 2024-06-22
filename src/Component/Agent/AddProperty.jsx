import { Helmet } from "react-helmet-async";
import AddForm from "../DashboardItem/Form/AddForm";


const AddProperty = () => {
    return (
        <div className="bg-[#F1E5D1] p-4">
             <Helmet>
            <title>
              Add Property
            </title>
          </Helmet>
            <h1 className="text-center font-bold text-3xl">Add property</h1>
            {/* form */}
            <AddForm></AddForm>
        </div>
    );
};

export default AddProperty;