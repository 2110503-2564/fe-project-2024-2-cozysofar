import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import getUserProfile from "@/libs/account/getUserProfile";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) {
    return null;
  }

  const profile = await getUserProfile(session.user.token);
  var createdAt = new Date(profile.data.createdAt);

  return (
    <main className="bg-black">
      <div className="text-2x">{profile.data.name}</div>
      <table className="table-auto border-seperate border-spacing-2">
        <tbody>
          <tr>
            <td>Email</td>
            <td>{profile.data.email}</td>
          </tr>
          <tr>
            <td>Tel.</td>
            <td>{profile.data.tel}</td>
          </tr>
          <tr>
            <td>Member Since</td>
            <td>{createdAt.toString()}</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
