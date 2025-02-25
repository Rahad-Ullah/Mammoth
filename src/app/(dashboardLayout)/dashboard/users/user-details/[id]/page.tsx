import UserCard from "@/components/page/userDetails/userCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { usersData } from "@/constants/users";

type PageParams = Promise<{ id: string }>;

const UserDetailsPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;

  const user = usersData.find((item) => item.id === Number(id));
  if (!user) return <h1>Bill not found</h1>;

  return (
    <section className="grid gap-6">
      <Card>
        <CardHeader>
          <UserCard user={user} />
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <h1 className="text-xl font-medium text-primary">Test Details:</h1>
        </CardHeader>
        <CardContent>Test information goes here</CardContent>
      </Card>
    </section>
  );
};

export default UserDetailsPage;
