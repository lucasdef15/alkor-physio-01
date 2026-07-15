import Link from 'next/link';

import LogoSVG from '@/components/svg/LogoSVG';

export default function Header() {
  return (
    <div className="fixed top-2 flex w-full place-content-center">
      <header className="flex w-full max-w-[90%] justify-between rounded-[.8rem] border-2 border-zinc-500/50 p-2">
        <div className="flex items-center">
          <LogoSVG className="aspect-auto h-12 w-auto md:h-15" name="ΛLKOR" surname="PHYSIO" />
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
        <div>
          <button>whatsapp</button>
        </div>
      </header>
    </div>
  );
}
