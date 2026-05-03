import Image from 'next/image';

export default function Logo() {
  return (
    <Image 
        src="/logo.svg"
        alt='Logotipo Meeti'
        width={400}
        height={600}
        loading='eager'
    />
  )
}
