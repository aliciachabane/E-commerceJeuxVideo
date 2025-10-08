import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function UserInfo({ user }) {
  if (!user) return null;

  return (
    <Avatar>
      <AvatarImage src={user.avatar} alt={user.name} />
      <AvatarFallback>
        {user.name ? user.name[0].toUpperCase() : "?"}
      </AvatarFallback>
    </Avatar>
  );
}
