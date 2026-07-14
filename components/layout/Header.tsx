import LogoSVG from '@/components/svg/LogoSVG';

export default function Header() {
  return (
    <div className="fixed top-2 flex w-full place-content-center">
      <header className="w-full max-w-[90%] rounded-[.8rem] border-2 border-zinc-500/50 p-2">
        <div className="flex items-center">
          <LogoSVG className="aspect-auto h-15 w-auto" name="ΛLKOR" surname="LABS" />
        </div>
      </header>
    </div>
  );
}
