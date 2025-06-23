import * as RadixAvatar from "@radix-ui/react-avatar";

const Avatar = ({email}: {email: string | null}) => {
  return (
    <RadixAvatar.Root className="size-9 flex items-center justify-center bg-primary rounded-full font-semibold text-secondary">
      <RadixAvatar.Fallback>
        {email ? (email[0] + email[1]).toUpperCase() : 'ER'}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}

export default Avatar