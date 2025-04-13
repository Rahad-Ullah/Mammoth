import UserCard from "@/components/page/userDetails/userCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { myFetch } from "@/utils/myFetch";
import Link from "next/link";

type PageParams = Promise<{ id: string }>;

const UserDetailsPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;

  const res = await myFetch(`/user/users/${id}`);

  const userData = res?.data;
  if (!userData) return <h1 className="text-stone-500">Data not found</h1>;

  return (
    <section className="flex flex-col gap-6 h-full">
      <Card>
        <CardHeader>
          <UserCard user={userData?.user} />
        </CardHeader>
      </Card>
      <Card className="h-full">
        <CardHeader>
          <h1 className="text-xl font-medium text-primary">Report History:</h1>
        </CardHeader>
        <CardContent>
          <ul>
            {userData?.reports.map((test) => (
              <Link
                href={`/dashboard/tests/user-record-history/${test?._id}`}
                key={test?._id}
              >
                <li className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-6">
                  <p className="flex gap-6 text-zinc-400">
                    Patient Name{" "}
                    <span className="text-zinc-500">{test?.patient?.name}</span>
                  </p>
                  <p className="flex gap-6 text-zinc-400">
                    Ordering Physician{" "}
                    <span className="text-zinc-500">{test?.doctor?.name}</span>
                  </p>
                  <p className="flex gap-6 text-zinc-400">
                    Apply Date{" "}
                    <span className="text-zinc-500">
                      {new Date(test?.apply_date).toLocaleString()}
                    </span>
                  </p>
                  <p className="flex gap-6 text-zinc-400">
                    {" "}
                    <span className="text-primary">{test?.status}</span>
                  </p>
                </li>
              </Link>
            ))}
            {!(userData?.reports?.length > 0) && (
              <li className="text-stone-500">No data found</li>
            )}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};

export default UserDetailsPage;
