import { Ripple } from "@/components/magicui/ripple";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

export function Playground() {
    const placeholders = [
        "What's the first rule of Fight Club?",
        "Who is Tyler Durden?",
        "Where is Andrew Laeddis Hiding?",
        "Write a Javascript method to reverse a string",
        "How to assemble your own PC?",
      ];
     
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
      };
      const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
      };

  return (
    <div className="relative flex h-[800px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-mono font-bold tracking-tighter text-black">
        Playground is coming soon!
      </p>
      <p className="text-muted-foreground text-xl mt-4 mb-4">
        Join the waitlist!
      </p>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      <Ripple />
    </div>
  );
}
