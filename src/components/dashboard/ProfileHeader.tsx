import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileHeaderProps {
  fullName: string | null;
  imageUrl: string | null;
  welcomeText: string;
}

export const ProfileHeader = ({ fullName, imageUrl, welcomeText }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src={imageUrl || ''} />
        <AvatarFallback>{fullName?.charAt(0) || '?'}</AvatarFallback>
      </Avatar>
      <div className="text-left">
        <p className="text-sm text-muted-foreground">{welcomeText}</p>
        <h2 className="text-2xl font-bold">{fullName}</h2>
      </div>
    </div>
  );
};