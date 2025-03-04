import UserCard from "@/components/page/userDetails/userCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { testsData } from "@/constants/tests";
import { usersData } from "@/constants/users";
import Link from "next/link";

type PageParams = Promise<{ id: string }>;

const UserDetailsPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;

  const user = usersData.find((item) => item.id === Number(id));
  if (!user) return <h1>Data not found</h1>;

  const tests = testsData.slice(1, 6);

  return (
    <section className="flex flex-col gap-6 h-full">
      <Card>
        <CardHeader>
          <UserCard user={user} />
        </CardHeader>
      </Card>
      <Card className="h-full">
        <CardHeader>
          <h1 className="text-xl font-medium text-primary">Report History:</h1>
        </CardHeader>
        <CardContent>
          <ul>
            {tests.map((test) => (
              <Link
                href={`/dashboard/tests/user-record-history/${test.report_no}`}
                key={test.report_no}
              >
                <li className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-6">
                  <p className="flex gap-6 text-zinc-400">
                    Patient Name{" "}
                    <span className="text-zinc-500">
                      {test.patient.first_name} {test.patient.last_name}
                    </span>
                  </p>
                  <p className="flex gap-6 text-zinc-400">
                    Ordering Physician{" "}
                    <span className="text-zinc-500">
                      {test.ordering_physician}
                    </span>
                  </p>
                  <p className="flex gap-6 text-zinc-400">
                    Apply Date{" "}
                    <span className="text-zinc-500">
                      {new Date(test.apply_date).toLocaleString()}
                    </span>
                  </p>
                  <p className="flex gap-6 text-zinc-400">
                    {" "}
                    <span className="text-primary">{test.status}</span>
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};

export default UserDetailsPage;
