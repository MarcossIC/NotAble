const ChevronLeftIcon = ({ hover }: { hover?: boolean }) => (
	<svg
		fill='none'
		viewBox='0 0 24 24'
		strokeWidth={1.5}
		stroke='currentColor'
		width={24}
		height={24}
		className={`size-6 ${hover ? 'transition-transform duration-500 group-hover:translate-x-[-25%] group-hover:scale-[1.1]' : ''}`}>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5'
		/>
	</svg>
);

export default ChevronLeftIcon;
