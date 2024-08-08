import Image from 'next/image';

export default function Loading() {
	return (
		<div className='w-full h-full min-h-dvh flex flex-col justify-center items-center'>
			<Image
				src='/Logo_200x155.png'
				alt='NotAble Logo'
				width={200}
				height={155}
				className='object-cover object-center animate-pulse duration-700'
				priority
			/>
		</div>
	);
}
