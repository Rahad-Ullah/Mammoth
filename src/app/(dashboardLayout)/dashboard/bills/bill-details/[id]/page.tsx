import { Card, CardContent, CardHeader } from "@/components/ui/card";

const BillDetailsPage = () => {
  // if (!bill) return <h1>Bill not found</h1>;

  return (
    <>
      <section>
        <Card>
          <CardHeader>
            {/* <h1 className="text-xl font-bold">Top section</h1> */}
          </CardHeader>
          <CardContent>
            <h1 className="text-xl font-medium text-primary mb-4">Patient:</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li>Name: {"bill.name"}</li>
              <li>Email: {"bill.email"}</li>
              <li>Contact Number: {"bill.contactNumber"}</li>
              <li>Address: {"bill.address"}</li>
              <li>Gender: {"bill.gender"}</li>
              <li>Date of birth: {"bill.dateOfBirth"}</li>
              <li>Insurance: {"bill.insurance"}</li>
              <li>Member ID: {"bill.memberId"}</li>
              <li>Reasons for visit: {"bill.reasonsForVisit"}</li>
              <li>Ethnicity: {"bill.ethnicity"}</li>
              <li>Ordering Physician: {"bill.orderingPhysician"}</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { params } = context;
//   const id = params?.id as string;
//   const bill = billingData.find((bill) => bill.id === Number(id));

//   return {
//     props: {
//       bill: bill || null,
//     },
//   };
// };

export default BillDetailsPage;
