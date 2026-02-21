import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-primary mb-2">
            Magnolia Advisory Group
          </h1>
          <p className="text-muted-foreground">Clarity. Control. Growth.</p>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
