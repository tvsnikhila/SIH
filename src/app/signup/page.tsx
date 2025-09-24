import Image from 'next/image';
import Link from 'next/link';
import { SignupForm } from '@/components/auth/signup-form';
import { Logo } from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const authBgImage = PlaceHolderImages.find((img) => img.id === 'auth-background');

export default function SignupPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex justify-center">
                <Logo />
            </div>
            <h1 className="text-3xl font-bold font-headline mt-4">Create an account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to create a new account
            </p>
          </div>
          <SignupForm />
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline text-primary font-medium">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {authBgImage && (
            <Image
            src={authBgImage.imageUrl}
            alt={authBgImage.description}
            data-ai-hint={authBgImage.imageHint}
            fill
            className="object-cover"
            />
        )}
      </div>
    </div>
  );
}
