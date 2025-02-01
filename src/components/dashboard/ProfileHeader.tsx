import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileHeaderProps {
  fullName: string | null;
  imageUrl: string | null;
  welcomeText: string;
}

export const ProfileHeader = ({ fullName, imageUrl, welcomeText }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center gap-4 bg-white/50 p-6 rounded-lg shadow-sm">
      <Avatar className="h-20 w-20 ring-2 ring-orange-200">
        <AvatarImage src={imageUrl || ''} alt={fullName || 'User'} />
        <AvatarFallback className="bg-orange-100 text-orange-800 text-xl">
          {fullName?.charAt(0) || '?'}
        </AvatarFallback>
      </Avatar>
      <div className="text-left">
        <p className="text-orange-700 font-medium mb-1">{welcomeText}</p>
        <h2 className="text-3xl font-bold text-orange-900">{fullName}</h2>
      </div>
    </div>
  );
};