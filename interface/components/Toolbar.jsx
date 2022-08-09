import Link from 'next/link'
import Image from 'next/image';

export default function Toolbar({}) {
  return (
    <nav className="flex items-center justify-between flex-wrap container mx-auto p-4 max-w-3xl">
      <div className="flex flex-shrink-0 items-center">
        <Link href="/">
          <a className="text-3xl text-gray-800 font-bold">Wrapped <span className="text-blue-500">USDC</span></a>
        </Link>
      </div>
      <div className="flex-grow flex items-center w-auto">
      </div>
      <Link href="https://github.com/tripplyons/WUSDC">
        <Image src="/github.svg" alt="GitHub" width={32} height={32} />
      </Link>
    </nav>
  );
}