export default function TaskId({
  name,
  description,
  user,
}: {
  name: string;
  description: string;
  user: {
    username: string;
  } | null;
}) {
  return (
    <>
      {user ? <h1>@{user.username}</h1> : null}
      <h2>{name}</h2>
      <p>{description}</p>
    </>
  );
}
